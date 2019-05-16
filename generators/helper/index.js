/**
 * quick way to remove item from array
 * @param {Array.<string>} array list
 * @param {string} item item ready to be removed
 */
exports.quickRemove = function(array = [], item) {
  const index = array.indexOf(item);
  if (index === -1) return;
  array.splice(index, 1);
};
