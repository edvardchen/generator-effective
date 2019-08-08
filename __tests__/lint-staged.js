'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:lint-staged', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/lint-staged'));
  });

  it('creates files', () => {
    assert.jsonFileContent('package.json', {
      husky: {
        hooks: {
          'pre-commit': 'lint-staged',
        },
      },
      devDependencies: {
        husky: /.*/,
        'lint-staged': /.*/,
      },
    });
  });
});
