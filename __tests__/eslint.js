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
  });

  describe('integrate with typescript', () => {
    // describe("user eslint config doesn't exist", () => {
    //   beforeAll(() => {
    //     return helpers
    //       .run(path.join(__dirname, '../generators/eslint'))
    //       .inTmpDir(function() {
    //         const done = this.async();
    //         fs.writeFile('tsconfig.json', '{}', done);
    //       });
    //   });
    //   it('creates files', () => {
    //     assert.fileContent(
    //       '.eslintrc.yml',
    //       '@typescript-eslint/parser',
    //       'plugin:@typescript-eslint/recommended'
    //     );
    //   });
    // });
    // describe('user eslint config exists', () => {
    //   beforeAll(() => {
    //     return helpers
    //       .run(path.join(__dirname, '../generators/eslint'))
    //       .inTmpDir(function() {
    //         const done = this.async();
    //         fs.writeFileSync('./.eslintrc.yml', 'extends: plugin1');
    //         fs.writeFile('tsconfig.json', '{}', done);
    //       });
    //   });
    //   it('creates files', () => {
    //     assert.fileContent(
    //       '.eslintrc.yml',
    //       ' plugin1\n',
    //       'plugin:@typescript-eslint/recommended'
    //     );
    //   });
    // });
  });
});
