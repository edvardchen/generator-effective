'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../et'));
    this.composeWith(require.resolve('../ep'));
  }

  writing() {}

  conflicts() {
    const { config, filepath } = helper.searchConfigExtended(
      this,
      'eslint',
      // filename in fs memory
      '.eslintrc.yml'
    );
    config.extends.push('prettier/@typescript-eslint');

    helper.writeConfig(this, filepath, config);
  }

  install() {
    helper.installDependencies(this);
  }
};
