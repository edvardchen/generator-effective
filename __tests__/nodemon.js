'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:nodemon', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/nodemon'));
  });

  it('creates files', () => {
    assert.file(['.vscode/launch.json']);
  });
});
