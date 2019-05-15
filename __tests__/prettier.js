'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');

describe('generator-effective:prettier', () => {
  describe('blank', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/prettier'));
    });

    it('creates files', () => {
      assert.fileContent(
        'package.json',
        /"*\.\{ts,css,md,js\}": \[\s+"prettier --write",\s+"git add"\s+\]/m
      );
    });
  });

  describe('integrate with eslint', () => {
    function createEslintrc() {
      const done = this.async();
      fs.writeFile(path.resolve('./.eslintrc'), '', done);
    }

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/prettier'))
        .withPrompts({
          formatWay: 1
        })
        .inTmpDir(createEslintrc);
    });

    it('creates files', () => {
      assert.fileContent(
        'package.json',
        /"*\.\{ts,css,md,js\}": \[\s+"eslint --fix",\s+"git add"\s+\]/m
      );
    });
  });
});
