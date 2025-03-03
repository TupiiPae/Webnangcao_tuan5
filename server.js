const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const Product = require("./models/Product");

const app = express();

// Kết nối MongoDB
connectDB();

// Cấu hình session
app.use(
  session({
    secret: "techshop-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // Lưu session trong 24h
  })
);

// Middleware xử lý request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Cấu hình view engine EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Cấu hình static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes); // Chỉ dùng cho API

const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

// Trang chủ render EJS
app.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products", { products });
  } catch (error) {
    console.error("Lỗi tải sản phẩm:", error);
    res.status(500).send("Lỗi tải sản phẩm: " + error.message);
  }
});

// Trang chi tiết sản phẩm (EJS)
app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Không tìm thấy sản phẩm");
    }
    res.render("productDetail", { product });
  } catch (error) {
    console.error("Lỗi tải chi tiết sản phẩm:", error);
    res.status(500).send("Lỗi server: " + error.message);
  }
});

// Trang giỏ hàng
app.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  res.render("cart", { cart });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});