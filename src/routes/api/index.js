const express = require("express");

const articlesRouter = require("./articles.routes");

const router = express.Router();

router.use("/articles", articlesRouter);

module.exports = router;
