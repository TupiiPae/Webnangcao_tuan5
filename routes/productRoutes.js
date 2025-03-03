const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
} = require("../controllers/productController");

const router = express.Router();

// API Routes
router.get("/", getProducts); // GET /api/products - Lấy danh sách sản phẩm (JSON)
router.get("/:id", getProductById); // GET /api/products/:id - Lấy sản phẩm theo ID (JSON)
router.post("/", createProduct); // POST /api/products - Tạo sản phẩm mới
router.put("/:id", updateProduct); // PUT /api/products/:id - Cập nhật sản phẩm
router.delete("/:id", deleteProduct); // DELETE /api/products/:id - Xóa sản phẩm

// Route render EJS (nếu cần, nhưng hiện tại đã xử lý trong server.js)
// router.get("/view/:id", getProductDetail); // Có thể giữ nếu cần API render EJS riêng

module.exports = router;