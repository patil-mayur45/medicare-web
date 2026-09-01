const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorType: { type: String, required: [true, "Doctor specialty is required"] },
    date: { type: Date, required: [true, "Appointment date is required"] },
    time: { type: String, required: [true, "Appointment time is required"] },
    comments: { type: String, default: "", trim: true },
    reportFile: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

appointmentSchema.index({ patient: 1, date: -1 });

module.exports = mongoose.model("Appointment", appointmentSchema);
