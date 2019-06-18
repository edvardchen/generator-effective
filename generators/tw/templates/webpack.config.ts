/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

import fs from 'fs'
import path from 'path'
import webpack, { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// @ts-ignore
import InlineSource from 'html-webpack-inline-source-plugin'

const config: Configuration = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,

        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: true } },
          'postcss-loader',
          { loader: 'sass-loader' },
        ],
      },

      {
        test: /\.(js|ts|tsx)?$/,
        // exclude: /node_modules/,
        exclude: /node_modules(?!(\/ky))/,
        // exclude: /node_moduels\/(?!(ky))/,
        use: {
          loader: 'babel-loader',
          options: JSON.parse(
            fs.readFileSync(path.resolve(__dirname, '.babelrc'), { encoding: 'utf8' })
          ),
        },
      },

      { test: /\.png$/, use: ['file-loader', 'image-webpack-loader'] },
    ],
  },

  entry: {
    main: './src/index.tsx',
  },

  output: {
    chunkFilename: '[name].[contentHash].js',
    filename: '[name].[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  mode: 'production',
  plugins: [
    // non-numerical chunk name
    new webpack.NamedChunksPlugin(),
    new webpack.HashedModuleIdsPlugin(),

    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contentHash].css',
      chunkFilename: '[id].[contentHash].css',
    }),
    new HtmlWebpackPlugin({
      template: './templates/index.html',
      inlineSource: /(runtime\..*\.js$|main\..*css)/,
    }),
    new InlineSource(),
  ],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      // minSize: 30000,
      // maxSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // name: true,
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10,
      //   },
      //   default: {
      //     minChunks: 1,
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
    },
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.scss'],
  },
}

export default config
