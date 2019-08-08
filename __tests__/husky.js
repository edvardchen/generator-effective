'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:husky', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/husky'));
  });

  it('install husky', () => {
    assert.jsonFileContent('package.json', {
      devDependencies: {
        husky: /.*/,
      },
    });
  });
});
