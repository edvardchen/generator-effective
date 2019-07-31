'use strict';
const Generator = require('yeoman-generator');
const helper = require('../helper');

const choices = ['Node.js', 'browser'];
module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'target',
        message: 'Which target should TypeScript compile to',
        choices,
        default: choices[0],
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json'),
      this.props
    );

    this.fs.extendJSON(this.destinationPath('package.json'), {
      devDependencies: {
        typescript: '^3.5.1',
        '@types/node': '^12.0.8',
      },
    });
  }

  install() {
    helper.installDependencies(this);
  }
};
