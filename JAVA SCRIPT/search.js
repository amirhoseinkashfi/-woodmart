// =====================================================
//                    ELEMENTS
// =====================================================

const searchBox =
    document.getElementById("searchBox");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");

const shoppingCart =
    document.querySelector(
        ".number_of_shopping_cart_a_link"
    );

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const responsiveSearchBox =
    document.getElementById("responsiveSearchBox");

const openMenu =
    document.querySelector(".menu_for_1024");

const closeMenu =
    document.getElementById("closeMenu");

const leftMenu =
    document.getElementById("leftMenu");

const menuOverlay =
    document.getElementById("menuOverlay");

const menuTabs =
    document.querySelectorAll(".left_menu_tab");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const menuContents =
    document.querySelectorAll(
        ".left_menu_content"
    );


// =====================================================
//                    SEARCH BOX
// =====================================================

if (
    searchBox &&
    searchOverlay &&
    searchInput
) {

    searchBox.addEventListener(
        "click",
        () => {

            searchOverlay.classList.add(
                "active"
            );


            setTimeout(() => {

                searchInput.focus();

            }, 200);

        }
    );

}


if (
    responsiveSearchBox &&
    searchOverlay &&
    searchInput
) {

    responsiveSearchBox.addEventListener(
        "click",
        () => {

            searchOverlay.classList.add(
                "active"
            );


            setTimeout(() => {

                searchInput.focus();

            }, 200);

        }
    );

}


if (
    closeSearch &&
    searchOverlay
) {

    closeSearch.addEventListener(
        "click",
        () => {

            searchOverlay.classList.remove(
                "active"
            );

        }
    );

}


// =====================================================
//                    SHOPPING CART
// =====================================================

if (
    shoppingCart &&
    cartDrawer &&
    cartOverlay
) {

    shoppingCart.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            cartDrawer.classList.add(
                "active"
            );


            cartOverlay.classList.add(
                "active"
            );

        }
    );

}


if (
    closeCart &&
    cartDrawer &&
    cartOverlay
) {

    closeCart.addEventListener(
        "click",
        () => {

            cartDrawer.classList.remove(
                "active"
            );


            cartOverlay.classList.remove(
                "active"
            );

        }
    );

}


if (
    cartOverlay &&
    cartDrawer
) {

    cartOverlay.addEventListener(
        "click",
        () => {

            cartDrawer.classList.remove(
                "active"
            );


            cartOverlay.classList.remove(
                "active"
            );

        }
    );

}


// =====================================================
//                    FOOTER ACCORDION
// =====================================================

const footerAccordions =
    document.querySelectorAll(
        ".footer_accordion"
    );


footerAccordions.forEach(
    (accordion) => {

        const accordionHeader =
            accordion.querySelector(
                ".footer_accordion_header"
            );


        if (accordionHeader) {

            accordionHeader.addEventListener(
                "click",
                () => {

                    accordion.classList.toggle(
                        "active"
                    );

                }
            );

        }

    }
);


// =====================================================
//                    NAV RESPONSIVE
// =====================================================

if (
    mobileMenuButton &&
    leftMenu &&
    menuOverlay
) {

    mobileMenuButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            leftMenu.classList.add(
                "active"
            );


            menuOverlay.classList.add(
                "active"
            );

        }
    );

}


if (
    openMenu &&
    leftMenu &&
    menuOverlay
) {

    openMenu.addEventListener(
        "click",
        () => {

            leftMenu.classList.add(
                "active"
            );


            menuOverlay.classList.add(
                "active"
            );

        }
    );

}


if (
    closeMenu &&
    leftMenu &&
    menuOverlay
) {

    closeMenu.addEventListener(
        "click",
        () => {

            leftMenu.classList.remove(
                "active"
            );


            menuOverlay.classList.remove(
                "active"
            );

        }
    );

}


if (
    menuOverlay &&
    leftMenu
) {

    menuOverlay.addEventListener(
        "click",
        () => {

            leftMenu.classList.remove(
                "active"
            );


            menuOverlay.classList.remove(
                "active"
            );

        }
    );

}


// =====================================================
//                    MENU TABS
// =====================================================

menuTabs.forEach(
    tab => {

        tab.addEventListener(
            "click",
            () => {

                const targetId =
                    tab.dataset.target;


                // حذف active از Tab ها

                menuTabs.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                // active برای Tab انتخاب شده

                tab.classList.add(
                    "active"
                );


                // حذف active از محتوا

                menuContents.forEach(
                    content => {

                        content.classList.remove(
                            "active"
                        );

                    }
                );


                // پیدا کردن محتوای مربوطه

                const targetContent =
                    document.getElementById(
                        targetId
                    );


                if (targetContent) {

                    targetContent.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


// =====================================================
//                    PRODUCT SEARCH
// =====================================================

const searchButton =
    document.getElementById(
        "searchButton"
    );


const searchDropdown =
    document.getElementById(
        "search_dropdown"
    );


// =====================================================
//              GET SEARCH PARAMETERS
// =====================================================

function getSearchParameters() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const searchText =
        (
            urlParams.get("search") || ""
        )
        .trim()
        .toLowerCase();


    const searchCategory =
        (
            urlParams.get("category") || ""
        )
        .trim();


    return {
        searchText,
        searchCategory
    };

}


// =====================================================
//                  SEARCH PRODUCTS
// =====================================================

function searchProducts(products) {

    const {
        searchText,
        searchCategory
    } =
        getSearchParameters();


    let filteredProducts =
        [...products];


    // =================================================
    // SEARCH TEXT
    // =================================================

    if (searchText) {

        filteredProducts =
            filteredProducts.filter(
                product => {

                    const productName =
                        String(
                            product.name
                        )
                        .toLowerCase();


                    const productCategory =
                        String(
                            product.categories
                        )
                        .toLowerCase();


                    return (
                        productName.includes(
                            searchText
                        ) ||

                        productCategory.includes(
                            searchText
                        )
                    );

                }
            );

    }


    // =================================================
    // SEARCH CATEGORY
    // =================================================

    if (searchCategory) {

        filteredProducts =
            filteredProducts.filter(
                product => {

                    return (
                        String(
                            product.categories
                        )
                        .toLowerCase() ===
                        searchCategory.toLowerCase()
                    );

                }
            );

    }


    return filteredProducts;

}


// =====================================================
//                    PERFORM SEARCH
// =====================================================

function performSearch() {

    // اگر Input وجود نداشت

    if (!searchInput) {

        return;

    }


    const searchText =
        searchInput.value.trim();


    const selectedCategory =
        searchDropdown
            ? searchDropdown.value
            : "";


    // اگر هیچ چیزی وارد نشده

    if (
        searchText === "" &&
        selectedCategory === ""
    ) {

        return;

    }


    // ساخت Query String

    const params =
        new URLSearchParams();


    // Search Text

    if (searchText !== "") {

        params.set(
            "search",
            searchText
        );

    }


    // Category

    if (selectedCategory !== "") {

        params.set(
            "category",
            selectedCategory
        );

    }


    // رفتن به Products.html

    window.location.href =
        `./Products.html?${params.toString()}`;

}


// =====================================================
//                  SEARCH BUTTON EVENT
// =====================================================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        performSearch
    );

}


// =====================================================
//                    ENTER KEY
// =====================================================

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                performSearch();

            }

        }
    );

}