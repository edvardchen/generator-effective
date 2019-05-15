'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:lint-staged', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/lint-staged'));
  });

  it('creates files', () => {
    assert.fileContent(
      'package.json',
      '"pre-commit": "lint-staged"',
      '"lint-staged":'
    );
  });
});
