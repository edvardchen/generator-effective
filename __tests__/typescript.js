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
    });
  });
});
