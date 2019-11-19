'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-effective:grpc', () => {
  describe('static', () => {
    describe('none selected default', () => {
      beforeAll(() => {
        const context = helpers
          .run(path.join(__dirname, '../generators/grpc'))
          .inTmpDir(createProjectFiles)
          .withPrompts({
            protoDir: path.join(__dirname, '/fixtures/protos'),
          });
        return context;
      });

      it('install deps', () => {
        assert.jsonFileContent('package.json', {
          dependencies: {
            'google-protobuf': /.*/,
          },
        });
      });
      it('update tsconfig.json', () => {
        assert.jsonFileContent('tsconfig.json', {
          compilerOptions: {
            allowJs: true,
            declaration: false,
          },
        });
      });

      it('dont generates pb js', () => {
        assert.noFile(
          [
            'helloworld_grpc_pb.js',
            'helloworld_pb.js',
            'helloworld_pb.d.ts',
          ].map(item => `src/static_codegen/${item}`)
        );
      });
    });

    function createProjectFiles() {
      console.log(arguments[0]);
      fs.mkdirSync('src');
      fs.writeFile(
        'src/index.ts',
        `/* BEGIN GRPC IMPORT */\n/* END */\n` +
          `/* BEGIN ADD SERVICE */\nserver.addService(GreeterService, { sayHello });\n/* END */\n`,
        this.async()
      );
      fs.writeFile('tsconfig.json', '{}', this.async());
    }

    describe.only('generate static files', () => {
      beforeAll(() => {
        const context = helpers
          .run(path.join(__dirname, '../generators/grpc'))
          .inTmpDir(createProjectFiles)
          .withPrompts({
            pbWillBeImplemented: [
              // path.join(__dirname, '/fixtures/protos/helloworld.proto'),
              // path.join(__dirname, '/fixtures/protos/route_guide.proto'),
              path.join(__dirname, '/fixtures/protos/test_import.proto'),
            ],
            generateImplementationTemplates: true,
            protoDir: path.join(__dirname, '/fixtures/protos'),
          });
        return context;
      });
      it('generates pb js', () => {
        assert.file(
          [
            'helloworld_grpc_pb.js',
            'helloworld_pb.js',
            'helloworld_pb.d.ts',
          ].map(item => `src/static_codegen/${item}`)
        );
      });

      // it('generate server method implementation templates', () => {
      //   assert.file([
      //     // four kinds
      //     'src/Greeter/sayHello.ts',
      //     'src/RouteGuide/listFeatures.ts',
      //     'src/RouteGuide/recordRoute.ts',
      //     'src/RouteGuide/routeChat.ts',
      //   ]);
      //   assert.fileContent(
      //     'src/Greeter/sayHello.ts',
      //     'export default sayHello'
      //   );
      // });

      // it('import methods', () => {
      //   assert.fileContent(
      //     'src/index.ts',
      //     "import sayHello from './Greeter/sayHello';"
      //   );
      //   assert.fileContent(
      //     'src/index.ts',
      //     "import { GreeterService } from './static_codegen/helloworld_grpc_pb';"
      //   );
      // });
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
