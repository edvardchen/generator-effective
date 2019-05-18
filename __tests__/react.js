'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');

describe('generator-effective:react', () => {
  describe('parse jsx by TS', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/react'))
        .inTmpDir(function() {
          const done = this.async();
          fs.writeFileSync('./.eslintrc.yml', '');
          fs.writeFile('tsconfig.json', '{"compilerOptions":{}}', done);
        });
    });

    it('creates files', () => {
      assert.fileContent('tsconfig.json', '"jsx": "react"');
      assert.fileContent('.eslintrc.yml', 'lugin:react/recommended');
    });
  });

  describe('parse jsx by eslint', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/react'))
        .inTmpDir(function() {
          const done = this.async();
          fs.writeFile('./.eslintrc.yml', '', done);
        });
    });

    it('creates files', () => {
      assert.fileContent(
        '.eslintrc.yml',
        'plugin:react/recommended',
        '"jsx": true'
      );
    });
  });
});
