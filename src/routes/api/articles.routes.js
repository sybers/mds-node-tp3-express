const express = require("express");
const articlesService = require("../../services/articles.service");

const router = express.Router();

router.get("/", (req, res, next) => {
  articlesService
    .findAll()
    .then((articles) => res.json(articles))
    .catch(next);
});

router.post("/", (req, res, next) => {
  articlesService
    .create(req.body)
    .then(() => {
      res.status(204);
      res.end();
    })
    .catch(next);
});

router.get("/:id(\\d+)", (req, res, next) => {
  const articleId = req.params.id;

  articlesService
    .findById(articleId)
    .then((article) => res.json(article))
    .catch(next);
});

module.exports = router;
