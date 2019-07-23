'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:commitlint', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/commitlint'));
  });

  it('creates files', () => {
    assert.file(['commitlint.config.js']);

    assert.jsonFileContent('package.json', {
      husky: {
        hooks: {
          'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
        },
      },
    });
  });
});
