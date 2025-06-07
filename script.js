// Lightbox functionality
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

// Thumbnail switching
const thumbnails = document.querySelectorAll(".thumbnail");
thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const imgIndex = thumb.getAttribute("data-image");
    mainImage.src = `images/image-product-${imgIndex}.jpg`;
  });
});

// Quantity and Add to Cart
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

document.getElementById("add-to-cart").addEventListener("click", () => {
  const cartContent = document.getElementById("cart-content");
  const emptyMsg = document.querySelector(".empty-cart");
  if (quantity > 0) {
    emptyMsg?.remove();
    cartContent.innerHTML = `
      <div class="cart-item">
        <img src="images/image-product-1-thumbnail.jpg" alt="Product" class="cart-thumb" />
        <div>
          <p>Fall Limited Edition Sneakers</p>
          <p>$125.00 x ${quantity} <strong>$${(125 * quantity).toFixed(2)}</strong></p>
        </div>
        <img src="images/icon-delete.svg" alt="Remove" class="remove-item" />
      </div>
    `;
  }
});

// Cart toggle
const cartIcon = document.getElementById("cart-icon");
const cartDropdown = document.getElementById("cart-dropdown");

cartIcon.addEventListener("click", () => {
  cartDropdown.classList.toggle("hidden");
});

// Remove item
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    document.getElementById("cart-content").innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
  }
});
