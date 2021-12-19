const { promisify } = require("util");
const path = require("path");
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(path.resolve(__dirname, "../data/db.sqlite"));

// patch most common sqlite methods so they use Promises isntead of callbacks
["run", "get", "all", "each", "exec", "prepare"].forEach(
  (method) => (db[method] = promisify(db[method]))
);

module.exports = db;
