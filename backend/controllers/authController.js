const { validationResult } = require("express-validator");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc   Register new patient
// @route  POST /api/auth/signup
const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }

    const { name, email, phone, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400);
      throw new Error("An account with this email already exists");
    }

    const user = await User.create({ name, email, phone, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: user.toSafeObject(),
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Login patient
// @route  POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: user.toSafeObject(),
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get current logged-in user
// @route  GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, user: req.user.toSafeObject() });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login, getMe };
