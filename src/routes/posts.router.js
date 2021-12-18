const express = require("express");
const postsService = require("../services/posts.service");

const router = express.Router();

router.get("/", (req, res, next) => {
  const showAll = req.query.all;

  postsService
    .findAll({ publishedOnly: !showAll })
    .then((posts) => res.render("posts/index", { posts, showAll }))
    .catch(next);
});

router.post("/", (req, res, next) => {
  postsService
    .create(req.body)
    .then(() => res.redirect("/posts"))
    .catch(next);
});

router.get("/create", (req, res) => {
  res.render("posts/create");
});

router.get("/:id(\\d+)", (req, res, next) => {
  postsService
    .find(req.params.id)
    .then((post) => {
      res.render("posts/details", {
        title: post.title,
        post,
      });
    })
    .catch(next);
});

router.get("/:id(\\d+)/update", (req, res, next) => {
  postsService
    .find(req.params.id)
    .then((post) => res.render("posts/update", { post }))
    .catch(next);
});

router.post("/:id(\\d+)/update", (req, res, next) => {
  postsService
    .update(req.params.id, req.body)
    .then(() => res.redirect("/posts"))
    .catch(next);
});

router.post("/:id/delete", (req, res, next) => {
  postsService
    .remove(req.params.id)
    .then(() => res.redirect("/posts"))
    .catch(next);
});

module.exports = router;