import * as esbuild from 'esbuild';

/**
 * @typedef {esbuild.BuildOptions}
 */
export const esBuildOptions = {
  stdin: { contents: '' },
  allowOverwrite: true,
  bundle: true,
  minify: true,
  inject: [
    'init.js',
    'dom.js',
    'drawing.js',
  ],
  outfile: 'library.js',
};

await esbuild.build(esBuildOptions);