const path = require("path");
const multer = require("multer");

const { projectRoot } = require("../utils");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(projectRoot, "public", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
