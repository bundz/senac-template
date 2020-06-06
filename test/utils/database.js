const Database = require('../../lib/database');

const clear = () => {
  return Database.db.dropDatabase();
};

module.exports = {
  clear
};