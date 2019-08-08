'use strict';
const Generator = require('../Base');
const helper = require('../helper');

module.exports = class extends Generator {
  initializing() {
    if (!this.options.internal) {
      this.composeWith(require.resolve('../jest'));
      this.composeWith(require.resolve('../eslint'));
    }
  }

  writing() {}

  conflicts() {
    const result = helper.searchConfigExtended(this, 'eslint', '.eslintrc.yml');
    const { filepath, config } = result;

    helper.castToArray(config, 'overrides');
    config.overrides.push({
      files: '__tests__/**',
      rules: {
        'no-console': 0,
      },
      env: {
        jest: true,
      },
    });

    helper.writeConfig(this, filepath, config);
  }

  install() {
    super.install();
  }
};
