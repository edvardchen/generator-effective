'use strict';
const Generator = require('../Base');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../husky'));
  }

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        'lint-staged': '^8.1.0',
      },
      husky: {
        hooks: {
          'pre-commit': 'lint-staged',
        },
      },
      'lint-staged': {},
    });
  }

  install() {
    super.install();
  }
};
