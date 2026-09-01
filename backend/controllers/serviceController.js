const Service = require("../models/Service");

// @desc   Get all hospital services
// @route  GET /api/services
const getServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, count: services.length, services });
  } catch (err) {
    next(err);
  }
};

module.exports = { getServices };
