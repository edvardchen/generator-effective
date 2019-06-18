'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:tw', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/tw'));
  });

  it('creates files', () => {
    assert.file([
      'webpack.config.ts',
      'webpack.config.dev.ts',
      '.postcssrc',
      '.babelrc',
      '.browserslistrc',
      'devServer.config.ts',
    ]);
  });
});
