const addItemButton = document.getElementById("add-item-btn");
const wishlistItems = document.getElementById("wishlist-items");
const urlInput = document.getElementById("item-url");
const nameInput = document.getElementById("item-name-input");
const priceInput = document.getElementById("item-price-input");
const quantityInput = document.getElementById("item-quantity-input");
const categoryInput = document.getElementById("category-picker");
const wishlistEntries = [];
let itemId = 1;

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
    totalCost: lineTotal.toString(),
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

  let isValid = validateInputs(itemObject);

  if (isValid) {
    wishlistItems.innerHTML += `
    <div class="item" data-item-id=${itemId}>
    <a href="${itemObject.url}" target="_blank">
    <span class="category-icon">${itemObject.category}</span>
      <p class="item-title">${itemObject.name}</p>

      <p class="item-price">£${itemObject.price}</p>

      <p class="item-quantity">${itemObject.quantity}</p>

      <p class="total-line-price">£${itemObject.totalCost}</p>
    </a>
    <button class="remove-btn" onclick="removeItem(${itemId})">Remove item</button>
  </div>
    `;

    itemId++;
  }
};

const removeItem = (itemId) => {
  //TODO: removes wishlist item
  console.log("removing..." + itemId);

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
};

addItemButton.addEventListener("click", addItem);
