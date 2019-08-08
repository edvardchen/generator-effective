'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('internal');
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      skipMessage: true,
    });
  }
};
