//import these
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  OnValue,
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
const ulEl = document.querySelector("#shopping-list");

addBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;
  push(shoppingListDB, inputValue);
  clearInput();
  appendItem(inputValue);
});

function clearInput() {
  inputEl.value = "";
}

function appendItem(input) {
  ulEl.innerHTML += `<li>${input}</li>`;
}
