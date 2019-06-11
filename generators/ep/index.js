'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const formatCommands = ['prettier --write', 'eslint --fix'];

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../prettier'));
    // this.composeWith(require.resolve('../eslint'));
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the slick ${chalk.red('generator-effective')} generator!`
      )
    );

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
        'eslint-plugin-prettier': '^3.1.o',
      });
    }
    // add devDeps
    const pkgFile = this.destinationPath('package.json');
    this.fs.extendJSON(pkgFile, { devDependencies: deps });
  }

  conflicts() {
    const pkgFile = this.destinationPath('package.json');
    //
    // ─── CHANGE FORMAT COMMAND ───────────────────────────────────────
    //
    const pkgConent = this.fs.read(pkgFile);
    this.fs.write(
      pkgFile,
      pkgConent.replace(formatCommands[0], formatCommands[1])
    );
  }

  install() {
    this.installDependencies();
  }
};
