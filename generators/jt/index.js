'use strict';
const Generator = require('../Base');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../typescript'));
    this.composeWith(require.resolve('../jest'));
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

    content = content.replace(/.*preset:(.*)/, "preset: 'ts-jest',");

    this.fs.write(configPath, content);
    // ─────────────────────────────────────────────────────────────────

    //
    // ─── TSCONFIG ────────────────────────────────────────────────────
    //

    const tsconfigPath = this.destinationPath('tsconfig.json');
    const { types } = this.fs.readJSON(tsconfigPath).compilerOptions;
    this.fs.extendJSON(tsconfigPath, {
      compilerOptions: {
        types: [...types, 'jest'],
      },
    });
    // ─────────────────────────────────────────────────────────────────
  }

  install() {
    super.install();
  }
};
