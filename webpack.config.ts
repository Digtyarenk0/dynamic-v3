import { BuildEnv, BuildPaths } from './config/build/types/config';
import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    ico: path.resolve(__dirname, 'public', 'favicon.ico'),
    src: path.resolve(__dirname, 'src'),
    locales: path.resolve(__dirname, 'src', 'locales'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
    magicSDK: path.resolve(__dirname, 'node_modules/magic-sdk/dist/cjs/index.js'),
    dynamicEthersV6: path.resolve(__dirname, 'node_modules/@dynamic-labs/ethers-v6'),
  };

  const PORT = env.port || 3000;
  const mode = env.mode || 'development';
  const isDev = mode === 'development';
  const isAnalyze = process.env.analyze === '1';

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    isAnalyze,
    port: PORT,
  });

  return config;
};
