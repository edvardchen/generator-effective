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

  it('add ts rules', () => {
    assert.fileContent(
      '.eslintrc.yml',
      /plugin:@typescript-eslint\/recommended/
    );
  });

  it('overwrite lint script', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        lint: 'eslint src && tsc --noEmit',
      },
    });
  });

  it('install deps', () => {
    assert.jsonFileContent('package.json', {
      devDependencies: {
        '@typescript-eslint/eslint-plugin': /.*/,
        '@typescript-eslint/parser': /.*/,
      },
    });
  });
});
