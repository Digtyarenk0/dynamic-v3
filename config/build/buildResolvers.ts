import { ResolveOptions } from 'webpack';

import { BuildPaths } from './types/config';

export function buildResolvers(paths: BuildPaths): ResolveOptions {
  return {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    preferAbsolute: true,
    fullySpecified: false,
    modules: [paths.src, 'node_modules'],
    mainFields: ['browser', 'module', 'main'],
    alias: {
      'magic-sdk': paths.magicSDK,
      '@dynamic-labs/ethers-v6': paths.dynamicEthersV6,
    },
    fallback: {
      url: require.resolve('url'),
      http: require.resolve('stream-http'),
      os: require.resolve('os-browserify'),
      zlib: require.resolve('browserify-zlib'),
      https: require.resolve('https-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path'),
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),

      // i18n
      vm: require.resolve('vm-browserify'),
      tty: require.resolve('tty-browserify'),
      'process/browser': require.resolve('process/browser'),
      browser: false,
      fs: false,
      v8: false,
      module: false,
      perf_hooks: false,
    },
  };
}
