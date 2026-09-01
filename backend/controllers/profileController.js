const User = require("../models/User");

// @desc   Update logged-in user's profile
// @route  PUT /api/profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, dob, gender, address } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (dob) user.dob = dob;
    if (gender !== undefined) user.gender = gender;
    if (address !== undefined) user.address = address;

    if (req.file) {
      user.profilePicture = `/uploads/profiles/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: user.toSafeObject(),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { updateProfile };
