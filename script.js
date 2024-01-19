//import these
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

//set database URL
const appSettings = {
  databaseURL:
    "https://addtocart-ff272-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList");

const inputEl = document.querySelector("#input-field");
const addBtn = document.querySelector("#add-button");
const shoppingList = document.querySelector("#shopping-list");

addBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;
  push(shoppingListDB, inputValue);
  clearInput();
});

onValue(shoppingListDB, function (snapshot) {
  if (snapshot.exists() === true) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingList();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItem(currentItem);
    }
  } else {
    shoppingList.innerHTML = "No messages yet. Wan't to add some?";
  }
});

function clearShoppingList() {
  shoppingList.innerHTML = "";
}

function clearInput() {
  inputEl.value = "";
}

function appendItem(item) {
  //   shoppingList.innerHTML += `<li>${input}</li>`;
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });
  shoppingList.append(newEl);
}
