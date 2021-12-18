const path = require("path");
const fs = require("fs");
const sqlite = require("sqlite3");

const dbFile = path.resolve(__dirname, "../data/db.sqlite");

const args = process.argv.slice(2);

if (fs.existsSync(dbFile)) {
  if (!args.includes("--force")) {
    console.log(
      "Db file already exists, delete it first or use the --force flag!"
    );
    process.exit(1);
  } else {
    console.log("DB already exists, Deleting it...");
    fs.rmSync(dbFile);
  }
}

const db = new sqlite.Database(dbFile);

db.serialize(() => {
  console.log("Creating tables...");
  // create posts table
  db.run(
    "CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, body TEXT, isPublished INTEGER, createdAt TEXT)"
  );

  if (args.includes("--seed")) {
    console.log("Seeding data into database...");

    db.run(
      'INSERT INTO posts (categoryId, title, body, isPublished, createdAt) VALUES (1, "This is the Title", "This is the body", 0, datetime("now"))'
    );
  }
});
