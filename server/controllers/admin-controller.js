const Contact = require("../models/contact-model");
const Product = require("../models/product-model");
const Order = require("../models/order-model");
const User = require("../models/user-model");

const getAdminCounts = async (req, res) => {
  try {
    const [products,orders ,contacts, users] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Contact.countDocuments(),
      User.countDocuments()
    ]);

    res.json({ products, orders,contacts, users });
  } catch (error) {
    console.error("Admin Counts Error:", error);
    res.status(500).json({ message: "Server error fetching counts" });
  }
};

module.exports = { getAdminCounts };
