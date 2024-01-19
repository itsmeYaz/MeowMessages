/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/
const inputEl = document.querySelector("#input-field");
const addBtn = document.querySelector("#add-button");

addBtn.addEventListener("click", function () {
  console.log(inputEl.value);
  inputEl.value = "";
});
