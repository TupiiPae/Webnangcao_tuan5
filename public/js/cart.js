// public/js/cart.js
function updateCart(productId, quantity) {
    fetch("/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity })
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
        location.reload();
        updateCartCount();
    })
    .catch(error => console.error("Lỗi cập nhật giỏ hàng:", error));
}

function removeFromCart(productId) {
    fetch("/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
        location.reload();
        updateCartCount();
    })
    .catch(error => console.error("Lỗi xóa sản phẩm:", error));
}

function clearCart() {
    fetch("/cart/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
        location.reload();
        updateCartCount();
    })
    .catch(error => console.error("Lỗi xóa giỏ hàng:", error));
}



// Gọi khi trang tải
document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
});