fetch("products.json")
  .then((res) => res.json())
  .then((products) => {
    const container = document.getElementById("product-list");

    products.forEach((product) => {
      const card = document.createElement("a");
      card.href = `ecommerce.html?id=${product.id}`;
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>$${product.price.toFixed(2)}</p>
      `;
      container.appendChild(card);
    });
  });

// Show cart count from localStorage
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

updateCartCount();
