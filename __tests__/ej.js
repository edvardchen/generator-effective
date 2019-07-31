'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:ej', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/ej'));
  });

  it('creates files', () => {
    assert.fileContent('.eslintrc.yml', 'jest: true');
  });
});
