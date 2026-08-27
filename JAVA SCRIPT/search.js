const searchBox = document.getElementById("searchBox");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");


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