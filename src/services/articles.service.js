const db = require("../db");

function findAll() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM articles ORDER BY createdAt DESC", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function findAllPublished() {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM articles WHERE isPublished = 0 ORDER BY createdAt DESC",
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

function create(data) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO articles (title, body, ispublished, createdAt) VALUES (?, ?, 0, datetime("now"))',
      [data.title, data.body],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM articles WHERE (id = ?)", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = {
  findAll,
  findAllPublished,
  create,
  findById,
};
