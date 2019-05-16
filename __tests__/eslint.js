'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:eslint', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/eslint'));
  });

  it('creates files', () => {
    assert.file(['.eslintrc.yml']);
  });
});
