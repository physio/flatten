var _ = require('lodash');
var FlattenerClass = require('./flatten.class.js');

class Searcher {
  static instance = null;
  repository = [];
  static getRepository() {
    if (this.instance == null) {
      this.instance = new Searcher();
    }
    return this.instance;
  }

  all() {
    return this.repository;
  }

  getItem(index) {
    return { id: index };
  }

  search(searchTerm) {
    const filteredCollection = _.filter(this.repository, (item) => {
      const values = _.flatMapDeep(item, (value) =>
        _.isArray(value) ? value : [value]
      );
      return _.some(values, (value) =>
        _.includes(_.toLower(value), _.toLower(searchTerm))
      );
    });

    return filteredCollection;
  }

  getCollection(collection) {
    return [{}];
  }

  populate(jsonData) {
    try {
      this.repository = FlattenerClass.flatten(jsonData);
    } catch (err) {
      throw new Error("data configuration not valid.");
    }
  }
}

module.exports = Searcher;
