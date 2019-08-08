'use strict';
const Generator = require('../Base');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../husky'));
  }

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: {
        test: 'jest',
      },
      husky: {
        hooks: {
          'pre-push': 'npm t',
        },
      },
      devDependencies: {
        jest: '^24.8.0',
      },
    });
    this.fs.copy(
      this.templatePath('jest.config.js'),
      this.destinationPath('jest.config.js')
    );
  }

  install() {
    super.install();
  }
};
