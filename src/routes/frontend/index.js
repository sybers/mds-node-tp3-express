const express = require("express");

const articlesRouter = require("./articles.routes");

const router = express.Router();

router.get("/", (_req, res) => {
  res.render("home", { title: "Home" });
});

router.use("/articles", articlesRouter);

module.exports = router;
