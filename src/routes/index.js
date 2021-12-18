const express = require("express");

const postsRouter = require("./posts.router");

const router = express.Router();

router.get("/", (_req, res) => {
  res.render("home");
});

router.get("/about-us", (_req, res) => {
  res.render("about-us");
});

router.use("/posts", postsRouter);

module.exports = router;
