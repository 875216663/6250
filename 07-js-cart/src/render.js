import state from "./state";

// 选择器
const productsEl = document.querySelector(".products");
const cartEl = document.querySelector(".cartlist");

// 渲染产品列表
function renderProducts() {
    const productsHtml = state.products.map((product, index) => `
        <li class="product">
            <h3 class="product-name">${product.name}</h3>
            <img class="product-img" src="${product.img}" alt="${product.name}">
            <p class="product-price">Price: $${product.price}</p>
            <button class="add-cart" data-index="${index}">Add to cart</button>
        </li>
    `).join("");

    productsEl.innerHTML = `
        <h2>Cats Listing</h2>
        <ul class="listings">${productsHtml}</ul>
        ${getViewCartBtnHtml()}
    `;

    // 绑定添加到购物车按钮事件
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// 渲染购物车视图
function renderCart() {
    if (!state.viewCart || !state.getCartCount()) {
        cartEl.innerHTML = '';
        return;
    }

    cartEl.innerHTML = `
        <h2>Shopping Cart</h2>
        <ul class="carts">${getCartHtml()}</ul>
        <p>Total Price: $${state.getTotalPrice()}</p>
        <button class="checkout">Checkout</button>
    `;
}

// 添加到购物车的事件处理函数
function addToCart(event) {
    const index = event.target.dataset.index;
    // 根据index增加产品数量的逻辑
}

// 获取查看购物车按钮的HTML
function getViewCartBtnHtml() {
    const totalCount = state.getCartCount();
    return `<button class="view-cart">${state.viewCart ? "Hide Cart" : `View Cart (${totalCount})`}</button>`;
}

// 获取购物车HTML
function getCartHtml() {
    return state.products.filter(product => product.count > 0)
        .map((product, index) => `
            <li class="cart-item">
                <h4>${product.name}</h4>
                <img src="${product.smallImg}" alt="${product.name}">
                <div>Quantity: ${product.count}</div>
                <p>Price: $${state.getPricePerProduct(index)}</p>
            </li>
        `).join("");
}

// 主渲染函数
function render() {
    renderProducts();
    renderCart();
}

// 初始化渲染和事件监听
document.addEventListener('DOMContentLoaded', () => {
    render(); // 初始渲染
    document.querySelector('.view-cart').addEventListener('click', () => {
        state.viewCart = !state.viewCart;
        render();
    });
});

export default render;
