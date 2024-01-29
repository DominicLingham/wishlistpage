const addItemButton = document.getElementById("add-item-btn");
const wishlistItems = document.getElementById("wishlist-items");
const items = [];

const addItem = (e) => {
  e.preventDefault();
  console.log("add item!");
  let object = {
    name: "Book",
    price: "£15.99",
    quantity: 1,
  };
  items.push(object);
  wishlistItems.innerHTML += `
  <div class="item">
  <h3>${items[0].name}</h3>
  <p>${items[0].price}</p>
  <p>${items[0].quantity}</p>
  </div>
  `;
};

addItemButton.addEventListener("click", addItem);
