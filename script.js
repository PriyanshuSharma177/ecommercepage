const mainImage = document.getElementById("main-image");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.getElementById("close-lightbox");

mainImage.addEventListener("click", () => {
  lightboxImage.src = mainImage.src;
  lightbox.classList.remove("hidden");
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});


const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const index = thumb.getAttribute("data-image");
    mainImage.src = `images/image-product-${index}.jpg`;

    thumbnails.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");

    currentIndex = index - 1;
  });
});


const imageList = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];
let currentIndex = 0;

function updateMainImage(index) {
  mainImage.src = imageList[index];
  thumbnails.forEach((thumb) => {
    thumb.classList.remove("active");
    if (parseInt(thumb.dataset.image) === index + 1) {
      thumb.classList.add("active");
    }
  });
}

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

prevBtn?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  updateMainImage(currentIndex);
});

nextBtn?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imageList.length;
  updateMainImage(currentIndex);
});


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

const addToCartBtn = document.getElementById("add-to-cart");
const cartContent = document.getElementById("cart-content");
const cartContentDesktop = document.getElementById("cart-content-desktop");

function renderCartHTML() {
  const html = `
    <div class="cart-item">
      <img src="images/image-product-1-thumbnail.jpg" alt="Product" class="cart-thumb" />
      <div>
        <p>Fall Limited Edition Sneakers</p>
        <p>$125.00 x ${quantity} <strong>$${(125 * quantity).toFixed(2)}</strong></p>
      </div>
      <img src="images/icon-delete.svg" alt="Remove" class="remove-item" />
    </div>
  `;
  cartContent.innerHTML = html;
  cartContentDesktop.innerHTML = html;
}

addToCartBtn.addEventListener("click", () => {
  if (quantity > 0) {
    renderCartHTML();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    cartContent.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    cartContentDesktop.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    quantity = 0;
    quantityDisplay.textContent = quantity;
  }
});

const cartIconMobile = document.getElementById("cart-icon-mobile");
const cartIconDesktop = document.getElementById("cart-icon");
const cartDropdown = document.getElementById("cart-dropdown");
const cartDropdownDesktop = document.getElementById("cart-dropdown-desktop");

cartIconMobile?.addEventListener("click", () => {
  cartDropdown.classList.toggle("hidden");
});

cartIconDesktop?.addEventListener("click", () => {
  cartDropdownDesktop.classList.toggle("hidden");
});


const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileNav = document.getElementById("mobile-nav");
const closeNav = document.getElementById("close-nav");

hamburgerBtn?.addEventListener("click", () => {
  mobileNav.classList.remove("hidden");
});

closeNav?.addEventListener("click", () => {
  mobileNav.classList.add("hidden");
});
