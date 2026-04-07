let cart = [];
let allDesserts = [];

async function getDesserts() {
  try {
    const response = await fetch("./data.json");
    allDesserts = await response.json();
    displayDesserts(allDesserts);
  } catch (error) {
    console.error("Error fetching dessert data:", error);
  }
}

function displayDesserts(desserts) {
  const productGrid = document.getElementById("product-grid");

  productGrid.innerHTML = "";

  desserts.forEach((dessert) => {
    const cardHTML = ` <div class="product-card">
      <div class="image-container">
        <img src="${dessert.image.desktop}" alt="${dessert.name}" class="product-image" />

      
      <div class="button-container">
        <button class="add-to-cart-btn" data-name="${dessert.name}" data-price="${dessert.price}">
          <img src="./assets/images/icon-add-to-cart.svg" alt="Add to Cart">Add to Cart
        </button>

<div class="quantity-selector" style="display: none;">
          <button class="decrease-btn"><img src="./assets/images/icon-decrement-quantity.svg" alt="Decrease" /></button>
          <span class="quantity">1</span>
          <button class="increase-btn"><img src="./assets/images/icon-increment-quantity.svg" alt="Increase" /></button>
        </div>
      </div>
      </div>
      <div class="product-info">
        <p class="category">${dessert.category}</p>
        <h3 class="name">${dessert.name}</h3>
        <p class="description">${dessert.description}</p>
        <p class="price">$${dessert.price.toFixed(2)}</p>
      </div>
    </div>
  `;
    productGrid.innerHTML += cardHTML;
  });
}

const productGrid = document.getElementById("product-grid");

productGrid.addEventListener("click", (event) => {
  const addToCartBtn = event.target.closest(".add-to-cart-btn");

  if (addToCartBtn) {
    const productName = addToCartBtn.dataset.name;
    const productPrice = parseFloat(addToCartBtn.dataset.price);
    addToCart(productName, productPrice);
  }
});

function addToCart(productName) {
  const product = allDesserts.find((dessert) => dessert.name === productName);
  if (!cart.find((item) => item.name === productName)) {
    cart.push({ ...product, quantity: 1 });
    updateButtonState(productName);
    renderCart();
  }
}

function updateButtonState(productName) {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const name = card.querySelector(".name").innerText;
    if (name === productName) {
      card.querySelector(".add-to-cart-btn").style.display = "none";
      card.querySelector(".quantity-selector").style.display = "flex";
      card.querySelector(".product-image").style.border =
        "2px solid hsl(14, 86%, 42%)";
    }
  });
}

getDesserts();
