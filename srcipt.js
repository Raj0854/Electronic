// Theme changes
const themeBtn = document.querySelector("#theme-toggle")
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

// ======================================
const reveals =document.querySelectorAll(".reveal");
window.addEventListener("scroll",()=>{
    reveals.forEach(item=>{
        const top = item.getBoundingClientRect().top;
        if(top< window.innerHeight - 100){
            item.classList.add("active")
        }
    });
});
// ======================================
// ======================================
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cartDrawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("overlay");

const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
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
const productGrid = document.getElementById("product-grid")

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
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', filterProducts)
// ==========================
// category filterProducts
// ==========================
const filterButtons = document.querySelectorAll(".filter-btn");

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
}
