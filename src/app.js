const path = require("path");
const express = require("express");
const helmet = require("helmet");
const globalRouter = require("./routes");

const app = express();

app.set("views", path.resolve(__dirname, "..", "views"));
app.set("view engine", "pug");

app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);

app.use(express.static(path.resolve(__dirname, "..", "public")));

// Handle 404 errors by rendering the errors/404.pug page
app.use(function (req, res, next) {
  res.status(404);
  res.render("errors/404");
});

if (process.env.NODE_ENV === "development") {
  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500);
    res.json({ status: 500, error: "Internal Server Error" });
  });
}

module.exports = app;
