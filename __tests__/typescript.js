'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');

const generatorPath = path.join(__dirname, '../generators/typescript');
describe('generator-effective:typescript', () => {
  describe('blank', () => {
    beforeAll(() => {
      return helpers.run(generatorPath);
    });

    it('creates files', () => {
      assert.file(['tsconfig.json']);
    });
  });

  describe('integrate with eslint', () => {
    beforeAll(() => {
      return helpers.run(generatorPath).inTmpDir(function() {
        const done = this.async();
        fs.writeFile(path.resolve('./.eslintrc.yml'), '', done);
      });
    });

    it('update eslint config', () => {
      assert.fileContent(
        '.eslintrc.yml',
        '@typescript-eslint/parser',
        'plugin:@typescript-eslint/recommended'
      );
    });
  });
});
