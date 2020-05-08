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

    const tsRecomm = 'plugin:@typescript-eslint/recommended';

    const firstPrettier = config.extends.findIndex(item =>
      item.startsWith('prettier')
    );
    if (firstPrettier < 0) {
      config.extends.push(tsRecomm);
    } else {
      config.extends.splice(firstPrettier, 0, tsRecomm);
    }

    config.rules = config.rules || {};
    config.rules = {
      ...config.rules,
      '@typescript-eslint/prefer-interface': 0,
      '@typescript-eslint/explicit-member-accessibility': [
        1,
        {
          accessibility: 'no-public',
          overrides: { parameterProperties: 'explicit' },
        },
      ],
      '@typescript-eslint/no-parameter-properties': 0,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/no-unused-vars': [
        1,
        { argsIgnorePattern: '^_|ignore', varsIgnorePattern: '^_|ignore' },
      ],
    };

    helper.writeConfig(this, filepath, config);

    // overwrite package lint script
    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: {
        lint: 'eslint src --ext ts,tsx && tsc --noEmit',
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
