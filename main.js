const addItemButton = document.getElementById("add-item-btn");
const displayAddSection = document.getElementById("display-add-section");
const hideAddSection = document.getElementById("hide-add-section");
const addSection = document.getElementById("add-section-container");
const wishlistItems = document.getElementById("wishlist-items");
const urlInput = document.getElementById("item-url");
const nameInput = document.getElementById("item-name-input");
const priceInput = document.getElementById("item-price-input");
const quantityInput = document.getElementById("item-quantity-input");
const categoryInput = document.getElementById("category-picker");
const wishlistTotal = document.getElementById("wishlist-total");
const wishlistEntries = [];
let itemId = 1;

// Initialize the price and quantity values to default values
priceInput.value = 0;
quantityInput.value = 1;

const getInputValues = () => {
  //Gets the user's inputted values
  let urlVal = urlInput.value;
  let nameVal = nameInput.value;
  let priceVal = priceInput.value;
  let quantityVal = quantityInput.value;
  let categoryVal = categoryInput.value;
  let lineTotal = priceVal * quantityVal;

  console.log(priceVal, quantityVal, lineTotal);

  //Ensures url is not considered a relative link
  if (!urlVal.startsWith("http://") && !urlVal.startsWith("https://")) {
    urlVal = "http://" + urlVal;
  }

  let obj = {
    url: urlVal,
    name: nameVal,
    price: priceVal.toString(),
    quantity: quantityVal.toString(),
    category: categoryVal,
    totalCost: lineTotal,
  };

  return obj;
};

const clearInputValues = () => {
  //TODO: clear values of inputs when item is added to wishlist
};

const addItem = (e) => {
  // Adds wishlist item to page
  e.preventDefault();
  const itemObject = getInputValues();

  wishlistEntries.push(itemObject);
  updateWishlistTotal(wishlistEntries);

  let isValid = validateInputs(itemObject);

  if (isValid) {
    wishlistItems.innerHTML += `
    <div class="item" data-item-id="${itemId}">
    <p>ID: ${itemId}</p>
    <span class="category-icon">${itemObject.category}</span>
    <p class="item-title">${itemObject.name}</p>
  
    <p class="item-price">£${itemObject.price}</p>
  
    <p class="item-quantity">${itemObject.quantity}</p>
  
    <p class="total-line-price">£${itemObject.totalCost.toString()}</p>
    <a
      href="${itemObject.url}"
      target="_blank"
      ><i class="fa-solid fa-arrow-up-right-from-square"></i
    ></a>
    <button class="remove-btn" onclick="removeItem(${itemId})">
    <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>`;

    itemId++;
    toggleVisibility(addSection);
  }
};

const removeItem = (itemId) => {
  //TODO: removes wishlist item
  const itemToRemove = document.querySelector(
    `.item[data-item-id="${itemId}"]`
  );

  if (itemToRemove) {
    itemToRemove.remove();
  } else {
    alert("Cannot remove item that does not exist!");
  }
};

const validateInputs = (vals) => {
  for (const key in vals) {
    if (vals[key] === "") {
      return false;
    }
  }
  return true;
  //TODO: Add error message when validation fails
};

const updateWishlistTotal = (items) => {
  let totalPrice = 0;
  console.log(items);
  items.forEach((element) => {
    totalPrice += element.totalCost;
  });
  console.log(totalPrice);
  wishlistTotal.innerText = "£" + totalPrice.toString();
};

// Toggles an element to be visible or hidden
const toggleVisibility = (el) => {
  el.classList.toggle("show");
  el.classList.toggle("hidden");
};

addItemButton.addEventListener("click", addItem);

displayAddSection.addEventListener("click", () => {
  toggleVisibility(addSection);
});

hideAddSection.addEventListener("click", () => {
  toggleVisibility(addSection);
});
