const { MongoClient } = require("mongodb");
const databaseName = process.env.DATABASE || "super-news";
class Database {
  async init() {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
      useUnifiedTopology: true,
    });
    this.db = client.db(databaseName);
  }
}

module.exports = new Database();
