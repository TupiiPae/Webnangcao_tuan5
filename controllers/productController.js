const Product = require("../models/Product");

// Lấy danh sách sản phẩm (API)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm" });
  }
};

// Lấy chi tiết sản phẩm (VIEW EJS)
const getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Không tìm thấy sản phẩm");
    }
    res.render("productDetail", { product });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi server");
  }
};

// Lấy sản phẩm theo ID (API JSON)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm" });
  }
};

// Thêm sản phẩm mới (API)
const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, stock } = req.body;

    if (!name || !price || !description || !image || !category || stock === undefined) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    const newProduct = new Product({ name, price, description, image, category, stock });
    await newProduct.save();

    res.status(201).json({ message: "Sản phẩm đã được tạo", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server: " + error.message });
  }
};

// Cập nhật sản phẩm (API)
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.json({ message: "Cập nhật thành công", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm" });
  }
};

// Xóa sản phẩm (API)
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
};