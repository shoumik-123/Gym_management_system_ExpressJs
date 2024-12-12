const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};


exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    
    const validRoles = ['admin', 'trainer', 'trainee'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role provided" });
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ success: true, message: "User registered successfully", data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: "Error registering user", error: err.message });
  }
};




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token 
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: err.message
    });
  }
};
