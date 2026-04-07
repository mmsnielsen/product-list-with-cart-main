async function getDesserts() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    displayDesserts(data);
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
        <button class="add-to-cart-btn">
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

getDesserts();
