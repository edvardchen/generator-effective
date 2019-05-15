'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the spectacular ${chalk.red(
          'generator-effective'
        )} generator!`
      )
    );
  }

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      husky: {
        hooks: {
          'pre-commit': 'lint-staged'
        }
      },
      'lint-staged': {}
    });
  }

  install() {
    this.npmInstall(['husky', 'lint-staged'], { 'save-dev': true });
  }
};
