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

    let data = {
      devDependencies: {
        typescript: '^3.7.4',
        '@types/node': '^12.0.8',
      },
    };
    if (this.props.target === 'Node.js') {
      data = {
        ...data,
        scripts: {
          prepublish: 'npm run build',
          build: 'tsc',
        },
      };
    }

    this.fs.extendJSON(this.destinationPath('package.json'), data);
  }

  install() {
    helper.installDependencies(this);
  }
};
