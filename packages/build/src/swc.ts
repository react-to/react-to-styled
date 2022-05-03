import type { Config as SWCOptions } from '@swc/core';
import { pathExists, readFile } from 'fs-extra';
import { dirname, join } from 'path';
import { NODE_ACTIVE_LTS_VERSION } from './node-version';
import { BuildConfigOverrides, loadBuildOverrides } from './overrides';

async function findRushDir(pathname: string): Promise<string | false> {
    if (await pathExists(join(pathname, 'rush.json'))) {
        return pathname;
    }
    const parent = dirname(pathname);
    return parent === pathname ? false : findRushDir(parent);
}

export interface SWCConfigInputs {
    readonly input?: string;
    readonly overrides?: BuildConfigOverrides;
    readonly format?: 'esm' | 'cjs' | 'umd';
    readonly target?: string;
    readonly env?: 'production' | 'development';
    readonly jsx?: boolean;
    readonly projectDir?: string;
}

export async function createSWCConfig({
    input,
    overrides,
    // format = 'esm',
    target = 'node',
    env = target !== 'node' ? 'production' : undefined,
    jsx = target !== 'node',
    projectDir = input ? dirname(input) : process.cwd(),
}: SWCConfigInputs): Promise<SWCOptions> {
    if (!overrides) {
        overrides = await loadBuildOverrides(projectDir);
    }

    let targetNodeVersion = process.versions.node;
    if (target === 'node') {
        const possibleNvmrcPaths = [];

        if (input) {
            possibleNvmrcPaths.push(join(dirname(input), '.nvmrc'));
        }

        if (!input || projectDir !== dirname(input)) {
            possibleNvmrcPaths.push(join(projectDir, '.nvmrc'));
        }

        const rushDir = await findRushDir(projectDir);
        if (rushDir) {
            possibleNvmrcPaths.push(join(rushDir, '.nvmrc'));
        }

        for (const nvmrcPath of possibleNvmrcPaths) {
            if (await pathExists(nvmrcPath)) {
                targetNodeVersion = (await readFile(nvmrcPath, 'utf8')).trim();
                break;
            }
        }

        if (/lts/.test(targetNodeVersion)) {
            targetNodeVersion = NODE_ACTIVE_LTS_VERSION;
        }
    }

    return overrides.swc({
        sourceMaps: true,
        env: {
            targets:
                target !== 'node'
                    ? target
                    : {
                          node: targetNodeVersion,
                      },
            mode: 'usage',
            coreJs: '3',
            shippedProposals: true,
            loose: true,
        },
        jsc: {
            parser: {
                syntax: 'typescript',
                tsx: jsx,
                decorators: false,
                dynamicImport: true,
            },
            loose: false,
            target: target === 'node' ? 'es2020' : 'es5',
            keepClassNames: true,
            externalHelpers: true,
            transform: {
                react: {
                    runtime: 'automatic',
                    development: env === 'development',
                },
            },
        },
        minify: false,
    });
}
