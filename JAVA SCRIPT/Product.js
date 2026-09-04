const productsDataUrl = "../data/products.json";

const fetchingItems =
    document.querySelector(".fetching_items");

const header =
    document.querySelector(".bottom_header");

const headerWrapper =
    document.querySelector(".bottom_header_wrapper");

const countOfShowing =
    document.querySelector(".count_of_showing");

const resultCount =
    document.querySelector(".result_count");

const startCount =
    document.querySelector(".start_count");

const sortProducts =
    document.getElementById("sort_products");


// ======================
// URL SEARCH
// ======================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const searchQuery =
    urlParams.get("search");

const searchCategory =
    urlParams.get("category");


// ======================
// HEADER
// ======================

const headerTop =
    headerWrapper
        ? headerWrapper.offsetTop
        : 0;


window.addEventListener(
    "scroll",
    () => {

        if (
            header &&
            window.scrollY >= headerTop
        ) {

            header.classList.add(
                "sticky"
            );

        } else if (header) {

            header.classList.remove(
                "sticky"
            );

        }

    }
);


// ======================
// PRODUCTS VARIABLES
// ======================

let productsPerPage = 6;

let currentPage = 1;

let allProducts = [];

let originalProducts = [];


// ======================
// ADD TO CART
// ======================

function addToCart(
    productId,
    quantity = 1
) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingProduct =
        cart.find(
            item =>
                item.id === productId
        );


    if (existingProduct) {

        existingProduct.quantity +=
            quantity;

    } else {

        cart.push({

            id: productId,

            quantity: quantity

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ======================
// UPDATE ITEM COUNT
// ======================

function updateItemCount() {

    const totalProducts =
        allProducts.length;


    const start =
        totalProducts === 0
            ? 0
            : (currentPage - 1) *
                productsPerPage + 1;


    const end =
        Math.min(
            currentPage *
                productsPerPage,
            totalProducts
        );


    if (startCount) {

        startCount.textContent =
            start;

    }


    if (countOfShowing) {

        countOfShowing.textContent =
            end;

    }


    if (resultCount) {

        resultCount.textContent =
            totalProducts;

    }

}


// ======================
// SHOW PRODUCTS
// ======================

function showProducts() {

    if (!fetchingItems) {
        return;
    }


    fetchingItems.innerHTML = "";


    const start =
        (currentPage - 1) *
        productsPerPage;


    const end =
        start + productsPerPage;


    const productsToShow =
        allProducts.slice(
            start,
            end
        );


    productsToShow.forEach(
        product => {

            const productWrapper =
                document.createElement(
                    "div"
                );


            productWrapper.classList.add(
                "products_product_wrapper"
            );


            const productBox =
                document.createElement(
                    "div"
                );


            productBox.classList.add(
                "products_product_box"
            );


            productBox.dataset.productId =
                product.id;


            productBox.innerHTML = `

                <div class="products_product_image">

                    <img
                        src="${product.image_address}"
                        alt="${product.name}"
                    >

                </div>


                <div class="products_product_info">

                    <div class="products_title_box">

                        <h3>
                            ${product.name}
                        </h3>

                        <img
                            src="../images/icons8-heart-20.png"
                            alt="wishlist"
                        >

                    </div>


                    <div class="products_product_price">

                        ${
                            product.discount
                                ? `
                                    <span class="products_old_price">
                                        $${product.old_price.toFixed(2)}
                                    </span>
                                `
                                : ""
                        }

                        <span class="products_current_price">
                            $${product.price.toFixed(2)}
                        </span>

                        <span class="products_slash">
                            /
                        </span>

                        <span class="products_count">
                            ${product.weight}
                        </span>

                    </div>


                    <div class="products_rate">

                        <img
                            src="../images/icons8-star-14.png"
                            alt="star"
                        >

                        ${product.rate}

                    </div>

                </div>


                <div class="products_product_actions">

                    <div class="products_product_quantity">

                        <button
                            class="products_quantity_minus"
                        >
                            −
                        </button>


                        <span
                            class="products_quantity_number"
                        >
                            1
                        </span>


                        <button
                            class="products_quantity_plus"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="products_add_to_cart"
                    >
                        Add to cart
                    </button>

                </div>

            `;


            // ======================
            // PRODUCT CLICK
            // ======================

            productBox.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".products_product_actions"
                        )
                    ) {

                        return;

                    }


                    window.location.href =
                        `product.html?id=${product.id}`;

                }
            );


            productWrapper.appendChild(
                productBox
            );


            fetchingItems.appendChild(
                productWrapper
            );

        }
    );


    updateItemCount();

}


// ======================
// PRODUCT ACTIONS
// ======================

if (fetchingItems) {

    fetchingItems.addEventListener(
        "click",
        event => {


            // ======================
            // PLUS
            // ======================

            if (
                event.target.classList.contains(
                    "products_quantity_plus"
                )
            ) {

                event.stopPropagation();


                const quantityNumber =
                    event.target
                        .parentElement
                        .querySelector(
                            ".products_quantity_number"
                        );


                let quantity =
                    Number(
                        quantityNumber.textContent
                    );


                quantity++;


                quantityNumber.textContent =
                    quantity;


                return;

            }


            // ======================
            // MINUS
            // ======================

            if (
                event.target.classList.contains(
                    "products_quantity_minus"
                )
            ) {

                event.stopPropagation();


                const quantityNumber =
                    event.target
                        .parentElement
                        .querySelector(
                            ".products_quantity_number"
                        );


                let quantity =
                    Number(
                        quantityNumber.textContent
                    );


                if (quantity > 1) {

                    quantity--;

                }


                quantityNumber.textContent =
                    quantity;


                return;

            }


            // ======================
            // ADD TO CART
            // ======================

            if (
                event.target.classList.contains(
                    "products_add_to_cart"
                )
            ) {

                event.stopPropagation();


                const productBox =
                    event.target.closest(
                        ".products_product_box"
                    );


                const productId =
                    Number(
                        productBox.dataset.productId
                    );


                const quantityNumber =
                    productBox.querySelector(
                        ".products_quantity_number"
                    );


                const quantity =
                    Number(
                        quantityNumber.textContent
                    );


                addToCart(
                    productId,
                    quantity
                );


                return;

            }

        }
    );

}


// ======================
// PAGE SIZE
// ======================

const pageSizeLinks =
    document.querySelectorAll(
        ".number_in_page a"
    );


pageSizeLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                productsPerPage =
                    Number(
                        link.dataset.count
                    );


                currentPage = 1;


                pageSizeLinks.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );


                showProducts();

                createPagination();

            }
        );

    }
);


// ======================
// SORT PRODUCTS
// ======================

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        () => {

            const sortValue =
                sortProducts.value;


            if (
                sortValue ===
                "default"
            ) {

                allProducts =
                    [
                        ...originalProducts
                    ];

            }


            if (
                sortValue ===
                "price-low"
            ) {

                allProducts =
                    [
                        ...originalProducts
                    ].sort(
                        (a, b) =>
                            a.price - b.price
                    );

            }


            if (
                sortValue ===
                "price-high"
            ) {

                allProducts =
                    [
                        ...originalProducts
                    ].sort(
                        (a, b) =>
                            b.price - a.price
                    );

            }


            if (
                sortValue ===
                "name-a-z"
            ) {

                allProducts =
                    [
                        ...originalProducts
                    ].sort(
                        (a, b) =>
                            a.name.localeCompare(
                                b.name
                            )
                    );

            }


            if (
                sortValue ===
                "name-z-a"
            ) {

                allProducts =
                    [
                        ...originalProducts
                    ].sort(
                        (a, b) =>
                            b.name.localeCompare(
                                a.name
                            )
                    );

            }


            if (
                sortValue ===
                "rating"
            ) {

                allProducts =
                    [
                        ...originalProducts
                    ].sort(
                        (a, b) =>
                            b.rate - a.rate
                    );

            }


            currentPage = 1;


            showProducts();

            createPagination();

        }
    );

}


// ======================
// PAGINATION
// ======================

function createPagination() {

    const pagination =
        document.querySelector(
            ".pagination"
        );


    if (!pagination) {
        return;
    }


    pagination.innerHTML = "";


    const totalPages =
        Math.ceil(
            allProducts.length /
            productsPerPage
        );


    if (totalPages <= 1) {
        return;
    }


    // ======================
    // PREVIOUS
    // ======================

    const previous =
        document.createElement(
            "button"
        );


    previous.textContent = "‹";


    previous.disabled =
        currentPage === 1;


    previous.addEventListener(
        "click",
        () => {

            if (
                currentPage > 1
            ) {

                currentPage--;

                showProducts();

                createPagination();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );


    pagination.appendChild(
        previous
    );


    // ======================
    // PAGE NUMBERS
    // ======================

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const pageButton =
            document.createElement(
                "button"
            );


        pageButton.textContent =
            i;


        if (
            i === currentPage
        ) {

            pageButton.classList.add(
                "active"
            );

        }


        pageButton.addEventListener(
            "click",
            () => {

                currentPage = i;


                showProducts();

                createPagination();


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


        pagination.appendChild(
            pageButton
        );

    }


    // ======================
    // NEXT
    // ======================

    const next =
        document.createElement(
            "button"
        );


    next.textContent = "›";


    next.disabled =
        currentPage === totalPages;


    next.addEventListener(
        "click",
        () => {

            if (
                currentPage <
                totalPages
            ) {

                currentPage++;


                showProducts();

                createPagination();


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );


    pagination.appendChild(
        next
    );

}


// ======================
// FETCH PRODUCTS
// ======================

fetch(productsDataUrl)

    .then(
        response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load products.json"
                );

            }


            return response.json();

        }
    )

    .then(
        products => {


            // ======================
            // ORIGINAL PRODUCTS
            // ======================

            originalProducts =
                [...products];


            // ======================
            // START FILTER
            // ======================

            let filteredProducts =
                [...products];


            // ======================
            // SEARCH BY NAME
            // OR CATEGORY
            // ======================

            if (searchQuery) {

                const searchText =
                    searchQuery
                        .trim()
                        .toLowerCase();


                filteredProducts =
                    filteredProducts.filter(
                        product => {

                            const productName =
                                String(
                                    product.name
                                ).toLowerCase();


                            const productCategory =
                                String(
                                    product.categories
                                ).toLowerCase();


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


            // ======================
            // CATEGORY FROM SEARCH
            // ======================

            if (searchCategory) {

                const categoryText =
                    searchCategory
                        .trim()
                        .toLowerCase();


                filteredProducts =
                    filteredProducts.filter(
                        product => {

                            const category =
                                String(
                                    product.categories
                                ).toLowerCase();


                            return category.includes(
                                categoryText
                            );

                        }
                    );

            }


            // ======================
            // SET PRODUCTS
            // ======================

            allProducts =
                filteredProducts;


            currentPage = 1;


            // ======================
            // SHOW
            // ======================

            showProducts();

            createPagination();


            // ======================
            // NOTIFY FILTER JS
            // ======================

            document.dispatchEvent(
                new Event(
                    "productsLoaded"
                )
            );

        }
    )

    .catch(
        error => {

            console.error(
                "Error loading products:",
                error
            );

        }
    );