const db = require("../db");

function findAll({ publishedOnly }) {
  return new Promise((resolve, reject) => {
    const query = publishedOnly
      ? "SELECT * FROM posts WHERE isPublished = 1 ORDER BY createdAt DESC"
      : "SELECT * FROM posts ORDER BY createdAt DESC";
    db.all(query, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
}

function find(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM posts WHERE (id = ?)", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

function create({ title, body }) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO posts (title, body, ispublished, createdAt) VALUES (?, ?, TRUE, datetime("now"))',
      [title, body],
      (err) => (err ? reject(err) : resolve())
    );
  });
}

function update(id, { title, body, isPublished }) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE posts SET title = ?, body = ?, ispublished = ? WHERE (id = ?)",
      [title, body, isPublished ? true : false, id],
      (err) => (err ? reject(err) : resolve())
    );
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM posts WHERE (id = ?)", [id], (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
}

module.exports = {
  findAll,
  find,
  create,
  update,
  remove,
};
