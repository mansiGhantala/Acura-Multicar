const Product = require("../models/product-model");
const path = require("path");
const fs = require("fs");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch products", error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: " Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch product", error: err.message });
  }
};

const adminGetAllProducts = getAllProducts;

const adminCreateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ msg: " Name, price, and category are required" });
    }

    const photos = req.files?.map(file => `/uploads/${file.filename}`) || [];

    if (photos.length !== 2) {
      return res.status(400).json({ msg: " Exactly 2 images are required" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images: photos,
    });

    res.status(201).json({ msg: " Product created", product });
  } catch (err) {
    res.status(500).json({ msg: " Failed to create product", error: err.message });
  }
};

const adminUpdateProduct = async (req, res) => {
  try {
    const { name, description, price, category, existing } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: " Product not found" });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;

    const oldImages = product.images || [];
    let newImages = [];

    if (existing) {
      const existingArray = Array.isArray(existing) ? existing : [existing];
      newImages.push(...existingArray);
    }

    if (req.files && req.files.length > 0) {
      const uploadedPhotos = req.files.map(file => `/uploads/${file.filename}`);
      newImages.push(...uploadedPhotos);
    }

    if (newImages.length !== 2) {
      return res.status(400).json({ msg: " Exactly 2 images are required after update" });
    }

    const removedImages = oldImages.filter(img => !newImages.includes(img));
    for (const imgPath of removedImages) {
      const filePath = path.join(__dirname, "../..", imgPath);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("⚠️ Failed to delete:", imgPath);
      });
    }

    product.images = newImages;
    await product.save();

    res.json({ msg: " Product updated and cleaned up", product });

  } catch (err) {
    console.error(" Update failed:", err);
    res.status(500).json({ msg: " Failed to update product", error: err.message });
  }
};

const adminDeleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: " Product not found" });
    }

    if (deleted.images && deleted.images.length > 0) {
      for (const imgPath of deleted.images) {
        const fullPath = path.join(__dirname, "../..", imgPath);
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.warn("⚠️ Failed to delete image:", imgPath);
          }
        });
      }
    }

    res.json({ msg: " Product deleted and images cleaned up" });
  } catch (err) {
    res.status(500).json({ msg: " Failed to delete product", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  adminGetAllProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
};
