const db = require("../db");

async function findAll({ publishedOnly }) {
  const query = publishedOnly
    ? "SELECT * FROM posts WHERE isPublished = 1 ORDER BY createdAt DESC"
    : "SELECT * FROM posts ORDER BY createdAt DESC";

  return db.all(query);
}

async function find(id) {
  return db.get("SELECT * FROM posts WHERE (id = ?)", [id]);
}

async function create({ title, body }) {
  return db.run(
    'INSERT INTO posts (title, body, ispublished, createdAt) VALUES (?, ?, TRUE, datetime("now"))',
    [title, body]
  );
}

async function update(id, { title, body, isPublished }) {
  return db.run(
    "UPDATE posts SET title = ?, body = ?, ispublished = ? WHERE (id = ?)",
    [title, body, isPublished ? true : false, id]
  );
}

async function remove(id) {
  return db.run("DELETE FROM posts WHERE (id = ?)", [id]);
}

module.exports = {
  findAll,
  find,
  create,
  update,
  remove,
};
