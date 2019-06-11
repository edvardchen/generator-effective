'use strict';
const path = require('path');
const yaml = require('js-yaml');
const cosmiconfig = require('cosmiconfig');
/**
 * quick way to remove item from array
 * @param {Array.<string>} array list
 * @param {string} item item ready to be removed
 */
exports.quickRemove = function(array = [], item) {
  if (!Array.isArray(array)) return;
  const index = array.indexOf(item);
  if (index === -1) return;
  array.splice(index, 1);
};

/**
 * write config back to configuration file
 * @param {Generator} generator yoeman generator
 * @param {string} filepath configuration file path
 * @param {Object} config config data
 */
exports.writeConfig = function(generator, filepath, config) {
  switch (path.extname(filepath)) {
    case '.js':
      generator.log(
        `don't suport to update config with .js extension: ${filepath}`
      );
      return;
    case '。yaml':
    case '.yml':
      generator.fs.write(filepath, yaml.safeDump(config));
      return;
    case '.json':
    default:
      generator.fs.writeJSON(filepath, config);
      break;
  }
};

/**
 * seach config
 * @param {Generator} generator yoeman generator
 * @param {string} modulename config module name
 * @returns {null|CosmiconfigResult} the found config
 */
exports.searchConfig = function(generator, modulename) {
  const explorer = cosmiconfig(modulename, {
    ignoreEmptySearchPlaces: false,
    stopDir: generator.destinationRoot(),
  });
  return explorer.searchSync();
};

/**
 * cast non-array property to array
 * @param {Object} config config data
 * @param {string} key the property key
 */
exports.castToArray = function(config, key) {
  if (!Array.isArray(config[key])) {
    config[key] = config[key] === undefined ? [] : [config[key]];
  }
};

/**
 * cast non-array property to array
 * @param {Generator} generator yeoman generator
 */
exports.installDependencies = function(generator) {
  let options = {
    npm: true,
  };
  if (exports.usingYarn(generator)) {
    options = {
      yarn: true,
    };
  }
  generator.installDependencies({
    ...options,
    bower: false,
  });
};

/**
 * detect user is using yarn or not
 * @param {Generator} generator yeoman generator
 * @returns {boolean} result
 */
exports.usingYarn = function(generator) {
  return generator.fs.exists(generator.destinationPath('yarn.lock'));
};
