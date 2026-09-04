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
// HEADER
// ======================

const headerTop =
    headerWrapper
        ? headerWrapper.offsetTop
        : 0;


window.addEventListener("scroll", () => {

    if (
        header &&
        window.scrollY >= headerTop
    ) {

        header.classList.add("sticky");

    } else if (header) {

        header.classList.remove("sticky");

    }

});


// ====================== PAGINATION VARIABLES ======================

let productsPerPage = 6;

let currentPage = 1;

let allProducts = [];


// آرایه اصلی محصولات
let originalProducts = [];


// ====================== ADD TO CART ======================

function addToCart(productId, quantity = 1) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const existingProduct =
        cart.find(item => item.id === productId);


    if (existingProduct) {

        existingProduct.quantity += quantity;

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


// ====================== SHOW 6 / 10 / 20 ======================

const pageSizeLinks =
    document.querySelectorAll(".number_in_page a");


pageSizeLinks.forEach(link => {

    link.addEventListener("click", (event) => {

        event.preventDefault();


        productsPerPage =
            Number(link.dataset.count);


        currentPage = 1;


        // حذف active از همه
        pageSizeLinks.forEach(item => {

            item.classList.remove("active");

        });


        // active برای گزینه انتخاب شده
        link.classList.add("active");


        showProducts();

        createPagination();

    });

});


// ====================== SORT PRODUCTS ======================

if (sortProducts) {

    sortProducts.addEventListener("change", () => {

        const sortValue =
            sortProducts.value;


        // ================= DEFAULT =================

        if (sortValue === "default") {

            allProducts =
                [...originalProducts];

        }


        // ================= PRICE LOW TO HIGH =================

        else if (sortValue === "price-low") {

            allProducts.sort((a, b) => {

                return a.price - b.price;

            });

        }


        // ================= PRICE HIGH TO LOW =================

        else if (sortValue === "price-high") {

            allProducts.sort((a, b) => {

                return b.price - a.price;

            });

        }


        // ================= NAME A-Z =================

        else if (sortValue === "name-a-z") {

            allProducts.sort((a, b) => {

                return a.name.localeCompare(b.name);

            });

        }


        // ================= NAME Z-A =================

        else if (sortValue === "name-z-a") {

            allProducts.sort((a, b) => {

                return b.name.localeCompare(a.name);

            });

        }


        // ================= RATING HIGH TO LOW =================

        else if (sortValue === "rating-high") {

            allProducts.sort((a, b) => {

                return b.rate - a.rate;

            });

        }


        // بعد از Sort برگرد به صفحه اول
        currentPage = 1;


        showProducts();

        createPagination();

    });

}


// ====================== FETCH PRODUCTS ======================

// ======================
// FETCH PRODUCTS
// ======================

fetch(productsDataUrl)

    .then(response => response.json())

    .then(products => {

        // ======================
        // ORIGINAL PRODUCTS
        // ======================

        originalProducts =
            [...products];


        // ======================
        // SEARCH
        // ======================

        allProducts =
            searchProducts(products);


        // ======================
        // SHOW PRODUCTS
        // ======================

        showProducts();


        // ======================
        // CREATE PAGINATION
        // ======================

        createPagination();


        // ======================
        // PRODUCTS LOADED
        // ======================

        document.dispatchEvent(
            new Event("productsLoaded")
        );

    })

    .catch(error => {

        console.error(
            "Error loading products:",
            error
        );

    });


// ====================== SHOW PRODUCTS ======================

function showProducts() {

    // پاک کردن محصولات قبلی
    fetchingItems.innerHTML = "";


    // ======================
    // CALCULATE INDEX
    // ======================

    const startIndex =
        (currentPage - 1) *
        productsPerPage;


    const endIndex =
        Math.min(
            startIndex + productsPerPage,
            allProducts.length
        );


    // ======================
    // PRODUCTS OF CURRENT PAGE
    // ======================

    const productsToShow =
        allProducts.slice(
            startIndex,
            endIndex
        );


    // ======================
    // CREATE PRODUCTS
    // ======================

    productsToShow.forEach(product => {


        // ======================
        // PRODUCT WRAPPER
        // ======================

        const productWrapper =
            document.createElement("div");


        productWrapper.classList.add(
            "products_product_wrapper"
        );


        // ======================
        // PRODUCT BOX
        // ======================

        const productBox =
            document.createElement("div");


        productBox.classList.add(
            "products_product_box"
        );


        // ذخیره ID محصول روی کارت
        productBox.dataset.productId =
            product.id;


        // ======================
        // PRODUCT HTML
        // ======================

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


                    <div class="products_img_box">

                        <img 
                            src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Gluten-free-symbol.svg"
                            alt=""
                        >

                        <img 
                            src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Kosher-symbol.svg"
                            alt=""
                        >

                        <img 
                            src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Vegan-symbol.svg"
                            alt=""
                        >

                    </div>

                </div>


                <div class="products_product_price">

                    ${
                        product.discount

                        ?

                        `

                            <span class="products_old_price">

                                $${product.old_price.toFixed(2)}

                            </span>


                            <span class="products_current_price">

                                $${product.price.toFixed(2)}

                            </span>

                        `

                        :

                        `

                            <span class="products_current_price">

                                $${product.price.toFixed(2)}

                            </span>

                        `
                    }


                    <span class="products_slash">
                        /
                    </span>


                    <span class="products_count">

                        ${product.weight}

                    </span>


                    <span class="products_rate">

                        ${
                            product.rate !== 0

                            ?

                            `

                                ${product.rate.toFixed(1)}

                                <img 
                                    src="../Product-image/icons8-star-20.png"
                                    alt="star"
                                >

                            `

                            :

                            ""
                        }

                    </span>

                </div>

            </div>

        `;


        // ======================
        // ACTIONS
        // ======================

        const actions =
            document.createElement("div");


        actions.classList.add(
            "products_product_actions"
        );


        actions.innerHTML = `

            <div class="products_product_quantity">

                <button class="products_quantity_minus">
                    −
                </button>


                <span class="products_quantity_number">
                    1
                </span>


                <button class="products_quantity_plus">
                    +
                </button>

            </div>


            <button class="products_add_to_cart">

                Add to cart

            </button>

        `;


        productBox.appendChild(actions);


        // ======================
        // PRODUCT CLICK
        // ======================

        productBox.addEventListener(
            "click",
            (event) => {


                // اگر روی قسمت Actions کلیک شده
                // وارد صفحه محصول نشو
                if (
                    event.target.closest(
                        ".products_product_actions"
                    )
                ) {

                    return;

                }


                // در غیر این صورت
                // برو به صفحه محصول
                window.location.href =
                    `product.html?id=${product.id}`;

            }
        );


        // ======================
        // ADD TO DOM
        // ======================

        productWrapper.appendChild(
            productBox
        );


        fetchingItems.appendChild(
            productWrapper
        );

    });


    // ======================
    // UPDATE ITEM COUNT
    // ======================

    updateItemCount();

}


// ======================
// QUANTITY + / -
// ADD TO CART
// ======================

fetchingItems.addEventListener(
    "click",
    (event) => {


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


            // حداقل تعداد 1
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


// ======================
// UPDATE ITEM COUNT
// ======================

function updateItemCount() {

    const startIndex =
        (currentPage - 1) *
        productsPerPage;


    const endIndex =
        Math.min(
            startIndex + productsPerPage,
            allProducts.length
        );


    // Showing 1 - 6 of 20

    if (startCount) {

        startCount.textContent =
            allProducts.length === 0
                ? 0
                : startIndex + 1;

    }


    if (countOfShowing) {

        countOfShowing.textContent =
            endIndex;

    }


    if (resultCount) {

        resultCount.textContent =
            allProducts.length;

    }

}


// ======================
// CREATE PAGINATION
// ======================

function createPagination() {

    const pagination =
        document.querySelector(
            ".pagination"
        );


    if (!pagination) {

        return;

    }


    // پاک کردن Pagination قبلی
    pagination.innerHTML = "";


    const totalPages =
        Math.ceil(
            allProducts.length /
            productsPerPage
        );


    // ======================
    // PREVIOUS
    // ======================

    if (currentPage > 1) {

        const previousButton =
            document.createElement("button");


        previousButton.innerHTML =
            "‹";


        previousButton.addEventListener(
            "click",
            () => {

                currentPage--;


                showProducts();

                createPagination();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );


        pagination.appendChild(
            previousButton
        );

    }


    // ======================
    // PAGE NUMBERS
    // ======================

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const pageButton =
            document.createElement("button");


        pageButton.innerText =
            i;


        // صفحه فعلی
        if (i === currentPage) {

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

    if (
        currentPage <
        totalPages
    ) {

        const nextButton =
            document.createElement("button");


        nextButton.innerHTML =
            "›";


        nextButton.addEventListener(
            "click",
            () => {

                currentPage++;


                showProducts();

                createPagination();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );


        pagination.appendChild(
            nextButton
        );

    }

}