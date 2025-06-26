const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const cartItems = document.querySelector(".cart-notification");
const cartButton = document.getElementById("cart-btn");
const productsContainer = document.querySelector(".products-section");
const billContainer = document.getElementById("bill-container");

let totalCartCount = 0;
let cartData = [];

addToCartBtns.forEach((btn) => {
  const productCard = btn.closest(".product-card");
  const minusIcon = productCard.querySelector(".first-icon");
  const plusIcon = productCard.querySelector(".second-icon");
  const quantityDisplay = productCard.querySelector(".quantity-num");

  let quantity = 1;

  plusIcon.addEventListener("click", () => {
    quantity++;
    quantityDisplay.innerText = quantity;
  });

  minusIcon.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.innerText = quantity;
    }
  });

  btn.addEventListener("click", () => {
    const title = productCard.querySelector(".full-name").innerText;
    const brand = productCard.querySelector(".first-name").innerText;
    const price = parseInt(productCard.querySelector(".real-price").innerText.replace("Rs.", ""));
    const image = productCard.querySelector("img").src;

    totalCartCount += quantity;
    cartItems.innerText = totalCartCount;
    cartItems.style.display = totalCartCount > 0 ? "flex" : "none";

    const existingItem = cartData.find(
      (item) => item.title === title && item.brand === brand
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartData.push({ title, brand, price, image, quantity });
    }

    quantity = 1;
    quantityDisplay.innerText = quantity;
  });
});

function generateBill() {
  productsContainer.style.display = "none";
  billContainer.style.display = "block";
  billContainer.innerHTML = "<h2 style='margin-bottom: 15px;margin-top: 20px'>Your Cart Summary</h2>";

  let total = 0;

  cartData.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.style.marginBottom = "20px";
    div.innerHTML = `
      <div style="display: flex; gap: 20px;">
        <img src="${item.image}" width="200" height="200" />
        <div>
          <h3>${item.brand}</h3>
          <p>${item.title}</p>
          <p>Price: ₹${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <p><strong>Subtotal: ₹${item.price * item.quantity}</strong></p>
        </div>
      </div>
      <hr style="margin-top:20px;margin-bottom:20px;"/>
    `;
    billContainer.appendChild(div);
    total += item.price * item.quantity;
  });

  const totalTag = document.createElement("h3");
  totalTag.innerText = "Total Amount: ₹" + total;
  totalTag.style.marginTop = "20px";
  billContainer.appendChild(totalTag);
}

cartButton.addEventListener("click", () => {
  if (totalCartCount === 0) {
    window.location.href = "empty-cart.html";
  } else {
    generateBill();
  }
});