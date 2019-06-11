'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

module.exports = class extends Generator {
  initializing() {
    this.userEslintConfig = helper.searchConfig(this, 'eslint');
    this.deps = ['typescript', '@types/node'];
  }

  writing() {
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    if (this.userEslintConfig) {
      const { config = {}, filepath } = this.userEslintConfig;
      helper.castToArray(config, 'extends');
      config.parser = '@typescript-eslint/parser';
      config.extends.push('plugin:@typescript-eslint/recommended');
      helper.writeConfig(this, filepath, config);
    }
  }

  install() {
    if (this.userEslintConfig) {
      this.deps.push(
        '@typescript-eslint/parser',
        '@typescript-eslint/eslint-plugin'
      );
    }
    this.npmInstall(this.deps, { 'save-dev': true });
  }
};
