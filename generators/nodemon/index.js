'use strict';
const Generator = require('../Base');

module.exports = class extends Generator {
  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        concurrently: '^4.1.1',
        nodemon: '^1.19.1',
      },
      scripts: {
        watch:
          'concurrently --kill-others "npm run build -- --watch --outDir .tmp" "nodemon --inspect .tmp/index.js" ',
      },
    });

    this.fs.copy(this.templatePath(), this.destinationPath(), {
      globOptions: {
        dot: true,
      },
    });
  }

  install() {
    super.install();
  }
};
