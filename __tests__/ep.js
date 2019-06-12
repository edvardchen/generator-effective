'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
// const { exec } = require('child_process');

describe('generator-effective:ep', () => {
  describe('format by prettier', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/ep'));
    });

    it('only contains eslint-config-prettier', () => {
      assert.jsonFileContent('package.json', {
        devDependencies: {
          'eslint-config-prettier': /.*/,
        },
      });
      assert.noFileContent('package.json', /eslint-plugin-prettier/);
      assert.fileContent('.eslintrc.yml', /- prettier/);
    });

    it('contains prettier --write', () => {
      assert.fileContent('package.json', /prettier --write/);
    });
  });

  describe('format by eslint', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/ep')).withPrompts({
        formatCommand: 'eslint --fix',
      });
      // .inTmpDir(function() {
      //   const done = this.async();
      //   exec('npm init -y', done);
      // });
    });

    it('contains eslint-plugin-prettier', () => {
      assert.jsonFileContent('package.json', {
        devDependencies: {
          'eslint-config-prettier': /.*/,
          'eslint-plugin-prettier': /.*/,
        },
      });
      assert.fileContent('.eslintrc.yml', /plugin:prettier\/recommended/);
    });

    it('dont contain prettier --write', () => {
      assert.noFileContent('package.json', /prettier --write/);
      assert.fileContent('package.json', /eslint --fix/);
    });
  });
});
