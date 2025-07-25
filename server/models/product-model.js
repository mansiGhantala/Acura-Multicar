const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be a positive number"],
    },
    images: {
      type: [String],
      required: [true, "Exactly 2 images are required"],
      validate: {
        validator: function (arr) {
          return arr.length === 2;
        },
        message: "Exactly 2 images must be uploaded",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
