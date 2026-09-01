const dataUrlforproduct = "../data/products.json";

const productDetails = document.getElementById("product_details");
const productName = document.querySelector(".product_name");

const headerWrapper = document.querySelector(".bottom_header_wrapper");
const headerTop = headerWrapper.offsetTop;
const header = document.querySelector(".bottom_header");

const urlParams = new URLSearchParams(window.location.search);
const productId = Number(urlParams.get("id"));

window.addEventListener("scroll", () => {

    if (window.scrollY >= headerTop) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

});

fetch(dataUrlforproduct)
    .then(response => response.json())
    .then(products => {

        const product = products.find(item => item.id === productId);

        if (!product) {

            productDetails.innerHTML = `
                <h2>Product not found</h2>
            `;

            return;
        }

        productName.textContent = product.name;

        productDetails.innerHTML = `

            <div class="container_of_img_and_information">

                <div class="product_image">

                    <img 
                        src="${product.image_address}" 
                        alt="${product.name}"
                    >

                </div>

                <div class="product_information">

                    <h1>
                        ${product.name}
                    </h1>

                    <div class="product_rating">

                        ${product.rate !== 0
                ? `
                                ${product.rate.toFixed(1)}

                                <img 
                                    src="../Product-image/icons8-star-20.png" 
                                    alt="star"
                                >
                            `
                : ""
            }

                    </div>

                    <div class="product_price">

                        ${product.discount
                ? `
                                <span class="old_price">
                                    $${product.old_price.toFixed(2)}
                                </span>

                                <span class="current_price">
                                    $${product.price.toFixed(2)}
                                </span>
                            `
                : `
                                <span class="current_price">
                                    $${product.price.toFixed(2)}
                                </span>
                            `
            }

                        <span class="slash_product">
                            /
                        </span>

                        <span class="count_of_product">
                            ${product.weight}
                        </span>

                    </div>

                    <div class="product_quantity">

                        <div class="product_count_for_shop">

                            <span class="quantity_minus">
                                −
                            </span>

                            <span class="quantity_number">
                                1
                            </span>

                            <span class="quantity_plus">
                                +
                            </span>

                        </div>

                        <button class="add_to_cart">
                            Add to cart
                        </button>

                        <span class="wishlist_product">

                            <img 
                                src="../images/icons8-heart-20.png"
                                alt="wishlist"
                            >

                        </span>

                    </div>

                    <div class="product_nutrition">

                        <div class="nutrition_item">

                            <span class="nutrition_title">
                                Calories
                            </span>

                            <span class="nutrition_value">
                                ${product.calories} kcal
                            </span>

                        </div>

                        <div class="nutrition_item">

                            <span class="nutrition_title">
                                Proteins
                            </span>

                            <span class="nutrition_value">
                                ${product.protein} g
                            </span>

                        </div>

                        <div class="nutrition_item">

                            <span class="nutrition_title">
                                Fats
                            </span>

                            <span class="nutrition_value">
                                ${product.fats} g
                            </span>

                        </div>

                        <div class="nutrition_item">

                            <span class="nutrition_title">
                                Carbohydrates
                            </span>

                            <span class="nutrition_value">
                                ${product.carbohydrates} g
                            </span>

                        </div>

                    </div>

                    <div class="general_info">

                        <h2>
                            General info
                        </h2>

                        <div class="general_info_line">

                            <div>
                                Shelf life
                            </div>

                            <div class="color_for_div">
                                ${product.shelf_life} days
                            </div>

                        </div>

                        <div class="general_info_line">

                            <div>
                                Storage temperature
                            </div>

                            <div class="color_for_div">
                                ${product.storage_temperature}
                            </div>

                        </div>

                        <div class="general_info_line">

                            <div>
                                Country
                            </div>

                            <div class="color_for_div">
                                ${product.country}
                            </div>

                        </div>

                        <div class="general_info_line">

                            <div>
                                Genus-species
                            </div>

                            <div class="color_for_div">
                                ${product.genus_species}
                            </div>

                        </div>

                        <div class="general_info_line">

                            <div>
                                Method
                            </div>

                            <div class="color_for_div">
                                ${product.method}
                            </div>

                        </div>

                    </div>

                    <div class="general_info">

                        <h2>
                            Nutrition facts, 100 g
                        </h2>

                        <div class="general_info_line">

                            <div>
                                Calories
                            </div>

                            <div class="color_for_div">
                                ${product.calories}
                            </div>

                        </div>

                        <div class="general_info_line">

                            <div>
                                Proteins
                            </div>

                            <div class="color_for_div">
                                ${product.protein}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        `;

        const relatedProductsContainer = document.getElementById("relatedProductsContainer");

        const relatedProducts = products.filter(item =>
            item.categories === product.categories &&
            item.id !== product.id
        );

        relatedProducts.forEach(relatedProduct => {

            const productWrapper = document.createElement("div");

            productWrapper.classList.add("discount_product_wrapper");

            const productBox = document.createElement("div");

            productBox.classList.add("discount_product_box");

            productBox.innerHTML = `
        <div class="discount_product_image">

            <img
                src="${relatedProduct.image_address}"
                alt="${relatedProduct.name}"
            >

        </div>

        <div class="discount_product_info">

            <div class="title_of_discount_box">

                <h3>${relatedProduct.name}</h3>

                <div class="div_img_of_discount_box">

                    <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Gluten-free-symbol.svg">

                    <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Kosher-symbol.svg">

                    <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Vegan-symbol.svg">

                </div>

            </div>

            <div class="discount_product_price">

                ${relatedProduct.discount
                    ? `
                        <span class="old_price">
                            $${relatedProduct.old_price.toFixed(2)}
                        </span>

                        <span class="current_price">
                            $${relatedProduct.price.toFixed(2)}
                        </span>
                    `
                    : `
                        <span class="current_price">
                            $${relatedProduct.price.toFixed(2)}
                        </span>
                    `
                }

                <span class="slash_product">
                    /
                </span>

                <span class="count_of_product">
                    ${relatedProduct.weight}
                </span>

                <span class="rate">

                    ${relatedProduct.rate !== 0
                    ? `
                            ${relatedProduct.rate.toFixed(1)}
                            <img
                                src="../Product-image/icons8-star-20.png"
                                alt="star"
                            >
                        `
                    : ""
                }

                </span>

            </div>

        </div>
    `;

            const actions = document.createElement("div");

            actions.classList.add("discount_product_actions");

            actions.innerHTML = `
        <div class="product_quantity">

            <button class="quantity_minus">
                −
            </button>

            <span class="quantity_number">
                1
            </span>

            <button class="quantity_plus">
                +
            </button>

        </div>

        <button class="add_to_cart">
            Add to cart
        </button>
    `;

            productBox.appendChild(actions);

            productBox.addEventListener("click", () => {
                window.location.href = `product.html?id=${relatedProduct.id}`;
            });

            productWrapper.appendChild(productBox);

            relatedProductsContainer.appendChild(productWrapper);

        });

    })
    .catch(error => {

        console.error(
            "Error loading product:",
            error
        );

    });