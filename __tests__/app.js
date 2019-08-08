'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ public: false });
  });

  it('prevent publishing', () => {
    assert.jsonFileContent('package.json', {
      private: true,
    });
  });
});
