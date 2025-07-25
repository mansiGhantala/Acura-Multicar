const express = require("express");
const {
  createOrder,
  getMyOrders,
  getSingleOrder,
} = require("../controllers/order-controller");

const {authMiddleware } = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/mine", authMiddleware, getMyOrders); 
router.get("/my", authMiddleware, getMyOrders);   
router.get("/:orderId", authMiddleware, getSingleOrder);


module.exports = router;
