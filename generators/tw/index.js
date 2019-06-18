'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../typescript'));
  }

  prompting() {}

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: {
        start: 'webpack-dev-server --config webpack.config.dev.ts',
        build: 'webpack',
      },
      devDependencies: {
        //
        // LOADER
        //

        // babel loader
        'babel-loader': '^8.0.6',
        '@babel/core': '^7.4.5',
        '@babel/plugin-proposal-class-properties': '^7.4.4',
        '@babel/plugin-syntax-dynamic-import': '^7.2.0',
        '@babel/preset-env': '^7.4.5',
        '@babel/preset-react': '^7.0.0',
        '@babel/preset-typescript': '^7.3.3',

        'css-loader': '^3.0.0',

        // sass loader
        'sass-loader': '^7.1.0',
        'node-sass': '^4.12.0',

        // postcss loader
        'postcss-loader': '^3.0.0',
        autoprefixer: '^9.5.1',
        cssnano: '^4.1.10',

        'style-loader': '^0.23.1',
        'file-loader': '^4.0.0',
        'image-webpack-loader': '^5.0.0',
        // • • • • •

        // plugin
        'html-webpack-inline-source-plugin': '0.0.10',
        'html-webpack-plugin': '^3.2.0',
        'mini-css-extract-plugin': '^0.7.0',
        'webpack-bundle-analyzer': '^3.3.2',

        // webpack core
        webpack: '^4.34.0',
        'webpack-cli': '^3.3.4',
        'webpack-dev-server': '^3.7.1',
        'ts-node': '^8.3.0',
      },
    });
    [
      'webpack.config.ts',
      'webpack.config.dev.ts',
      '.postcssrc',
      '.babelrc',
      '.browserslistrc',
      'devServer.config.ts',
    ].forEach(item => {
      this.fs.copy(this.templatePath(item), this.destinationPath(item));
    });
  }

  install() {
    helper.installDependencies(this);
  }
};
