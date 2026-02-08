let cart_count = 0;

function add_to_cart() {
    cart_count++;
    document.getElementById("cart_badge").textContent = cart_count;

    const badge = document.getElementById("cart_badge");
    badge.style.transform = 'scale(1.5)';
    setTimeout(() => {
        badge.style.transform = 'scale(1)';
    }, 200);
}