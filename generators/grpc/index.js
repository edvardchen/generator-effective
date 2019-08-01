'use strict';
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const globby = require('globby');

const Generator = require('../Base');

const STATIC = 'static';
const DYNAMIC = 'dynamic';
const codegens = [STATIC, DYNAMIC];

// function getPluginPath() {
//   return new Promise(resolve => {
//     const process = this.spawnCommand(
//       'which',
//       ['grpc_tools_node_protoc_plugin'],
//       {
//         stdio: 'pipe',
//       }
//     );
//     let pluginPath = '';
//     process.stdout.on('data', message => {
//       pluginPath = message.toString();
//     });
//     process.stdout.on('close', () => {
//       resolve(pluginPath);
//     });
//   });
// }

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'choice',
        name: 'codegen',
        choices: codegens,
        message:
          'WHich way would you like to generate JavaScript file from proto file? Static codegen is easy to infer types.',
        default: STATIC,
      },
      {
        name: 'protoDir',
        message: 'The directory of proto files:',
        default: 'protos',
        when(answers) {
          return answers.codegen === STATIC;
        },
        validate(value) {
          return value.length > 0;
        },
      },
      {
        name: 'outDir',
        message: 'Output directory of generated files:',
        default: 'src/static_codegen',
        when(answers) {
          return answers.codegen === STATIC;
        },
        validate(value) {
          return value.length > 0;
        },
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    //
    // ─── DEPENDENCIES ────────────────────────────────────────────────
    //

    const dependencies = {
      grpc: '^1.22.2',
    };
    if (this.props.codegen === STATIC) {
      Object.assign(dependencies, {
        'google-protobuf': '^3.9.0',
      });
    } else {
      Object.assign(dependencies, {
        '@grpc/proto-loader': '^0.5.1',
      });
    }
    this.fs.extendJSON(this.destinationPath('package.json'), { dependencies });
    // ─────────────────────────────────────────────────────────────────

    //
    // ─── CODEGEN ─────────────────────────────────────────────────────
    //
    if (this.props.codegen === STATIC) {
      const protoDir = this.destinationPath(this.props.protoDir);
      if (fs.existsSync(protoDir)) {
        let { outDir } = this.props;
        mkdirp(outDir);
        outDir = this.destinationPath(outDir);
        // grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./static_codegen/ --grpc_out=./static_codegen --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` protos/helloworld.proto
        const binPath = path.join(
          __dirname,
          '../../node_modules/.bin/grpc_tools_node_protoc'
        );
        this.spawnCommandSync(
          binPath,
          [
            `--js_out=import_style=commonjs,binary:${outDir}`,
            `--grpc_out=${outDir}`,
            // `--plugin='protoc-gen-grpc=${pluginPath}'`,
            ...globby
              .sync(protoDir + '/**/*.proto')
              .map(item => path.basename(item)),
          ],
          { cwd: protoDir, stdio: 'inherit' }
        );
      } else {
        mkdirp(protoDir);
      }
    }
    // ─────────────────────────────────────────────────────────────────
  }

  conflicts() {
    // change tsconfig.json
    if (this.props.codegen === STATIC) {
      const tsJson = this.destinationPath('tsconfig.json');
      if (this.fs.exists(tsJson)) {
        this.fs.extendJSON(tsJson, {
          compilerOptions: {
            allowJs: true,
            declaration: false,
          },
        });
      }
    }
  }

  install() {
    super.install();
  }
};
