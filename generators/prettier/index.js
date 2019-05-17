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

    const prompts = [
      {
        type: 'list',
        name: 'formatCommand',
        message: 'Which way would you like to format code?',
        choices: formatCommands,
        default: formatCommands[0]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.formatByEslint = this.props.formatCommand === formatCommands[1];
    });
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
    const command = this.props ? this.props.formatCommand : formatCommands[0];
    let lintStaged;
    if (this.formatByEslint) {
      lintStaged = {
        '*.{ts,js}': [command, 'git add'],
        '*.{json,scss,css,md}': [formatCommands[0], 'git add']
      };
    } else {
      lintStaged = {
        '*.{ts,js,json,scss,css,md}': [command, 'git add']
      };
    }
    this.fs.extendJSON(this.destinationPath('package.json'), {
      'lint-staged': lintStaged
    });
  }

  /** update eslint config */
  _writeEslintConfig() {
    const config = (this.eslintConfig && this.eslintConfig.config) || {};
    if (!Array.isArray(config.extends)) {
      config.extends = [];
    }

    if (this.formatByEslint) {
      // remove prettier from plugins
      helper.quickRemove(config.plugins, 'prettier');
      helper.quickRemove(config.extends, 'prettier');

      this.deps.push('eslint-config-prettier');
      this.deps.push('eslint-plugin-prettier');
      config.extends.push('plugin:prettier/recommended');

      if (this.eslintConfig) {
        helper.writeConfig(this, this.eslintConfig.filepath, config);
      } else {
        helper.writeConfig(
          this,
          this.destinationPath('./.eslintrc.yml'),
          config
        );
      }
      return;
    }

    if (this.eslintConfig) {
      if (!config.extends.includes('prettier')) {
        config.extends.push('prettier');
        this.deps.push('eslint-config-prettier');
        helper.writeConfig(this, this.eslintConfig.filepath, config);
      }
    }
  }
};
