const multer = require("multer");
const path = require("path");
const fs = require("fs");

const makeStorage = (subfolder) => {
  const dir = path.join(__dirname, "..", "uploads", subfolder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });
};

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

const reportFilter = (req, file, cb) => {
  const allowed = ["image/", "application/pdf"];
  if (allowed.some((t) => file.mimetype.startsWith(t))) cb(null, true);
  else cb(new Error("Only image or PDF files are allowed for reports"), false);
};

const uploadProfilePicture = multer({
  storage: makeStorage("profiles"),
  fileFilter: imageFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
});

const uploadReport = multer({
  storage: makeStorage("reports"),
  fileFilter: reportFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = { uploadProfilePicture, uploadReport };
