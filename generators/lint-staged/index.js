'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

module.exports = class extends Generator {
  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        husky: '^1.2.0',
        'lint-staged': '^8.1.0',
      },
      husky: {
        hooks: {
          'pre-commit': 'lint-staged',
        },
      },
      'lint-staged': {},
    });
  }

  install() {
    helper.installDependencies(this);
  }
};
