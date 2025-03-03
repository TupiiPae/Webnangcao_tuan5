const express = require("express");
const router = express.Router();

// Lấy giỏ hàng từ session
const getCart = (req, res) => {
    const cart = req.session.cart || [];
    res.render("cart", { cart });
};

// Thêm sản phẩm vào giỏ hàng
const addToCart = (req, res) => {
    const { productId, name, price, quantity } = req.body;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const existingProduct = req.session.cart.find((item) => item.productId === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        req.session.cart.push({ productId, name, price, quantity });
    }

    res.json({ message: "Sản phẩm đã thêm vào giỏ hàng", cart: req.session.cart });
};

const updateCart = (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!req.session.cart) {
      req.session.cart = [];
  }

  let cart = req.session.cart;
  let productIndex = cart.findIndex(item => item.productId === productId);

  if (productIndex !== -1) {
      if (quantity > 0) {
          cart[productIndex].quantity = quantity;
      } else {
          cart.splice(productIndex, 1); // Xóa sản phẩm nếu số lượng <= 0
      }
  }

  req.session.cart = cart;
  res.json({ message: "Giỏ hàng đã được cập nhật!", cart });
};

// Xóa sản phẩm khỏi giỏ hàng (SỬA Ở ĐÂY)
const removeFromCart = (req, res) => {
    const { productId } = req.params; // Lấy productId từ URL thay vì body

    if (!req.session.cart) {
        return res.status(400).json({ message: "Giỏ hàng trống" });
    }

    req.session.cart = req.session.cart.filter((item) => item.productId !== productId);

    res.json({ message: "Đã xóa sản phẩm khỏi giỏ hàng", cart: req.session.cart });
};

// Xóa toàn bộ giỏ hàng
const clearCart = (req, res) => {
    req.session.cart = [];
    res.json({ message: "Giỏ hàng đã được làm trống" });
};

module.exports = { getCart, addToCart, updateCart, removeFromCart, clearCart };
