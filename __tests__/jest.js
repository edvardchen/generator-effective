'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:jest', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/jest'));
  });

  it('creates files', () => {
    assert.jsonFileContent('package.json', {
      scripts: {
        test: 'jest',
      },
    });
  });
});
