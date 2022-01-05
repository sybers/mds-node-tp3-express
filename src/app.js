const path = require("path");
const express = require("express");
const helmet = require("helmet");
const httpErrors = require("http-errors");
const appRoutes = require("./routes");

function truncate(str, n) {
  if (!str.length > n) {
    return str;
  }
  return `${str.substr(0, n - 1)}...`;
}

const app = express();

app.set("views", path.resolve(__dirname, "..", "views"));
app.set("view engine", "pug");

app.use(helmet());

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.truncate = truncate;
  next();
});

app.use("/", appRoutes);

app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use("*", (_req, _res, next) => next(new httpErrors.NotFound()));

app.use((err, _req, res, next) => {
  if (!httpErrors.isHttpError(err)) next(err);

  res.status(err.statusCode);
  res.render(`errors/${err.statusCode}`);
});

module.exports = app;
