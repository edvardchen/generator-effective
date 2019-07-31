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

    it('creates files', () => {
      assert.file(['tsconfig.json']);
      assert.jsonFileContent('tsconfig.json', {
        compilerOptions: {
          target: 'esnext',
          declaration: true,
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

    it('creates files', () => {
      assert.file(['tsconfig.json']);
      assert.jsonFileContent('tsconfig.json', {
        compilerOptions: { target: 'es6' },
      });
      assert.noJsonFileContent('tsconfig.json', {
        compilerOptions: { declaration: true },
      });
    });
  });
});
