import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(isDev = false): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
  };

  const resolveMJSLoader = {
    test: /\.mjs/,
    include: /node_modules/,
    type: 'javascript/auto',
    resolve: {
      fullySpecified: false,
    },
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const cssLoader = {
    test: /\.(scss|sass|css)$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-modules-typescript-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: /\.module\.scss$/i,
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
          },
        },
      },
      'postcss-loader',
      'sass-loader',
    ],
  };

  const codeBabelLoader = buildBabelLoader({ isDev, isTsx: false });
  const tsxCodeBabelLoader = buildBabelLoader({ isDev, isTsx: true });

  return [fileLoader, svgLoader, codeBabelLoader, tsxCodeBabelLoader, cssLoader, resolveMJSLoader];
}
