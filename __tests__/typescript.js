'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const generatorPath = path.join(__dirname, '../generators/typescript');
describe('generator-effective:typescript', () => {
  describe('blank', () => {
    beforeAll(() => {
      return helpers.run(generatorPath);
    });

    it('set tsconfig', () => {
      assert.jsonFileContent('tsconfig.json', {
        compilerOptions: {
          target: 'esnext',
          outDir: 'lib',
          declaration: true,
        },
        include: ['src'],
      });
    });

    it('add build script', () => {
      assert.jsonFileContent('package.json', {
        scripts: {
          build: 'tsc',
        },
      });
    });
  });

  describe('target browser', () => {
    beforeAll(() => {
      return helpers.run(generatorPath).withPrompts({
        target: 'browser',
      });
    });

    it('set tsconfig', () => {
      assert.jsonFileContent('tsconfig.json', {
        compilerOptions: { target: 'es6' },
      });
      assert.noJsonFileContent('tsconfig.json', {
        compilerOptions: { declaration: true },
      });
    });
  });
});
