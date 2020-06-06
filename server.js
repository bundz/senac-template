const express = require("express");
const bodyParser = require("body-parser");
const Database = require("./lib/database");
const routes = require("./routes");
const server = express();
Database.init();

server.use(bodyParser.json());

server.use(routes);

server.use((err, req, res, next) => {
  res.send({ message: err.message });
});

module.exports = server;