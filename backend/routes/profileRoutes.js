const express = require("express");
const { protect } = require("../middleware/auth");
const { uploadProfilePicture } = require("../middleware/upload");
const { updateProfile } = require("../controllers/profileController");

const router = express.Router();

router.put("/", protect, uploadProfilePicture.single("profilePicture"), updateProfile);

module.exports = router;
