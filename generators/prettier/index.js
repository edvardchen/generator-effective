'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const cosmiconfig = require('cosmiconfig');

const formatCommands = ['prettier --write', 'eslint --fix'];

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../lint-staged'));
    this.findEslintConfig();
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
    const format = formatCommands[this.props ? this.props.formatWay : 0];
    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: {
        format
      },
      'lint-staged': {
        '*.{ts,css,md,js}': [format, 'git add']
      }
    });
  }

  install() {
    this.npmInstall(['prettier'], { 'save-dev': true });
  }

  findEslintConfig() {
    const root = this.destinationRoot();
    const explorer = cosmiconfig('eslint', {
      ignoreEmptySearchPlaces: false,
      stopDir: root
    });
    this.eslintConfig = explorer.searchSync();
  }
};
