'use strict';
const Generator = require('../Base');

module.exports = class extends Generator {
  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: {
        test: 'jest',
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
};
