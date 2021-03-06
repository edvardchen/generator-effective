'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../lint-staged'));
  }

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        '@commitlint/cli': '^8.1.0',
        '@commitlint/config-conventional': '^7.5.0',
      },
      husky: {
        hooks: {
          'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
        },
      },
    });
    this.fs.copy(
      this.templatePath('commitlint.config.js'),
      this.destinationPath('commitlint.config.js')
    );
  }

  install() {
    helper.installDependencies(this);
  }
};
