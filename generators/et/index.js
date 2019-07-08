'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../typescript'));
    this.composeWith(require.resolve('../eslint'));
  }

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        '@typescript-eslint/eslint-plugin': '^1.9.0',
        '@typescript-eslint/parser': '^1.9.0',
      },
    });
  }

  conflicts() {
    const { config, filepath } = helper.searchConfigExtended(
      this,
      'eslint',
      // we should konw filename of eslint config added by subgenerator eslint
      '.eslintrc.yml'
    );
    helper.castToArray(config, 'extends');
    config.extends.unshift('plugin:@typescript-eslint/recommended');

    config.rules = config.rules || {};
    config.rules = {
      ...config.rules,
      '@typescript-eslint/prefer-interface': 0,
      '@typescript-eslint/explicit-function-return-type': [
        1,
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        1,
        { argsIgnorePattern: '^_|ignore' },
      ],
    };

    helper.writeConfig(this, filepath, config);
  }

  install() {
    helper.installDependencies(this);
  }
};
