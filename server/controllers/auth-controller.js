const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m", 
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });
};

const getAllUsers = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: "Access denied: Admins only" });
    }
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Get All Users Error:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        user: { _id: user._id, name, email, isAdmin: user.isAdmin },
        token: accessToken,
      });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        user: { _id: user._id, name: user.name, email, isAdmin: user.isAdmin },
        token: accessToken,
      });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ msg: "No refresh token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(decoded.id);

    res.status(200).json({ token: accessToken });
  } catch (err) {
    console.error("Refresh Error:", err.message);
    return res.status(403).json({ msg: "Invalid refresh token" });
  }
};

const getUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
};

const logoutUser = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ msg: "Logged out" });
};

const updateUserRole = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: "Access denied: Admins only" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ msg: "You cannot change your own role." });
    }

    user.isAdmin = !user.isAdmin;
    await user.save();
    res.status(200).json({ msg: "User role updated", isAdmin: user.isAdmin });
  } catch (error) {
    console.error("Update Role Error:", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  refreshToken,
  getAllUsers,
  updateUserRole,
};
