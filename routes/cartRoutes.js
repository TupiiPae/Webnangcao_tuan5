const express = require("express");
const { getCart, addToCart, removeFromCart, clearCart, updateCart } = require("../controllers/cartController");

const router = express.Router();

// Lấy giỏ hàng
router.get("/", getCart);

// Thêm sản phẩm vào giỏ hàng
router.post("/add", addToCart);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.post("/update", updateCart);

// Xóa một sản phẩm khỏi giỏ hàng
router.delete("/remove/:productId", removeFromCart);

// Xóa toàn bộ giỏ hàng
router.delete("/", clearCart);

// Lấy số lượng sản phẩm trong giỏ hàng
router.get("/count", (req, res) => {
    const cart = req.session.cart || [];
    res.json({ count: cart.reduce((sum, item) => sum + item.quantity, 0) });
});

module.exports = router;
