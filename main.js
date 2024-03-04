import printJS from "print-js";
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
const emptyWishlistMessage = document.getElementById("wishlist-empty-message");
const validationMessage = document.getElementById("validation-message");
const printWishlistButton = document.getElementById("print-wishlist");
const printSection = document.getElementById("print-section");
const wishlistEntries = [];
const wishlistSaveButton = document.getElementById("wishlist-save");
const wishlistLoadButton = document.getElementById("wishlist-load");
const wishlistDeleteButton = document.getElementById("wishlist-delete");
let itemId = 1;

// Initialize the price and quantity values to default values
priceInput.value = 0;
quantityInput.value = 1;
emptyWishlistMessage.classList.add("show");

/**
 * Gets the user's input to the wishlist item form
 * @returns an object containing the input values
 */
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
    itemId: itemId,
    url: urlVal,
    name: nameVal,
    price: parseFloat(priceVal),
    quantity: parseInt(quantityVal),
    category: categoryVal,
    totalCost: lineTotal,
  };

  return obj;
};

/**
 *
 * @param e prevents default
 * @returns false if inputs are invalid
 */
const addItem = (e) => {
  e.preventDefault();
  const itemObject = getInputValues();

  let isValid = validateInputs(itemObject);

  // Show validation message if any input is empty
  if (!isValid) {
    validationMessage.classList.replace("hidden", "show");
    return;
  }

  wishlistEntries.push(itemObject);

  updateWishlistTotal(wishlistEntries);

  const newItem = document.createElement("div");
  const wishlistItemId = itemObject.itemId;
  newItem.classList.add("item");
  newItem.dataset.wishlistItemId = itemObject.itemId;

  newItem.innerHTML = `
      <span class="category-icon">${itemObject.category}</span>
      <p class="item-title">${itemObject.name}</p>
      <p class="item-price">£${itemObject.price}</p>
      <p class="item-quantity">${itemObject.quantity}</p>
      <p class="total-line-price">£${itemObject.totalCost.toString()}</p>
      <a href="${itemObject.url}" target="_blank">
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
      <button class="remove-btn" onclick="removeItem(${wishlistItemId})" id="export">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;

  wishlistItems.appendChild(newItem);

  if (validationMessage.classList.contains("show")) {
    validationMessage.classList.replace("show", "hidden");
  }

  updateEmptyWishlistMessage();
  toggleVisibility(addSection);
  clearInputValues();
  itemId++;
  console.log(wishlistEntries);
};

/**
 * Deletes a wishlist item from the list
 * @param id the unique id of the wishlist item to remove
 */
window.removeItem = (id) => {
  const itemToRemove = document.querySelector(
    `.item[data-wishlist-item-id="${id}"]`
  );

  if (itemToRemove) {
    itemToRemove.remove();
  } else {
    alert("Cannot remove item that does not exist!");
  }

  let index = wishlistEntries.findIndex((item) => item.itemId === id);
  if (index >= 0) {
    wishlistEntries.splice(index, 1);
  }
  // Removes wishlist entry's total price from wishlist total
  updateWishlistTotal(wishlistEntries);
  //hideEmptyWishlistMessage();
  updateEmptyWishlistMessage();
};

/**
 *
 * @param vals the input values
 * @returns false if any input is blank
 * @returns true if all the inputs have values
 */
const validateInputs = (vals) => {
  for (const key in vals) {
    if (vals[key] === "") {
      return false;
    }
  }
  return true;
};

/**
 * Updates the total wishlist price
 * @param items the list of current wishlist items
 */
const updateWishlistTotal = (items) => {
  let totalPrice = 0;
  console.log(items);
  items.forEach((element) => {
    totalPrice += element.totalCost;
  });
  console.log(totalPrice);
  wishlistTotal.innerText = "£" + totalPrice.toString();
};

/**
 * Clears the input values after a wishlist item is added
 */
const clearInputValues = () => {
  urlInput.value = "";
  nameInput.value = "";
  categoryInput.value = "";
  quantityInput.value = 1;
  priceInput.value = 0;
};

/**
 * Functionality to print the list of wishlist items
 * Uses printJS package
 */
const printWishlist = () => {
  printJS({
    printable: printSection,
    type: "html",
    header: "My Wishlist",
    css: "style.css",
    ignoreElements: ["export"],
    documentTitle: "My Wishlist",
  });
};

/**
 * Toggles an element to be visible or hidden
 * @param el the element to toggle the visibility for
 */
const toggleVisibility = (el) => {
  el.classList.toggle("show");
  el.classList.toggle("hidden");
};

/**
 * Sets the price field value to two decimal places when clicked away from
 * @param input the input field required to set to two decimal places
 */
const setTwoDecimal = (input) => {
  input.value = parseFloat(input.value).toFixed(2);
};

/**
 * Shows the 'Wishlist is empty' message if the wishlist is empty,
 * otherwise hides the message.
 */
const updateEmptyWishlistMessage = () => {
  if (wishlistEntries.length === 0) {
    emptyWishlistMessage.classList.replace("hidden", "show");
  } else {
    emptyWishlistMessage.classList.replace("show", "hidden");
  }
};

const saveWishlist = () => {
  if (wishlistEntries.length !== 0) {
    window.localStorage.setItem(
      "savedWishlist",
      JSON.stringify(wishlistEntries)
    );
  } else {
    console.log("cannot save empty wishlist");
  }
};

const wishlistLoad = () => {
  let UserSavedWishlist = window.localStorage.getItem("savedWishlist");
  if (UserSavedWishlist != null) {
    console.log(UserSavedWishlist);
    wishlistEntries.push(UserSavedWishlist);
    console.log(wishlistEntries);
    for (let i = 0; i < wishlistEntries.length; i++) {
      console.log(wishlistEntries[i]);
    }
  } else {
    console.log("no saved wishlist found");
  }
};

const wishlistDelete = () => {
  let UserSavedWishlist = window.localStorage.getItem("savedWishlist");
  if (UserSavedWishlist !== null) {
    window.localStorage.removeItem("savedWishlist");
    console.log("wishlist deleted");
  } else {
    console.log("no saved wishlist to delete");
  }
};

/**
 * Sets event listeners
 */
addItemButton.addEventListener("click", addItem);

displayAddSection.addEventListener("click", () => {
  toggleVisibility(addSection);
});

hideAddSection.addEventListener("click", () => {
  toggleVisibility(addSection);
});

priceInput.addEventListener("blur", () => setTwoDecimal(priceInput));

printWishlistButton.addEventListener("click", printWishlist);

wishlistSaveButton.addEventListener("click", saveWishlist);

wishlistLoadButton.addEventListener("click", wishlistLoad);

wishlistDeleteButton.addEventListener("click", wishlistDelete);
