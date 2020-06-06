const Database = require("./database");

class Collection {
  constructor(name) {
    this.name = name;
  }

  get collection() {
    return Database.db.collection(this.name);
  }
}

module.exports = Collection;
