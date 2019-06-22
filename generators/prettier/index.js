'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../lint-staged'));
  }

  configuring() {
    const found = helper.searchConfig(this, 'prettier');
    const configPath = this.destinationPath('.prettierrc');
    if (!found) {
      this.fs.copy(this.templatePath('.prettierrc'), configPath);
    }
  }

  writing() {
    const lintStaged = {
      '*.{ts,tsx,js,json}': ['prettier --write', 'git add'],
    };
    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        prettier: '^1.18.2',
      },
      'lint-staged': lintStaged,
    });
  }

  install() {
    helper.installDependencies(this);
  }
};
