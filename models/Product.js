const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Đường dẫn ảnh sản phẩm
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 }, // Số lượng trong kho
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
