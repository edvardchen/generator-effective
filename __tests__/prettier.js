/* eslint-disable max-nested-callbacks */
'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');

describe('generator-effective:prettier', () => {
  describe('blank', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/prettier'));
    });

    it('add lint-staged', () => {
      assert.fileContent(
        'package.json',
        /"*\.\{ts,tsx,js,json\}": \[\s+"prettier --write",\s+"git add"\s+\]/m
      );
    });

    it('add devDep prettier', () => {
      assert.fileContent('package.json', /"prettier": "*"/);
    });
  });

  // function createEslintrc() {
  //   const done = this.async();
  //   fs.writeFile(path.resolve('./.eslintrc.yml'), '', done);
  // }

  // describe('integrate with eslint', () => {
  //   describe('choose eslint to run prettier', () => {
  //     beforeAll(() => {
  //       return helpers
  //         .run(path.join(__dirname, '../generators/prettier'))
  //         .withPrompts({
  //           formatCommand: 'eslint --fix',
  //         })
  //         .inTmpDir(createEslintrc);
  //     });

  //     it('creates files', () => {
  //       assert.fileContent(
  //         'package.json',
  //         /"*\.\{ts,js\}": \[\s+"eslint --fix",\s+"git add"\s+\]/m
  //       );
  //       assert.fileContent('.eslintrc.yml', 'plugin:prettier/recommended');
  //     });
  //   });

  //   describe('run prettier itself', () => {
  //     beforeAll(() => {
  //       return helpers
  //         .run(path.join(__dirname, '../generators/prettier'))
  //         .inTmpDir(createEslintrc);
  //     });
  //     it('creates files', () => {
  //       assert.fileContent(
  //         'package.json',
  //         /"*\.\{ts,js,json,scss,css,md\}": \[\s+"prettier --write",\s+"git add"\s+\]/m
  //       );
  //       assert.fileContent('.eslintrc.yml', ' prettier\n');
  //     });
  //   });
  // });
});
