

const themeBtn = document.querySelector("#theme-toggle")
const productGrid = document.getElementById("product-grid")
const searchInput = document.getElementById('search');
const filterButtons = document.querySelectorAll(".filter-btn");

const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cartDrawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("overlay");

const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let currentCategory = "All";

let cart =  [];

// Theme changes
// save one theme
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.innerHTML =
        '<i class = "fa-solid fa-sun"></i>';
}

// onclick changes
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light"); // toggle removes if the class exists and returns false and if not exists it add the class and returns true

    // checking if class exists and stored in variable
    const isLight = document.body.classList.contains("light");
    // setting theme in local storage
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeBtn.innerHTML = isLight
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

});

// ======================================

// ======================================
// cart-drawer
// ======================================
cartBtn.addEventListener("click", () => {
    cartDrawer.classList.add("active");
    overlay.classList.add("active");
})

closeCart.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);
function closeDrawer() {
    cartDrawer.classList.remove("active");
    overlay.classList.remove("active");
};
// ======================================
// ADDING PRODUCTS
// ======================================

function renderProducts(productList) {
    productGrid.innerHTML = "";

    productList.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <div class="price">
                ₹${product.price.toLocaleString()}
            </div>
            <button
                class="add-cart"
                onclick="addToCart(${product.id})">
                Add To Cart
            </button>
        </div>
        `;
        productGrid.appendChild(card)
    });
};
renderProducts(productsItems);

// ==========================
// SEARCH
// ==========================
searchInput.addEventListener('input', filterProducts)
// ==========================
// category filterProducts
// ==========================

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );
        button.classList.add("active");
        currentCategory = button.dataset.category;
        filterProducts();
    })
});

function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    const filtered = productsItems.filter(product => {

        const matchCategory = currentCategory === "All" || product.category === currentCategory;
        const matchSearch = product.name.toLowerCase().includes(searchText);
        return matchCategory && matchSearch;

    });
    renderProducts(filtered);
};

// ======================================
// Add to cart
// ======================================

function addToCart(id) {
    const product =
        productsItems.find(item => item.id === id);
    const existing =
        cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    saveCart();
    updateCartUI();


};
// ======================================
// remove cart item
// ======================================

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}
// ======================================
// save cart
// ======================================

function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
};

// ======================================
// UPDATE CART UI
// ======================================
function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let count = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <img src="${item.image}" alt="${item.name}'>
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>
                ₹${item.price.toLocaleString()}
                x ${item.quantity}
            </p>
        </div>
        <button
            class="remove-btn"
            onclick="removeFromCart(${item.id})">
            Remove
        </button>   
        `;
        cartItemsContainer.appendChild(div);

    });
    cartCount.textContent = count;
    cartTotal.textContent = total.toLocaleString();
}
updateCartUI();




// ======================================
// CHECKOUT
function checkout() {

    alert("Your cannot be placed it is demo site.")
    cartItemsContainer.innerHTML = "";
    cartTotal.textContent = "0";
    cartCount.textContent = "0";

}

// ======================================
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
    reveals.forEach(item => {
        const top = item.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            item.classList.add("active")
        }
    });
});


// ======================================
// MENU FOR PHONE
// Add this to your srcipt.js (or keep as a separate <script> include)
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');

    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}





function contactform(){
    alert("Thanks for contacting. We will get in touch soon!")
}