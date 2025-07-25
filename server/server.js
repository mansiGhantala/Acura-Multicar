const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/auth-router"));
app.use("/api/products",require("./routes/product-router")) ;
app.use("/api/form",require("./routes/contact-router"));
app.use("/api/admin",require("./routes/admin-router"));
app.use("/api/cart", require("./routes/cart-router"));
app.use("/api/orders", require("./routes/order-router"));
app.use("/api/wishlist", require("./routes/wishlist-router"));

app.get("/", (req, res) => res.send("🚀 E-commerce API is running!"));

// app.all("/*", (req, res) => res.status(404).json({ msg: "❌ API Route Not Found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
