'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

const formatCommands = ['prettier --write', 'eslint --fix'];

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../prettier'));
    this.composeWith(require.resolve('../eslint'));
  }

  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'formatCommand',
        message: 'Which way would you like to format code?',
        choices: formatCommands,
        default: formatCommands[0],
      },
    ];

    return this.prompt(prompts).then(props => {
      this.formatByEslint = props.formatCommand === formatCommands[1];
    });
  }

  writing() {
    const deps = {
      'eslint-config-prettier': '^4.3.0',
    };
    if (this.formatByEslint) {
      Object.assign(deps, {
        'eslint-plugin-prettier': '^3.1.0',
      });
    }
    // add devDeps
    const pkgFile = this.destinationPath('package.json');
    this.fs.extendJSON(pkgFile, { devDependencies: deps });
  }

  conflicts() {
    if (this.formatByEslint) {
      const pkgFile = this.destinationPath('package.json');
      //
      // ─── CHANGE FORMAT COMMAND ───────────────────────────────────────
      //
      const pkgConent = this.fs.read(pkgFile);
      this.fs.write(
        pkgFile,
        pkgConent.replace(formatCommands[0], formatCommands[1])
      );
      // ─────────────────────────────────────────────────────────────────
    }

    //
    // ─── SET PRETTIER IN ESLINT CONFIG ───────────────────────────────
    //

    const { filepath, config } = helper.searchConfigExtended(
      this,
      'eslint',

      // we should konw FILENAME of eslint config that added by eslint subgenerator
      '.eslintrc.yml'
    );

    // const { config } = eslintConfig;
    helper.castToArray(config, 'extends');

    if (this.formatByEslint) {
      // remove prettier from plugins
      helper.quickRemove(config.plugins, 'prettier');
      helper.quickRemove(config.extends, 'prettier');

      config.extends.push('plugin:prettier/recommended');
    } else {
      config.extends.push('prettier');
    }

    helper.writeConfig(this, filepath, config);
    // ─────────────────────────────────────────────────────────────────
  }

  install() {
    helper.installDependencies(this);
  }
};
