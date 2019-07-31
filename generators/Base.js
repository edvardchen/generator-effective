'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      skipMessage: true,
    });
  }
};
