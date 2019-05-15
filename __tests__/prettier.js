'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:prettier', () => {
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
