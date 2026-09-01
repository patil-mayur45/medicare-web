const { validationResult } = require("express-validator");
const Appointment = require("../models/Appointment");

// @desc   Book a new appointment
// @route  POST /api/appointments
const createAppointment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }

    const { doctorType, date, time, comments } = req.body;

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctorType,
      date,
      time,
      comments,
      reportFile: req.file ? `/uploads/reports/${req.file.filename}` : "",
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get all appointments for logged-in user (optionally filter by year/status)
// @route  GET /api/appointments
const getMyAppointments = async (req, res, next) => {
  try {
    const { year, status } = req.query;
    const filter = { patient: req.user._id };

    if (year) {
      const start = new Date(`${year}-01-01T00:00:00.000Z`);
      const end = new Date(`${year}-12-31T23:59:59.999Z`);
      filter.date = { $gte: start, $lte: end };
    }
    if (status) filter.status = status;

    const appointments = await Appointment.find(filter).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Cancel an appointment
// @route  PATCH /api/appointments/:id/cancel
const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.user._id,
    });

    if (!appointment) {
      res.status(404);
      throw new Error("Appointment not found");
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment cancelled",
      appointment,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createAppointment, getMyAppointments, cancelAppointment };
