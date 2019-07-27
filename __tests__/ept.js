'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:ept', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/ept'));
  });

  it('creates files', () => {
    assert.file(['.eslintrc.yml', 'tsconfig.json', '.prettierrc']);
  });

  it('change prettier eslint rule', () => {
    assert.fileContent('.eslintrc.yml', /prettier\/@typescript-eslint/);
    assert.fileContent(
      '.eslintrc.yml',
      'plugin:@typescript-eslint/recommended'
    );
  });
});
