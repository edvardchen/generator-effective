'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../ept'));
    this.composeWith(require.resolve('../commitlint'));
    this.composeWith(require.resolve('../gitignore'));
    this.composeWith(require.resolve('../jest'));
    this.composeWith(require.resolve('../ej'), {
      internal: true,
    });
    this.composeWith(require.resolve('../jt'), {
      internal: true,
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the groovy ${chalk.red('generator-effective')} generator!`
      )
    );

    const questions = [
      {
        type: 'confirm',
        message: 'Would you like to publish this project on npm registry?',
        name: 'public',
      },
    ];

    return this.prompt(questions).then(props => {
      this.props = props;
    });
  }

  conflicts() {
    if (!this.props.public) {
      this.fs.extendJSON(this.destinationPath('package.json'), {
        private: true,
      });
    }
  }

  // writing() {
  //   this.fs.copy(
  //     this.templatePath('dummyfile.txt'),
  //     this.destinationPath('dummyfile.txt')
  //   );
  // }
};
