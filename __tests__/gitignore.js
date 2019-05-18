'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:gitignore', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/gitignore'));
  });

  it('creates files', () => {
    assert.file(['.gitignore']);
  });
});
