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

  // /** update eslint config */
  // _writeEslintConfig() {
  //   const config = (this.eslintConfig && this.eslintConfig.config) || {};
  //   helper.castToArray(config, 'extends');

  //   if (this.formatByEslint) {
  //     // remove prettier from plugins
  //     helper.quickRemove(config.plugins, 'prettier');
  //     helper.quickRemove(config.extends, 'prettier');

  //     this.deps.push('eslint-config-prettier');
  //     this.deps.push('eslint-plugin-prettier');
  //     config.extends.push('plugin:prettier/recommended');

  //     if (this.eslintConfig) {
  //       helper.writeConfig(this, this.eslintConfig.filepath, config);
  //     } else {
  //       helper.writeConfig(
  //         this,
  //         this.destinationPath('./.eslintrc.yml'),
  //         config
  //       );
  //     }
  //     return;
  //   }

  //   if (this.eslintConfig) {
  //     if (!config.extends.includes('prettier')) {
  //       config.extends.push('prettier');
  //       this.deps.push('eslint-config-prettier');
  //       helper.writeConfig(this, this.eslintConfig.filepath, config);
  //     }
  //   }
  // }
};
