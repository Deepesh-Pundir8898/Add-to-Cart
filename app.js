const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
];

let cart = {};

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    updateCart();
});

function displayProducts() {
    const productList = document.getElementById('product-list');

    Products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <span>${product.name} </span>
            <span> ${product.price}</span>

            <div>
                <button onclick="removeFromCart(${product.id})">-</button>
                <span id="quantity-${product.id}">0</span>
                <button onclick="addToCart(${product.id})">+</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    if (cart[productId]) {
        cart[productId].quantity += 1;
    } else {
        const product = Products.find(p => p.id === productId);
        cart[productId] = { ...product, quantity: 1 };
    }
    updateCart();
}

function removeFromCart(productId) {
    if (cart[productId]) {
        cart[productId].quantity -= 1;
        if (cart[productId].quantity === 0) {
            delete cart[productId];
        }
    }
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    cartContainer.innerHTML = '<h2>Cart</h2>';

    if (Object.keys(cart).length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartContainer.appendChild(emptyCartMessage);
    } else {
        let total = 0;

        Object.values(cart).forEach(item => {
            total += item.price * item.quantity;
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <span>${item.name} - ${item.price} x ${item.quantity}</span>
                <span>Total: ${item.price * item.quantity}</span>
            `;
            cartContainer.appendChild(cartItemDiv);
        });

        const totalDiv = document.createElement('div');
        totalDiv.className = 'cart-item';
        totalDiv.innerHTML = `<strong>Total Price: ${total}</strong>`;
        cartContainer.appendChild(totalDiv);
    }

    Products.forEach(product => {
        const quantitySpan = document.getElementById(`quantity-${product.id}`);
        quantitySpan.textContent = cart[product.id] ? cart[product.id].quantity : 0;
    });
}
