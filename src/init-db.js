const path = require("path");
const fs = require("fs");
const sqlite = require("sqlite3");

const dbFile = path.resolve(__dirname, "../data/db.sqlite");

if (fs.existsSync(dbFile)) {
  console.log("Db is already initialized, delete it first!");
  process.exit(1);
}

const db = new sqlite.Database(dbFile);

db.serialize(() => {
  db.run(
    "CREATE TABLE articles (id INTEGER PRIMARY KEY, title TEXT, body TEXT, isPublished INTEGER, createdAt TEXT)"
  );

  const statement = db.prepare(
    'INSERT INTO articles (title, body, isPublished, createdAt) VALUES ("This is the Title", "This is the body", 0, datetime("now"))'
  );

  statement.run();
  statement.finalize();
});
