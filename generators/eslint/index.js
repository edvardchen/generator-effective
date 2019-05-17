'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const helper = require('../helper');

module.exports = class extends Generator {
  initializing() {
    this.userEslintConfig = helper.searchConfig(this, 'eslint');
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the exquisite ${chalk.red(
          'generator-effective'
        )} generator!`
      )
    );
    const prompts = [];
    if (this.fs.exists(this.destinationPath('tsconfig.json'))) {
      prompts.push({
        type: 'confirm',
        message: 'Would you like to integrate Typescript with eslint',
        name: 'useTypescriptEslint',
        default: true
      });
    }
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const { useTypescriptEslint } = this.props;
    if (!this.userEslintConfig) {
      this.fs.copyTpl(
        this.templatePath('.eslintrc.yml'),
        this.destinationPath('.eslintrc.yml'),
        { useTypescriptEslint }
      );
      return;
    }

    if (this.userEslintConfig) {
      const { config, filepath } = this.userEslintConfig;
      helper.castToArray(config, 'extends');
      config.extends.push(
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
      );
      helper.writeConfig(this, filepath, config);
    }
  }

  install() {
    this.deps = ['eslint'];
    if (this.props.useTypescriptEslint) {
      this.deps.push(
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser'
      );
    }
    this.npmInstall(this.deps, { 'svae-dev': true });
    // this.installDependencies();
  }
};
