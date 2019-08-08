'use strict';
const Generator = require('../Base');

module.exports = class extends Generator {
  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        husky: '^1.2.0',
        'lint-staged': '^8.1.0',
      },
      husky: {
        hooks: {},
      },
    });
  }

  install() {
    super.install();
  }
};
