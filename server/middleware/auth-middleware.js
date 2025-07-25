const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const Wishlist = require("../models/Wishlist-model");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized: User not found" });
    }

    req.user = user;

    const wishlist = await Wishlist.findOne({ user: user._id }).populate("items", "name price photos");
    req.wishlist = wishlist || { user: user._id, items: [] };

    next();
  } catch (err) {
    console.error("🔒 Auth Middleware Error:", err.message);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

const isAdminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ msg: "Access denied: Admins only" });
  }
  next();
};

module.exports = {
  authMiddleware,
  isAdminMiddleware,
};
