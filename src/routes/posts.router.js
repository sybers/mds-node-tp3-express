const express = require("express");
const httpErrors = require("http-errors");

const postsService = require("../services/posts.service");
const validate = require("../middlewares/validate");
const postsValidators = require("../validators/posts");

const router = express.Router();

router.get("/", (req, res, next) => {
  const showAll = req.query.all;

  postsService
    .findAll({ publishedOnly: !showAll })
    .then((posts) => res.render("posts/index", { posts, showAll }))
    .catch(next);
});

router.post("/", validate(postsValidators.create), (req, res, next) => {
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
      if (!post) throw new httpErrors.NotFound();

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
    .then((post) => {
      if (!post) throw new httpErrors.NotFound();

      res.render("posts/update", { post });
    })
    .catch(next);
});

router.post(
  "/:id(\\d+)/update",
  validate(postsValidators.update),
  (req, res, next) => {
    if (!req.validation.isValid) {
      res.status(400);
      return postsService
        .find(req.params.id)
        .then((post) =>
          res.render("posts/update", {
            validationErrors: req.validation.errors,
            post,
          })
        )
        .catch(next);
    }

    postsService
      .update(req.params.id, req.body)
      .then(() => res.redirect("/posts"))
      .catch(next);
  }
);

router.post("/:id/delete", (req, res, next) => {
  postsService
    .remove(req.params.id)
    .then(() => res.redirect("/posts"))
    .catch(next);
});

module.exports = router;
