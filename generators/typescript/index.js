'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        typescript: '^3.5.1',
        '@types/node': '^12.0.8',
      },
    });
  }

  install() {
    helper.installDependencies(this);
  }
};
