let cache = {};

module.exports = {
  cache: cache,
  set: data => {
    cache = Object.assign(cache, data);
  },
  get(key) {
    return cache[key];
  }
};
