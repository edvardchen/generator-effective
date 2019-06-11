'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the groovy ${chalk.red('generator-effective')} generator!`
      )
    );
    this.log(
      `Try ${chalk.green(
        'yo effetive --help'
      )} to see all available subgenerators`
    );
  }

  // writing() {
  //   this.fs.copy(
  //     this.templatePath('dummyfile.txt'),
  //     this.destinationPath('dummyfile.txt')
  //   );
  // }
};
