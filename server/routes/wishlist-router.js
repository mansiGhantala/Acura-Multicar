const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth-middleware");

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlist-controller");

router.get("/", authMiddleware, getWishlist);

router.post("/", authMiddleware, addToWishlist);

router.delete("/", authMiddleware, removeFromWishlist);

module.exports = router;
