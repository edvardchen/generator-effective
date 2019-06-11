'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const helper = require('../helper');

module.exports = class extends Generator {
  initializing() {
    this.deps = ['react', 'react-dom'];
    this.devDeps = [];
    this.userEslintConfig = helper.searchConfig(this, 'eslint');
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the superior ${chalk.red('generator-effective')} generator!`
      )
    );

    const prompts = [
      {
        type: 'list',
        name: 'stateManager',
        message: 'Which state management library does your project use?',
        choices: ['redux', 'mobx'],
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const tsconfig = this.destinationPath('tsconfig.json');
    const usingTS = this.fs.exists(tsconfig);
    if (usingTS) {
      this.fs.extendJSON(tsconfig, {
        compilerOptions: {
          jsx: 'react',
        },
      });
    }
    if (this.userEslintConfig) {
      this.devDeps.push('eslint-plugin-react');

      const { config = {}, filepath } = this.userEslintConfig;
      helper.castToArray(config, 'extends');

      // change config
      config.extends.push('plugin:react/recommended');
      if (!usingTS) {
        // not using TS
        config.parserOptions = {
          ...config.parserOptions,
          ecmaFeatures: {
            ...(config.parserOptions && config.parserOptions.ecmaFeatures),
            jsx: true,
          },
        };
      }

      helper.writeConfig(this, filepath, config);
    }
  }

  install() {
    this.npmInstall(this.deps);
    this.npmInstall(this.devDeps, { 'save-dev': true });
  }
};
