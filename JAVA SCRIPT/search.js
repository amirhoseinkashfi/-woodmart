const searchBox = document.getElementById("searchBox");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const shoppingCart = document.querySelector(".number_of_shopping_cart_a_link");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

// ======================SEARCH BOX
searchBox.addEventListener("click", () => {

    searchOverlay.classList.add("active");

    setTimeout(() => {
        searchInput.focus();
    }, 200);

});


closeSearch.addEventListener("click", () => {

    searchOverlay.classList.remove("active");

});



shoppingCart.addEventListener("click", (event) => {

    event.preventDefault();

    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");

});

closeCart.addEventListener("click", () => {

    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");

});

cartOverlay.addEventListener("click", () => {

    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");

});