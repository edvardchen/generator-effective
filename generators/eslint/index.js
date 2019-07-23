'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../lint-staged'));
  }

  writing() {
    const found = helper.searchConfig(this, 'eslint');
    if (!found) {
      const template = this.templatePath('.eslintrc.yml');
      const dest = this.destinationPath('.eslintrc.yml');
      this.fs.copy(template, dest);
    }
    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        eslint: '^5.9.0',
      },
      'lint-staged': {
        '*.{tsx,ts}': ['eslint'],
      },
    });
  }

  install() {
    helper.installDependencies(this);
  }
};
