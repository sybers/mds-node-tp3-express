const db = require("../db");

async function findByPostId(postId) {
  return db.all(
    "SELECT * FROM comments WHERE (postId = ?) ORDER BY createdAt DESC",
    [postId]
  );
}

async function addToPost(postId, { content }) {
  return db.run(
    'INSERT INTO comments (postId, content, createdAt) VALUES (?, ?, datetime("now"))',
    [postId, content]
  );
}

async function remove(id) {
  return db.run("DELETE FROM comments WHERE (id = ?)", [id]);
}

module.exports = {
  findByPostId,
  addToPost,
  remove,
};
