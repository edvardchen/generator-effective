'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const cosmiconfig = require('cosmiconfig');

module.exports = class extends Generator {
  initializing() {
    const explorer = cosmiconfig('eslint', {
      stopDir: this.destinationRoot()
    });
    this.userEslintConfig = explorer.searchSync();
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the exquisite ${chalk.red(
          'generator-effective'
        )} generator!`
      )
    );
  }

  writing() {
    if (!this.userEslintConfig) {
      this.fs.copy(
        this.templatePath('.eslintrc.yml'),
        this.destinationPath('.eslintrc.yml')
      );
    }
  }

  install() {
    this.npmInstall(['eslint'], { 'svae-dev': true });
    // this.installDependencies();
  }
};
