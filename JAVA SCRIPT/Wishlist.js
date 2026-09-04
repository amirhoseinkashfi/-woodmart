const wishlistProducts =
    document.getElementById("wishlistProducts");

const emptyWishlist =
    document.getElementById("emptyWishlist");


// ======================
// GET WISHLIST
// ======================

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];


// ======================
// FETCH PRODUCTS
// ======================

fetch("../data/products.json")

    .then(response => response.json())

    .then(products => {


        // ======================
        // CHECK EMPTY WISHLIST
        // ======================

        if (wishlist.length === 0) {

            emptyWishlist.style.display = "flex";

            wishlistProducts.style.display = "none";

            return;

        }


        // ======================
        // SHOW WISHLIST
        // ======================

        emptyWishlist.style.display = "none";

        wishlistProducts.style.display = "grid";


        // ======================
        // FIND WISHLIST PRODUCTS
        // ======================

        const wishlistItems =
            products.filter(product =>
                wishlist.includes(product.id)
            );


        // ======================
        // CREATE PRODUCTS
        // ======================

        wishlistItems.forEach(product => {


            const productWrapper =
                document.createElement("div");


            productWrapper.classList.add(
                "products_product_wrapper"
            );


            const productBox =
                document.createElement("div");


            productBox.classList.add(
                "products_product_box"
            );


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

                        ${product.discount

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

                            ${product.rate !== 0

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
            const removeWishlist =
                document.createElement("button");

            removeWishlist.classList.add(
                "remove_from_wishlist"
            );

            removeWishlist.innerHTML = "×";

            removeWishlist.addEventListener("click", (event) => {

                event.stopPropagation();

                wishlist =
                    wishlist.filter(id => id !== product.id);

                localStorage.setItem(
                    "wishlist",
                    JSON.stringify(wishlist)
                );

                productWrapper.remove();

                if (wishlist.length === 0) {
                    emptyWishlist.style.display = "flex";
                    wishlistProducts.style.display = "none";
                }

            });

            productBox.appendChild(removeWishlist);

            

            // ======================
            // PRODUCT CLICK
            // ======================

            productBox.addEventListener(
                "click",
                () => {

                    window.location.href =
                        `product.html?id=${product.id}`;

                }
            );


            // ======================
            // ADD TO DOM
            // ======================

            productWrapper.appendChild(productBox);

            wishlistProducts.appendChild(productWrapper);

        });

    })


    // ======================
    // ERROR
    // ======================

    .catch(error => {

        console.error(
            "Error loading wishlist:",
            error
        );

    });


