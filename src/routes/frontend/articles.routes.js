const express = require("express");
const articlesService = require("../../services/articles.service");

const router = express.Router();

router.get("/", (_req, res, next) => {
  articlesService
    .findAllPublished()
    .then((articles) =>
      res.render("articles/index", { title: "Articles", articles })
    )
    .catch(next);
});

router.get("/:id(\\d+)", (req, res, next) => {
  articlesService
    .findById(req.params.id)
    .then((article) => {
      res.render("articles/details", {
        title: article.title,
        article,
      });
    })
    .catch(next);
});

module.exports = router;
