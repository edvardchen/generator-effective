'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:et', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/et'))
      .withPrompts({ someAnswer: true });
  });

  it('create files', () => {
    assert.file(['.eslintrc.yml', 'tsconfig.json']);
  });

  it('install deps', () => {
    assert.jsonFileContent('package.json', {
      devDependencies: {
        '@typescript-eslint/eslint-plugin': /.*/,
        '@typescript-eslint/parser': /.*/,
      },
    });

    assert.fileContent(
      '.eslintrc.yml',
      /plugin:@typescript-eslint\/recommended/
    );
  });
});
