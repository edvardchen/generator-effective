'use strict';
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const globby = require('globby');
const { spawn } = require('child_process');
const yosay = require('yosay');
const chalk = require('chalk');
const pbLoader = require('@grpc/proto-loader');

const Generator = require('../Base');

const STATIC = 'static';
const DYNAMIC = 'dynamic';
const codegens = [STATIC, DYNAMIC];

/**
 * which program in Node.js
 * @param {string} program binary file
 * @returns {Promise<string>} program path
 */
function which(program) {
  const process = spawn('which', [program]);
  return new Promise(resolve => {
    let result;
    process.stdout.on('data', message => {
      result = message.toString();
    });
    process.stdout.on('close', () => {
      resolve(result);
    });
  });
}

/**
 * install global package
 * @param {string} pkg package name
 * @returns {Promise<void>} void
 */
function globalInstall(pkg) {
  this.log(
    yosay(
      `${pkg} not found. Auto install for you.\n    ${chalk.yellow(
        `npm i -g ${pkg}`
      )}`
    )
  );
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['i', '-g', pkg], {
      stdio: 'inherit',
    });

    child.on('exit', code => {
      if (code !== 0) {
        this.log(
          `Failed to install. You should install by yourself: ${chalk.yellow(
            `npm i -g ${pkg}`
          )}`
        );
        return reject(code);
      }
      resolve();
    });
  });
}

/**
 * generate server implementation templates
 * @this Generator
 * @param {string[]} protos proto files
 */
function generateImplementationTemplates(protos) {
  const protoDir = this.destinationPath(this.props.protoDir);
  // const outDir = this.destinationPath(this.props.outDir);
  protos.forEach(item => {
    const serviceName = item.substring(0, item.indexOf('.proto'));
    const serverDir = `src/${serviceName}`;
    // create server directory
    mkdirp(this.destinationPath(serverDir));

    const def = pbLoader.loadSync(path.join(protoDir, item));

    Object.values(def).forEach(item => {
      if (item.type) {
        // Message
        return;
      }

      Object.values(item).forEach(
        ({
          originalName,
          requestType: {
            type: { name: requestType },
          },
          responseType: {
            type: { name: responseType },
          },
          requestStream,
          responseStream,
        }) => {
          if (!requestStream && !responseStream) {
            const relatedPath = path.relative(serverDir, this.props.outDir);
            this.fs.copyTpl(
              this.templatePath('unaryCall.ts'),
              this.destinationPath(`${serverDir}/${originalName}.ts`),
              {
                pbPath: `${relatedPath}/${serviceName}_pb`,
                requestType,
                responseType,
                method: originalName,
              }
            );
          }
        }
      );
    });
  });
}

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
      {
        type: 'confirm',
        name: 'generateImplementationTemplates',
        message: 'Would you like to generate serer implementation templates?',
        when(answers) {
          return answers.codegen === STATIC;
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
        outDir = this.destinationPath(outDir);
        mkdirp(outDir);

        const done = this.async();

        (async () => {
          if (!(await which('grpc_tools_node_protoc'))) {
            await globalInstall.call(this, 'grpc-tools');
          }

          if (!(await which('protoc-gen-ts'))) {
            await globalInstall.call(this, 'ts-protoc-gen');
          }

          const protos = globby
            .sync(protoDir + '/**/*.proto')
            .map(item => path.basename(item));

          // grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./static_codegen/ --grpc_out=./static_codegen --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` protos/helloworld.proto
          const args = [
            `--js_out=import_style=commonjs,binary:${outDir}`,
            `--ts_out=${outDir}`,
            `--grpc_out=${outDir}`,
            // `--plugin="protoc-gen-grpc=${pluginPath}"`,
            // '--plugin="protoc-gen-ts=${pluginPath}"',
            ...protos,
          ];

          await new Promise((resolve, reject) => {
            const child = spawn('grpc_tools_node_protoc', args, {
              cwd: protoDir,
              stdio: 'inherit',
            });
            child.on('error', reject);
            child.on('close', code => {
              if (code === 0) resolve();
              else reject(code);
            });

            if (this.props.generateImplementationTemplates) {
              generateImplementationTemplates.call(this, protos);
            }
          });
        })().finally(done);
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
