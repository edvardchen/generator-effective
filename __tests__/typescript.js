'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:typescript', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/typescript'));
  });

  it('creates files', () => {
    assert.file(['tsconfig.json']);
  });
});
