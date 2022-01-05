const express = require("express");
const asyncHandler = require("express-async-handler");
const httpErrors = require("http-errors");

const postsService = require("../services/posts.service");
const commentsService = require("../services/comments.service");
const validate = require("../middlewares/validate");
const postsValidators = require("../validators/posts");
const commentsValidators = require("../validators/comments");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const showAll = req.query.all;
    const posts = await postsService.findAll({ publishedOnly: !showAll });

    res.render("posts/index", {
      showAll,
      posts,
    });
  })
);

router.post(
  "/",
  validate(postsValidators.create),
  asyncHandler(async (req, res) => {
    await postsService.create(req.body);

    res.redirect("/posts");
  })
);

router.get("/create", (_req, res) => {
  res.render("posts/create");
});

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const post = await postsService.find(req.params.id);
    if (!post) {
      throw new httpErrors.NotFound();
    }

    const comments = await commentsService.findByPostId(post.id);

    res.render("posts/details", {
      title: post.title,
      post,
      comments,
    });
  })
);

router.get(
  "/:id(\\d+)/update",
  asyncHandler(async (req, res) => {
    const post = await postsService.find(req.params.id);
    if (!post) {
      throw new httpErrors.NotFound();
    }

    res.render("posts/update", {
      post,
    });
  })
);

router.post(
  "/:id(\\d+)/update",
  validate(postsValidators.update),
  asyncHandler(async (req, res) => {
    if (!req.validation.isValid) {
      const post = await postsService.find(req.params.id);

      return res.status(400).render("posts/update", {
        validationErrors: req.validation.errors,
        post,
      });
    }

    await postsService.update(req.params.id, req.body);
    res.redirect("/posts");
  })
);

router.post(
  "/:id(\\d+)/add-comment",
  validate(commentsValidators.create),
  asyncHandler(async (req, res) => {
    const post = await postsService.find(req.params.id);
    if (!post) throw new httpErrors.NotFound();

    if (!req.validation.isValid) {
      return res.status(400).render("posts/details", {
        validationErrors: req.validation.errors,
        title: post.title,
        post,
      });
    }

    await commentsService.addToPost(req.params.id, req.body);
    res.redirect(`/posts/${post.id}`);
  })
);

router.post(
  "/:id(\\d+)/comments/:commentId(\\d+)/delete",
  asyncHandler(async (req, res) => {
    const post = await postsService.find(req.params.id);
    if (!post) throw new httpErrors.NotFound();

    const comment = commentsService.find(req.params.commentId);
    if (!comment) throw new httpErrors.NotFound();

    await commentsService.remove(req.params.commentId);

    res.redirect(`/posts/${post.id}`);
  })
);

router.post(
  "/:id(\\d+)/delete",
  asyncHandler(async (req, res) => {
    await postsService.remove(req.params.id);
    res.redirect("/posts");
  })
);

module.exports = router;
