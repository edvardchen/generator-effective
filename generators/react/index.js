'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'stateManager',
        message: 'Which state management library does your project use?',
        choices: ['redux', 'mobx'],
        store: true,
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const deps = {
      react: '^16.8.6',
      'react-dom': '^16.8.6',
    };
    switch (this.props.stateManager) {
      case 'redux': {
        Object.assign(deps, {
          'react-redux': '^7.0.3',
          redux: '^4.0.1',
        });
        break;
      }
      case 'mobx': {
        Object.assign(deps, {
          mobx: '^4.10.0',
          'mobx-react': '^6.0.3',
        });
        break;
      }
      default:
        break;
    }
    const pkgPath = this.destinationPath('package.json');

    this.fs.extendJSON(pkgPath, { dependencies: deps });

    //
    // ─── TSCONFIG ────────────────────────────────────────────────────
    //

    const tsconfig = this.destinationPath('tsconfig.json');
    const usingTS = this.fs.exists(tsconfig);
    if (usingTS) {
      this.fs.extendJSON(tsconfig, {
        compilerOptions: {
          jsx: 'react',
        },
      });
    }
    // ─────────────────────────────────────────────────────────────────

    //
    // ─── ESLINT ──────────────────────────────────────────────────────
    //
    const foundEslintConfig = helper.searchConfig(this, 'eslint');

    if (foundEslintConfig) {
      this.fs.extendJSON(pkgPath, {
        devDependencies: {
          'eslint-plugin-react': '^7.13.0',
        },
      });

      const { config = {}, filepath } = foundEslintConfig;
      helper.castToArray(config, 'extends');

      // change config
      config.extends.push('plugin:react/recommended');
      if (!usingTS) {
        // not using TS
        config.parserOptions = {
          ...config.parserOptions,
          ecmaFeatures: {
            ...(config.parserOptions && config.parserOptions.ecmaFeatures),
            jsx: true,
          },
        };
      }

      helper.writeConfig(this, filepath, config);
    }
    // ─────────────────────────────────────────────────────────────────
  }

  install() {
    helper.installDependencies(this);
  }
};
