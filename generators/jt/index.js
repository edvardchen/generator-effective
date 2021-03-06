'use strict';
const Generator = require('../Base');

module.exports = class extends Generator {
  initializing() {
    if (!this.options.internal) {
      this.composeWith(require.resolve('../typescript'));
      this.composeWith(require.resolve('../jest'));
    }
  }

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        'ts-jest': '^24.0.2',
        '@types/jest': '^24.0.15',
      },
    });
  }

  conflicts() {
    //
    // ─── JEST CONFIG ─────────────────────────────────────────────────
    //

    const configPath = this.destinationPath('jest.config.js');
    let content = this.fs.read(configPath);

    content = content.replace(/\/\/ preset:.*/, "preset: 'ts-jest',");
    content = content.replace(
      /\/\/ globals: {},/,
      "globals: { 'ts-jest': { tsConfig: './tsconfig.test.json', }, },"
    );

    this.fs.write(configPath, content);
    // ─────────────────────────────────────────────────────────────────

    //
    // ─── TSCONFIG ────────────────────────────────────────────────────
    //

    this.fs.copy(
      this.templatePath('tsconfig.test.json'),
      this.destinationPath('tsconfig.test.json')
    );
    // ─────────────────────────────────────────────────────────────────
  }

  install() {
    super.install();
  }
};
