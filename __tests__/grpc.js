'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:grpc', () => {
  describe('static', () => {
    beforeAll(() => {
      const context = helpers
        .run(path.join(__dirname, '../generators/grpc'))
        .inTmpDir(function() {
          fs.writeFile('tsconfig.json', '{}', this.async());
        })
        .withPrompts({
          protoDir: path.join(__dirname, '/fixtures/protos'),
        });
      return context;
    });
    it('creates files', () => {
      assert.jsonFileContent('package.json', {
        dependencies: {
          'google-protobuf': /.*/,
        },
      });
      assert.jsonFileContent('tsconfig.json', {
        compilerOptions: {
          allowJs: true,
          declaration: false,
        },
      });
    });
    it('generates pb js', () => {
      assert.file(
        ['helloworld_grpc_pb.js', 'helloworld_pb.js', 'helloworld_pb.d.ts'].map(
          item => `src/static_codegen/${item}`
        )
      );

      assert.file(['src/helloworld/sayHello.ts']);
      assert.fileContent(
        'src/helloworld/sayHello.ts',
        'export default function sayHello'
      );
    });
  });

  describe('dynamic', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/grpc'))
        .withPrompts({
          codegen: 'dynamic',
        })
        .inTmpDir(function() {
          fs.writeFile(
            'tsconfig.json',
            '{"compilerOptions": {}}',
            this.async()
          );
        });
    });
    it('creates files', () => {
      assert.jsonFileContent('package.json', {
        dependencies: {
          'google-protobuf': /.*/,
        },
      });
      assert.noJsonFileContent('tsconfig.json', {
        compilerOptions: {
          allowJs: true,
          declaration: false,
        },
      });
    });
  });
});
