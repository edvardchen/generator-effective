/* eslint-disable max-nested-callbacks */
'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
// const fs = require('fs');

describe('generator-effective:eslint', () => {
  describe('blank', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/eslint'));
    });

    it('creates files', () => {
      assert.file(['.eslintrc.yml']);
    });

    it('eslint before commit', () => {
      assert.jsonFileContent('package.json', {
        'lint-staged': {
          '*.{tsx,ts}': ['eslint'],
        },
      });
    });

    it('add lint script', () => {
      assert.jsonFileContent('package.json', {
        scripts: {
          lint: 'eslint src',
        },
      });
    });

    it('add pretest script', () => {
      assert.jsonFileContent('package.json', {
        scripts: {
          pretest: 'npm run lint',
        },
      });
    });
  });
});
