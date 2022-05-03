import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import url from '@rollup/plugin-url'
import image from '@rollup/plugin-image'
import copy from 'rollup-plugin-copy'
import minimist from 'minimist'
import {
  default as resolve,
  DEFAULTS as RESOLVE_DEFAULTS,
} from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { writeFile } from 'fs-extra'
import { builtinModules } from 'module'
import { isAbsolute, join } from 'path'
import { rollup } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-ts'
import {
  parseJsonConfigFileContent,
  readConfigFile,
  ScriptTarget,
  sys,
} from 'typescript'
import {
  BuildConfigOverrides,
  loadBuildOverrides,
  RollupOptionsWithOutput,
} from './overrides'
import { createSWCConfig } from './swc'

function camelCase(string: string): string {
  return string
    .replace(/^\W+|\W+$/g, '')
    .replace(/(\w)\W+(\w)/g, (_, w1, w2) => `${w1}${w2.toUpperCase()}`)
}

function removeScope(name: string): string {
  return name.replace(/^@.*\//, '')
}

function safePackageName(name: string): string {
  return name
    .toLowerCase()
    .replace(/(^@.*\/)|((^[^a-zA-Z]+)|[^\w.-])|([^a-zA-Z0-9]+$)/g, '')
}

function safeVariableName(name: string): string {
  return camelCase(
    removeScope(name)
      .toLowerCase()
      .replace(/((^[^a-zA-Z]+)|[^\w.-])|([^a-zA-Z0-9]+$)/g, ''),
  )
}

function removeIndent(template: TemplateStringsArray, ...params: unknown[]) {
  const lines = String.raw(template, ...params).split(/\r?\n|\r/g)
  if (lines.length > 0 && lines[0]!.length === 0) {
    lines.shift()
  }
  if (lines.length === 0) {
    return ''
  }
  const indent = lines[0]!.replace(/^(\s*).*$/, '$1')
  return lines
    .map(line => {
      return (
        line.startsWith(indent) ? line.substr(indent.length) : line
      ).trimRight()
    })
    .join('\n')
}

export interface RollupConfigInputs {
  readonly name: string
  readonly dependencies: Record<string, string>
  readonly peerDependencies: Record<string, string>
  readonly input: string
  readonly projectDir: string
  readonly outputDir: string
  readonly tsconfig: string
  readonly overrides: BuildConfigOverrides
  readonly target?: string
  readonly env?: 'production' | 'development'
  readonly minify?: boolean
  readonly format?: 'esm' | 'cjs' | 'umd'
  readonly jsx?: boolean
  readonly checkTypings?: boolean
  readonly icons?: string
}

export async function createRollupConfig({
  name,
  dependencies,
  peerDependencies,
  input,
  projectDir,
  outputDir,
  overrides,
  tsconfig: tsConfigFile,
  target = 'node',
  env = target !== 'node'
    ? 'production'
    : process.env.NODE_ENV !== 'production'
    ? 'development'
    : 'production',
  minify = env === 'production',
  icons,
  format = 'esm',
  jsx = target !== 'node',
  checkTypings = false,
}: RollupConfigInputs): Promise<RollupOptionsWithOutput> {
  const { config: tsConfig } = readConfigFile(tsConfigFile, sys.readFile)
  const { options: tsCompilerOptions } = parseJsonConfigFileContent(
    tsConfig,
    sys,
    './',
  )

  const outputFileName = `${outputDir}/${format}/${[
    safePackageName(name),
    format === 'esm' ? '' : env,
    minify ? 'min' : '',
    'js',
  ]
    .filter(Boolean)
    .join('.')}`

  const deps = Object.keys(dependencies).concat(Object.keys(peerDependencies))

  return {
    input,
    external: (id: string) => {
      if (id.startsWith('regenerator-runtime')) {
        return false
      }
      return (
        builtinModules.includes(id) ||
        deps.includes(id) ||
        (!id.startsWith('.') && !isAbsolute(id))
      )
    },
    treeshake: {
      propertyReadSideEffects: false,
    },
    output: {
      file: outputFileName,
      format: format === 'esm' ? 'es' : format,
      freeze: false,
      esModule: Boolean(tsCompilerOptions.esModuleInterop),
      name: safeVariableName(name),
      sourcemap: true,
      exports: 'named',
      plugins: [
        minify &&
          terser({
            ecma: target === 'node' ? 2020 : 5,
            compress: {
              drop_debugger: env === 'production',
              unsafe: true,
              passes: 3,
            },
            mangle: {
              safari10: true,
            },
            format: {
              safari10: true,
            },
          }),
      ].filter(Boolean),
    },
    plugins: [
      resolve({
        mainFields: [
          'module',
          'main',
          target !== 'node' ? 'browser' : undefined,
        ].filter(Boolean) as string[],
        extensions: [...RESOLVE_DEFAULTS.extensions, '.ts', '.jsx', '.tsx'],
      }),
      commonjs({
        include:
          format === 'umd' ? /\/node_modules\// : /\/regenerator-runtime\//,
      }),
      json(),
      image({ include: '**/*.svg' }),
      url({
        include: [
          '**/*.svg',
          '**/*.png',
          '**/*.jp(e)?g',
          '**/*.gif',
          '**/*.webp',
          '**/*.woff',
        ],
      }),

      typescript({
        exclude: [
          '**/*.spec.ts',
          '**/*.test.ts',
          '**/*.spec.tsx',
          '**/*.test.tsx',
          'node_modules',
          'bower_components',
          'jspm_packages',
          outputDir,
        ],
        transpileOnly: !checkTypings,
        tsconfig: {
          ...tsCompilerOptions,
          target: ScriptTarget.ESNext,
          declaration: format === 'esm',
          declarationDir: outputDir,
        },
        transpiler: 'swc',
        swcConfig: await createSWCConfig({
          input,
          projectDir,
          target,
          format,
          env,
          jsx,
          overrides,
        }),
      }),
      env !== undefined &&
        replace({
          preventAssignment: true,
          'process.env.NODE_ENV': JSON.stringify(env),
        }),
      icons &&
        copy({
          targets: [{ src: icons, dest: `dist/${format}/icons` }],
          hook: 'writeBundle',
        }),
    ].filter(Boolean),
  }
}

export async function build(
  projectDir = process.cwd(),
  args = process.argv.slice(2),
) {
  const argv = minimist(args)
  console.log(argv)
  const pkg = require(join(projectDir, 'package.json'))

  const overrides = await loadBuildOverrides(projectDir)

  const source = args.filter(arg => !arg.startsWith('--'))[0] || 'src/index.ts'
  const input = join(projectDir, source)
  console.log(input, process.cwd())

  const outputDir = join(projectDir, 'dist').replace(/[\\\/]$/, '')

  const options: {
    -readonly [P in keyof RollupConfigInputs]: RollupConfigInputs[P]
  } = {
    overrides,
    name: pkg.name,
    dependencies: pkg.dependencies || {},
    peerDependencies: pkg.peerDependencies || {},
    input,
    projectDir,
    outputDir,
    tsconfig: join(projectDir, 'tsconfig.json'),
  }

  if (args.includes('--no-minify')) {
    options.minify = false
  } else if (args.includes('--minify')) {
    options.minify = true
  }

  const icons = argv['icons']

  const variants = [
    await createRollupConfig({
      ...options,
      icons,
      checkTypings: !args.includes('--no-typecheck'),
      format: 'esm',
    }),
    await createRollupConfig({
      ...options,
      format: 'cjs',
      icons,
      env: 'development',
    }),
    await createRollupConfig({
      minify: true,
      ...options,
      icons,
      format: 'cjs',
      env: 'production',
    }),
  ]

  if (pkg.browser) {
    const target = pkg.browserslist || 'defaults'
    variants.push(
      await createRollupConfig({
        target,
        ...options,
        icons,
        format: 'umd',
        env: 'development',
      }),
      await createRollupConfig({
        target,
        minify: true,
        ...options,
        icons,
        format: 'umd',
        env: 'production',
      }),
    )
  }

  await Promise.all(
    variants.map(config => {
      return Promise.resolve(overrides.rollup(config)).then(
        ({ output: outputOptions, ...inputOptions }) => {
          return rollup(inputOptions).then(bundle => {
            return bundle.write(outputOptions).then(() => bundle.close())
          })
        },
      )
    }),
  )

  const name = safePackageName(pkg.name)

  await writeFile(
    join(outputDir, `cjs/${name}.js`),
    removeIndent`
            if (process.env.NODE_ENV === 'production') {
                module.exports = require('./${name}.production.min.js');
            } else {
                module.exports = require('./${name}.development.js');
            }
        `,
  )
}
