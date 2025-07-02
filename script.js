
const products = {
  1: {
    name: "Fall Limited Edition Sneakers",
    price: 125,
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    thumbnail: "images/image-product-1-thumbnail.jpg",
    mainImages: [
      "images/image-product-1.jpg",
      "images/image-product-2.jpg",
      "images/image-product-3.jpg",
      "images/image-product-4.jpg"
    ]
  },
  2: {
    name: "Summer Street Sneakers",
    price: 110,
    description: "Bold design meets street fashion in these high-performance summer sneakers. Comfort and style combined.",
    thumbnail: "images/image-product-2-thumbnail.jpg",
    mainImages: [
      "images/image-product-2.jpg",
      "images/image-product-1.jpg",
      "images/image-product-3.jpg",
      "images/image-product-4.jpg"
    ]
  },
  3: {
    name: "Urban Night Runners",
    price: 98,
    description: "Perfect for nighttime adventures. Reflective strips and lightweight design.",
    thumbnail: "images/image-product-3-thumbnail.jpg",
    mainImages: [
      "images/image-product-3.jpg",
      "images/image-product-1.jpg",
      "images/image-product-2.jpg",
      "images/image-product-4.jpg"
    ]
  },
  4: {
    name: "Minimalist Canvas Sneakers",
    price: 79,
    description: "Classic and clean. These minimalist canvas shoes go with everything.",
    thumbnail: "images/image-product-4-thumbnail.jpg",
    mainImages: [
      "images/image-product-4.jpg",
      "images/image-product-1.jpg",
      "images/image-product-2.jpg",
      "images/image-product-3.jpg"
    ]
  },
  5: {
    name: "Classic White Trainers",
    price: 120,
    description: "A timeless pair of white trainers made with high-quality material and perfect cushioning.",
    thumbnail: "images/image-product-1-thumbnail.jpg",
    mainImages: [
      "images/image-product-1.jpg",
      "images/image-product-2.jpg",
      "images/image-product-3.jpg",
      "images/image-product-4.jpg"
    ]
  }
};


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id") || "1";
const product = products[productId];


const mainImage = document.getElementById("main-image");
const thumbnailContainer = document.getElementById("thumbnail-container");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.getElementById("close-lightbox");

const title = document.getElementById("product-title");
const price = document.getElementById("product-price");
const originalPrice = document.getElementById("original-price");
const description = document.getElementById("product-description");

let currentIndex = 0;


function loadProduct() {
  title.textContent = product.name;
  price.textContent = `$${product.price.toFixed(2)}`;
  originalPrice.textContent = `$${(product.price * 2).toFixed(2)}`;


  if (product.name === "Fall Limited Edition Sneakers") {
    description.textContent = product.description;
  } else {
    description.textContent = product.name;
  }

  updateMainImage(0);


  thumbnailContainer.innerHTML = "";
  product.mainImages.forEach((src, index) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.className = "thumbnail";
    if (index === 0) thumb.classList.add("active");
    thumb.addEventListener("click", () => {
      currentIndex = index;
      updateMainImage(index);
    });
    thumbnailContainer.appendChild(thumb);
  });
}


function updateMainImage(index) {
  mainImage.src = product.mainImages[index];
  const thumbnails = document.querySelectorAll(".thumbnail");
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


document.getElementById("prev-btn")?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + product.mainImages.length) % product.mainImages.length;
  updateMainImage(currentIndex);
});
document.getElementById("next-btn")?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % product.mainImages.length;
  updateMainImage(currentIndex);
});


let quantity = 0;
const quantityDisplay = document.getElementById("quantity");
document.getElementById("increase").addEventListener("click", () => {
  quantity++;
  quantityDisplay.textContent = quantity;
});
document.getElementById("decrease").addEventListener("click", () => {
  if (quantity > 0) quantity--;
  quantityDisplay.textContent = quantity;
});


let cart = JSON.parse(localStorage.getItem("cart")) || {};

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartContent = document.getElementById("cart-content");
  const cartContentDesktop = document.getElementById("cart-content-desktop");

  const entries = Object.entries(cart);
  if (entries.length === 0) {
    cartContent.innerHTML = cartContentDesktop.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    return;
  }

  let html = "";
  entries.forEach(([id, item]) => {
    const prod = products[id];
    html += `
      <div class="cart-item" data-id="${id}">
        <img src="${prod.thumbnail}" class="cart-thumb" />
        <div>
          <p>${prod.name}</p>
          <p>$${prod.price} x ${item.quantity} <strong>$${(prod.price * item.quantity).toFixed(2)}</strong></p>
        </div>
        <img src="images/icon-delete.svg" class="remove-item" data-id="${id}" />
      </div>
    `;
  });

  cartContent.innerHTML = html;
  cartContentDesktop.innerHTML = html;
}

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

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const id = e.target.dataset.id;
    delete cart[id];
    saveCart();
  }
});


document.getElementById("cart-icon")?.addEventListener("click", () => {
  document.getElementById("cart-dropdown-desktop").classList.toggle("hidden");
});
document.getElementById("cart-icon-mobile")?.addEventListener("click", () => {
  document.getElementById("cart-dropdown").classList.toggle("hidden");
});
document.getElementById("close-cart-desktop")?.addEventListener("click", () => {
  document.getElementById("cart-dropdown-desktop").classList.add("hidden");
});
document.getElementById("close-cart-mobile")?.addEventListener("click", () => {
  document.getElementById("cart-dropdown").classList.add("hidden");
});


document.addEventListener("click", (e) => {
  if (
    !e.target.closest("#cart-dropdown") &&
    !e.target.closest("#cart-dropdown-desktop") &&
    !e.target.closest("#cart-icon") &&
    !e.target.closest("#cart-icon-mobile")
  ) {
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

// Initialize
loadProduct();
renderCart();
