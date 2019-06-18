/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

import fs from 'fs'
import path from 'path'
import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import devServer from './devServer.config'

const config: Configuration = {
  devServer,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,

        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true } },
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

      { test: /\.png$/, use: 'file-loader' },
    ],
  },

  entry: {
    main: './src/index.tsx',
  },

  output: {
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '.tmp'),
  },

  mode: 'development',
  devtool: 'eval',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({ template: './templates/index.html', inlineSource: /runtime-.*\.js$/ }),
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.scss'],
  },
}

export default config
