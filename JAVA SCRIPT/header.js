const header = document.getElementById("bottomHeader");
const headerWrapper = document.querySelector(".bottom_header_wrapper");
const headerTop = headerWrapper.offsetTop;
const searchBox = document.getElementById("searchBox");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

// ======================HEADER
window.addEventListener("scroll", () => {

    if (window.scrollY >= headerTop) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

});

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