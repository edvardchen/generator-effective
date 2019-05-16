'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const cosmiconfig = require('cosmiconfig');
const helper = require('../helper');

const formatCommands = ['prettier --write', 'eslint --fix'];

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../lint-staged'));
    this.deps = ['prettier'];
    this._findEslintConfig();
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the incredible ${chalk.red(
          'generator-effective'
        )} generator!`
      )
    );

    if (this.eslintConfig) {
      const prompts = [
        {
          type: 'list',
          name: 'formatWay',
          message: 'Which way would you like to format code?',
          choices: formatCommands,
          default: 0
        }
      ];

      return this.prompt(prompts).then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
        this.formatByEslint = this.props.formatWay === 1;
      });
    }
  }

  configuring() {
    const configPath = this.destinationPath('.prettierrc');
    if (!this.fs.exists(configPath)) {
      this.fs.copy(this.templatePath('.prettierrc'), configPath);
    }
  }

  writing() {
    this._writePkg();
    this._writeEslintConfig();
  }

  install() {
    this.npmInstall(this.deps, { 'save-dev': true });
  }

  /** search and load eslint config */
  _findEslintConfig() {
    const root = this.destinationRoot();
    const explorer = cosmiconfig('eslint', {
      ignoreEmptySearchPlaces: false,
      stopDir: root
    });
    this.eslintConfig = explorer.searchSync();
  }

  /** update package.json */
  _writePkg() {
    const format = formatCommands[this.props ? this.props.formatWay : 0];
    let lintStaged;
    if (this.formatByEslint) {
      lintStaged = {
        '*.{ts,js}': [format, 'git add'],
        '*.{json,scss,css,md}': [formatCommands[0], 'git add']
      };
    } else {
      lintStaged = {
        '*.{ts,js,json,scss,css,md}': [format, 'git add']
      };
    }
    this.fs.extendJSON(this.destinationPath('package.json'), {
      'lint-staged': lintStaged
    });
  }

  /** update eslint config */
  _writeEslintConfig() {
    if (this.eslintConfig) {
      const { config = {}, filepath } = this.eslintConfig;

      if (!Array.isArray(config.extends)) {
        config.extends = [];
      }

      helper.quickRemove(config.plugins, 'prettier');

      this.deps.push('eslint-config-prettier');
      if (this.formatByEslint) {
        this.deps.push('eslint-plugin-prettier');
        helper.quickRemove(config.extends, 'prettier');
        config.extends.push('plugin:prettier/recommended');
      } else if (!config.extends.includes('prettier')) {
        config.extends.push('prettier');
      }

      helper.writeConfig(this, filepath, config);
    }
  }
};
