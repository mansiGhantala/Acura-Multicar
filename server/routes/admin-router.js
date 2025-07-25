const express = require("express");
const router = express.Router();

const { authMiddleware, isAdminMiddleware } = require("../middleware/auth-middleware");
const upload = require("../middleware/multer");

const { deleteOrder, getAllOrders, updateOrderStatus } = require("../controllers/order-controller");
const { getAdminCounts } = require("../controllers/admin-controller");
const { getAllContacts, deleteContact, markMessageAsRead } = require("../controllers/contact-controller");
const { getAllUsers, updateUserRole } = require("../controllers/auth-controller");
const { adminGetAllProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct, getProductById } = require("../controllers/product-controller");

router.get("/counts", authMiddleware, isAdminMiddleware, getAdminCounts);

router.get("/messages", authMiddleware, isAdminMiddleware, getAllContacts);
router.delete("/messages/:id", authMiddleware, isAdminMiddleware, deleteContact);
router.patch("/messages/:id/read", authMiddleware, isAdminMiddleware, markMessageAsRead);

router.get("/users", authMiddleware, isAdminMiddleware, getAllUsers);
router.put("/users/:id/role", authMiddleware, isAdminMiddleware, updateUserRole);

router.get("/products", authMiddleware, isAdminMiddleware, adminGetAllProducts);
router.get("/products/:id", authMiddleware, isAdminMiddleware, getProductById);
router.post("/products", authMiddleware, isAdminMiddleware, upload.array("images", 2), adminCreateProduct);
router.put("/products/:id", authMiddleware, isAdminMiddleware, upload.array("images", 2), adminUpdateProduct);
router.delete("/products/:id", authMiddleware, isAdminMiddleware, adminDeleteProduct);

router.get("/orders", authMiddleware, isAdminMiddleware, getAllOrders);
router.patch("/orders/:id", authMiddleware, isAdminMiddleware, updateOrderStatus);
router.delete("/orders/:orderId", authMiddleware, isAdminMiddleware, deleteOrder);

module.exports = router;
