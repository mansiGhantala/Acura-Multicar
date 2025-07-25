const Wishlist = require("../models/Wishlist-model");

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("items", "name price images");
    const items = wishlist?.items || [];
    res.json({ wishlist: items, count: items.length });
  } catch (err) {
    console.error("Get wishlist error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ msg: "Product ID required" });

  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, items: [productId] });
    } else {
      const index = wishlist.items.findIndex((id) => id.toString() === productId);
      if (index > -1) {
        wishlist.items.splice(index, 1); 
      } else {
        wishlist.items.push(productId); 
      }
      await wishlist.save();
    }

    const populated = await Wishlist.findById(wishlist._id).populate("items", "name price images");
    const items = populated.items || [];
    res.json({ wishlist: items, count: items.length });
  } catch (err) {
    console.error("Add to wishlist error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ msg: "Product ID required" });

  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
      wishlist.items = wishlist.items.filter((id) => id.toString() !== productId);
      await wishlist.save();
      const populated = await Wishlist.findById(wishlist._id).populate("items", "name price images");
      const items = populated.items || [];
      return res.json({ wishlist: items, count: items.length });
    }

    res.json({ wishlist: [], count: 0 });
  } catch (err) {
    console.error("Remove from wishlist error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
