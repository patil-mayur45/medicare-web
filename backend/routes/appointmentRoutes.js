const express = require("express");
const { body } = require("express-validator");
const { protect } = require("../middleware/auth");
const { uploadReport } = require("../middleware/upload");
const {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post(
  "/",
  protect,
  uploadReport.single("reportFile"),
  [
    body("doctorType").trim().notEmpty().withMessage("Please select a doctor specialty"),
    body("date").notEmpty().withMessage("Please select a date").isISO8601().withMessage("Invalid date"),
    body("time").trim().notEmpty().withMessage("Please select a time"),
  ],
  createAppointment
);

router.get("/", protect, getMyAppointments);
router.patch("/:id/cancel", protect, cancelAppointment);

module.exports = router;
