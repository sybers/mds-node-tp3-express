const path = require("path");
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(path.resolve(__dirname, "../data/db.sqlite"));

module.exports = db;
