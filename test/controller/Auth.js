const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../model/Users");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ us_email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.us_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "your-secret-key");
    res.status(200).json({ user, token, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { login, logout };
