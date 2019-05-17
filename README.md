# generator-effective [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> a opinionated and progressive generator to make package.json and thousands of configs effective

## Installation

First, install [Yeoman](http://yeoman.io) and generator-effective using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-effective
```

Run one of subgenerators `yo effective:[subgenerator]` like:

```bash
# init TypeScript for your project
yo effective:typescript
```

## Subgenerators

- [typescript](./generators/typescript/README.md) -- Enable TypeScript development enviroment

- [lint-staged](./generators/lint-staged/README.md) -- Configure project to run lint-staged at git hook `precommit`

- [prettier](./generators/prettier/README.md) -- Configure project to format files by `prettier`

- [eslint](./generators/eslint/README.md) -- Enable eslint and integrate with other tools like typescrip

## Getting To Know Yeoman

- Yeoman has a heart of gold.
- Yeoman is a person with feelings and opinions, but is very easy to work with.
- Yeoman can be too opinionated at times but is easily convinced not to be.
- Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [edvardchen]()

[npm-image]: https://badge.fury.io/js/generator-effective.svg
[npm-url]: https://npmjs.org/package/generator-effective
[travis-image]: https://travis-ci.org//generator-effective.svg?branch=master
[travis-url]: https://travis-ci.org//generator-effective
[daviddm-image]: https://david-dm.org//generator-effective.svg?theme=shields.io
[daviddm-url]: https://david-dm.org//generator-effective
[coveralls-image]: https://coveralls.io/repos//generator-effective/badge.svg
[coveralls-url]: https://coveralls.io/r//generator-effective
