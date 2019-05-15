'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../lint-staged'));
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
  }

  configuring() {
    this.fs.copy(
      this.templatePath('.prettierrc'),
      this.destinationPath('.prettierrc')
    );
  }

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      'lint-staged': {
        '*.{ts,css,md,js}': ['prettier --write', 'git add']
      }
    });
  }

  install() {
    this.npmInstall(['prettier'], { 'save-dev': true });
  }
};
