const path = require("path");
const express = require("express");
const frontendRouter = require("./routes/frontend");
const apiRouter = require("./routes/api");

const PORT = parseInt(process.env.PORT ?? "8080", 10);

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());

app.use("/", frontendRouter);
app.use("/api", apiRouter);

app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use((err, _req, res, _next) => {
  res.status(500);
  res.json({ status: 500, error: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
