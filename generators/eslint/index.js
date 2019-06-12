'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');
// const cosmiconfig = require('cosmiconfig');

module.exports = class extends Generator {
  initializing() {}

  // prompting() {
  //   const prompts = [];
  //   if (this.fs.exists(this.destinationPath('tsconfig.json'))) {
  //     prompts.push({
  //       type: 'confirm',
  //       message: 'Would you like to integrate Typescript with eslint',
  //       name: 'useTypescriptEslint',
  //       default: true,
  //     });
  //   }
  //   return this.prompt(prompts).then(props => {
  //     this.props = props;
  //   });
  // }

  writing() {
    // const { useTypescriptEslint } = this.props;
    // let configData = this.userEslintConfig;
    const found = helper.searchConfig(this, 'eslint');
    if (!found) {
      const template = this.templatePath('.eslintrc.yml');
      const dest = this.destinationPath('.eslintrc.yml');
      this.fs.copy(template, dest);
      // configData = cosmiconfig('eslint').loadSync(template);
    }
    // if (useTypescriptEslint) {
    //   const { config } = configData;
    //   helper.castToArray(config, 'extends');
    //   config.extends.push('plugin:@typescript-eslint/recommended');
    //   config.parser = '@typescript-eslint/parser';
    //   helper.writeConfig(this, dest, config);
    // }
    this.fs.extendJSON(this.destinationPath('package.json'), {
      eslint: '^5.9.0',
    });
  }

  install() {
    // this.deps = ['eslint'];
    // if (this.props.useTypescriptEslint) {
    //   this.deps.push(
    //     '@typescript-eslint/eslint-plugin',
    //     '@typescript-eslint/parser'
    //   );
    // }
    // this.npmInstall(this.deps, { 'save-dev': true });
    helper.installDependencies(this);
  }
};
