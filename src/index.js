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
  const target = event.target;

  const addToCartBtn = target.closest(".add-to-cart-btn");
  if (addToCartBtn) {
    const productName = addToCartBtn.dataset.name;
    addToCart(productName);
  }
  const incrementBtn = target.closest(".increase-btn");
  if (incrementBtn) {
    const productName = incrementBtn.closest(".product-card").querySelector(".name").innerText;
    upadteQuantity(productName, 1);
  }
  const decrementBtn = target.closest(".decrease-btn");
  if (decrementBtn) {
    const productName = decrementBtn.closest(".product-card").querySelector(".name").innerText;
    upadteQuantity(productName, -1);
  }
});

function upadteQuantity(productName, change) {
  const cartItem = cart.find((item) => item.name === productName);
  if (cartItem > -1) {
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
      cart.splice(cartItem, 1);
      resetButtonState(productName);
    }
    renderCart();
    updateCardQuantity(productName);
  }
}

function updateCardQuantity(productName) {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const name = card.querySelector(".name").innerText;
    if (name === productName) {
      const item = cart.find((item) => item.name === productName);
      card.querySelector(".quantity").innerText = item.quantity;
    }
  });
}

function resetButtonState(productName) {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const name = card.querySelector(".name").innerText;
    if (name === productName) {
      card.querySelector(".add-to-cart-btn").style.display = "flex";
      card.querySelector(".quantity-selector").style.display = "none";
      card.querySelector(".product-image").style.border = "none";
    }
  });
}



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

function renderCart() {
  const cartEmpty = document.getElementById("cart-empty");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.querySelector(".cart-content h2");

  if (cart.length > 0) {
    cartEmpty.style.display = "none";
    cartItemsContainer.style.display = "block";

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    cartTotal.innerText = `Your Cart (${totalPrice})`;

    cartItemsContainer.innerHTML =
      cart
        .map(
          (item) => `
      <div class="cart-item">
       <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <div class="cart-item-details">
            <span class="item-qty">${item.quantity}x</span>
            <span class="item-price">@ $${item.price.toFixed(2)}</span>
            <span class="item-total">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
        <button class="remove-item" onclick="removeFromCart('${item.name}')">
          <img src="./assets/images/icon-remove-item.svg" alt="Remove" />
        </button>
      </div>
    `,
        )
        .join("") +
      `
      <div class="cart-total">
        <span>Order Total</span>
        <span class="total-price">$${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
      </div>
      <div class="carbon-neutral">
        <img src="./assets/images/icon-carbon-neutral.svg" alt="" />
        <p>This is a <strong>carbon-neutral</strong> delivery</p>
      </div>
      <button class="confirm-btn">Confirm Order</button>
    `;
  } else {
    cartEmpty.style.display = "flex";
    cartItemsContainer.style.display = "none";
    cartTotal.innerText = "Your Cart (0)";
  }
}

getDesserts();
