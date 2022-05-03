import type { Config as SWCOptions } from '@swc/core';
import { access, constants } from 'fs-extra';
import { join } from 'path';
import type { OutputOptions, RollupOptions } from 'rollup';

export type RollupOptionsWithOutput = RollupOptions & { output: OutputOptions };

export interface BuildConfigOverrides {
    swc(options: SWCOptions): SWCOptions | Promise<SWCOptions>;
    rollup(
        options: RollupOptionsWithOutput,
    ): RollupOptionsWithOutput | Promise<RollupOptionsWithOutput>;
}

export async function loadBuildOverrides(projectDir: string): Promise<BuildConfigOverrides> {
    const overrides: BuildConfigOverrides = {
        swc: (options: SWCOptions) => options,
        rollup: (options: RollupOptionsWithOutput) => options,
    };

    const buildOverridesFile = join(projectDir, 'build.config.js');
    try {
        await access(buildOverridesFile, constants.R_OK);
        Object.assign(overrides, require(buildOverridesFile));
    } catch {
        // ignore
    }

    return overrides;
}
