async function updateCart(productId, quantity) {
    let response = await fetch("/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity })
    });

    let result = await response.json();
    if (result.success) {
        location.reload();
    } else {
        alert(result.message);
    }
}

async function removeFromCart(productId) {
    let response = await fetch(`/cart/remove/${productId}`, { method: "DELETE" });
    let result = await response.json();
    if (result.success) {
        location.reload();
    }
}

async function clearCart() {
    let response = await fetch("/cart/clear", { method: "DELETE" });
    let result = await response.json();
    if (result.success) {
        location.reload();
    }
}
