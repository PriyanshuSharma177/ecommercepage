// Sample product data (can later be fetched from JSON/API)
const products = {
  1: {
    name: "Fall Limited Edition Sneakers",
    price: 125,
    thumbnail: "images/image-product-1-thumbnail.jpg",
    mainImages: [
      "images/image-product-1.jpg",
      "images/image-product-2.jpg",
      "images/image-product-3.jpg",
      "images/image-product-4.jpg"
    ]
  },
  2: {
    name: "Sporty Blue Sneakers",
    price: 145,
    thumbnail: "images/image-product-2-thumbnail.jpg",
    mainImages: [
      "images/product2-1.jpg",
      "images/product2-2.jpg",
      "images/product2-3.jpg",
      "images/product2-4.jpg"
    ]
  },
  // Add more products here as needed
};

// 1. Load product from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id") || "1";
const product = products[productId];

// Update main image + thumbnails
const mainImage = document.getElementById("main-image");
const thumbnails = document.querySelectorAll(".thumbnail");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.getElementById("close-lightbox");

let currentIndex = 0;

function updateMainImage(index) {
  mainImage.src = product.mainImages[index];
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

mainImage.addEventListener("click", () => {
  lightboxImage.src = mainImage.src;
  lightbox.classList.remove("hidden");
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

// Setup thumbnails
thumbnails.forEach((thumb, index) => {
  thumb.src = product.mainImages[index];
  thumb.addEventListener("click", () => {
    currentIndex = index;
    updateMainImage(index);
  });
});

updateMainImage(0);

// Carousel
document.getElementById("prev-btn")?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + product.mainImages.length) % product.mainImages.length;
  updateMainImage(currentIndex);
});

document.getElementById("next-btn")?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % product.mainImages.length;
  updateMainImage(currentIndex);
});

// Quantity Management
let quantity = 0;
const quantityDisplay = document.getElementById("quantity");

document.getElementById("increase").addEventListener("click", () => {
  quantity++;
  quantityDisplay.textContent = quantity;
});

document.getElementById("decrease").addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    quantityDisplay.textContent = quantity;
  }
});

// Cart Storage
let cart = JSON.parse(localStorage.getItem("cart")) || {};

function renderCart() {
  const cartContent = document.getElementById("cart-content");
  const cartContentDesktop = document.getElementById("cart-content-desktop");

  const items = Object.entries(cart);

  if (items.length === 0) {
    cartContent.innerHTML = cartContentDesktop.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    return;
  }

  let html = "";
  items.forEach(([id, item]) => {
    html += `
      <div class="cart-item" data-id="${id}">
        <img src="${products[id].thumbnail}" alt="Product" class="cart-thumb" />
        <div>
          <p>${products[id].name}</p>
          <p>$${products[id].price} x ${item.quantity} <strong>$${(products[id].price * item.quantity).toFixed(2)}</strong></p>
        </div>
        <img src="images/icon-delete.svg" alt="Remove" class="remove-item" data-id="${id}" />
      </div>
    `;
  });

  cartContent.innerHTML = html;
  cartContentDesktop.innerHTML = html;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Add to cart
document.getElementById("add-to-cart").addEventListener("click", () => {
  if (quantity <= 0) return;

  if (cart[productId]) {
    cart[productId].quantity += quantity;
  } else {
    cart[productId] = { quantity };
  }

  quantity = 0;
  quantityDisplay.textContent = "0";
  saveCart();
});

// Remove from cart
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const id = e.target.dataset.id;
    delete cart[id];
    saveCart();
  }
});

// Cart toggle
document.getElementById("cart-icon-mobile")?.addEventListener("click", () => {
  document.getElementById("cart-dropdown").classList.toggle("hidden");
});

document.getElementById("cart-icon")?.addEventListener("click", () => {
  document.getElementById("cart-dropdown-desktop").classList.toggle("hidden");
});

document.getElementById("close-cart-mobile")?.addEventListener("click", () => {
  document.getElementById("cart-dropdown").classList.add("hidden");
});

document.getElementById("close-cart-desktop")?.addEventListener("click", () => {
  document.getElementById("cart-dropdown-desktop").classList.add("hidden");
});

// Close cart if clicked outside
document.addEventListener("click", (e) => {
  const isCartClick =
    e.target.closest("#cart-dropdown") ||
    e.target.closest("#cart-dropdown-desktop") ||
    e.target.closest("#cart-icon-mobile") ||
    e.target.closest("#cart-icon");

  if (!isCartClick) {
    document.getElementById("cart-dropdown")?.classList.add("hidden");
    document.getElementById("cart-dropdown-desktop")?.classList.add("hidden");
  }
});

// Hamburger Menu
document.getElementById("hamburger-btn")?.addEventListener("click", () => {
  document.getElementById("mobile-nav").classList.remove("hidden");
});

document.getElementById("close-nav")?.addEventListener("click", () => {
  document.getElementById("mobile-nav").classList.add("hidden");
});

// Initialize cart on load
renderCart();

