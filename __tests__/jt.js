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
    assert.jsonFileContent('tsconfig.json', {
      compilerOptions: {
        types: ['node', 'jest'],
      },
    });
  });
});
