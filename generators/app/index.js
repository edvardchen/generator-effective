'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../ept'));
    this.composeWith(require.resolve('../commitlint'));
    this.composeWith(require.resolve('../gitignore'));
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the groovy ${chalk.red('generator-effective')} generator!`
      )
    );
  }

  // writing() {
  //   this.fs.copy(
  //     this.templatePath('dummyfile.txt'),
  //     this.destinationPath('dummyfile.txt')
  //   );
  // }
};
