'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:jt', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/jt'));
  });

  it('creates files', () => {
    assert.fileContent('jest.config.js', "preset: 'ts-jest',");
    assert.fileContent('jest.config.js', "tsConfig: './tsconfig.test.json'");
    assert.jsonFileContent('tsconfig.test.json', {
      compilerOptions: {
        types: ['node', 'jest'],
      },
    });
  });
});
