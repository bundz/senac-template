const Collection = require("../lib/collection");
const { ObjectId } = require("mongodb");

class User extends Collection {
  constructor() {
    super("users");
  }

  find(limit, skip, sort) {
    return this.collection
      .find({})
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .toArray();
  }

  findOne(id) {
    return this.collection.findOne({ _id: ObjectId(id) });
  }

  insertOne(user) {
    return this.collection.insertOne(user);
  }

  updateOne(id, body) {
    return this.collection.updateOne({ _id: ObjectId(id) }, { $set: body });
  }

  deleteOne(id) {
    return this.collection.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = new User();
