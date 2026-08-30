const header = document.getElementById("bottomHeader");
const headerWrapper = document.querySelector(".bottom_header_wrapper");
const headerTop = headerWrapper.offsetTop;
const fruitProductsTrack = document.querySelector(".fruit_products_track");
const weeklyDiscountTrack = document.querySelector(".weekly_discount_track");
const seafoodproductstrack = document.querySelector(".seafood_products_track")
const bakeryproduct = document.querySelector(".bakery_products_track")
const veganmeat = document.querySelector(".vegan_meat_products_track")
const data_url = "../data/products.json";
const topFooterContent = document.getElementById("topFooterContent");
const topFooterButton = document.getElementById("topFooterButton");




// ======================HEADER
window.addEventListener("scroll", () => {

    if (window.scrollY >= headerTop) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

});



// =============WEEKLY DISCOUNT

fetch(data_url)
    .then(response => response.json())
    .then(products => {

        const discountProducts = products
            .filter(product => product.discount === true)
            .slice(0, 8);

        discountProducts.forEach(product => {

            const productWrapper = document.createElement("div");

            productWrapper.classList.add("discount_product_wrapper");


            const productBox = document.createElement("div");

            productBox.classList.add("discount_product_box");


            productBox.innerHTML = `
            <div class="discount_product_image">
        
                <img 
                    src="${product.image_address}" 
                    alt=""
                >
        
            </div>
        
            <div class="discount_product_info">
        
                <div class="title_of_discount_box">
        
                    <h3>${product.name}</h3>
        
                    <div class="div_img_of_discount_box">
        
                        <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Gluten-free-symbol.svg" alt="">
        
                        <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Kosher-symbol.svg" alt="">
        
                        <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Vegan-symbol.svg" alt="">
        
                    </div>
        
                </div>
        
                <div class="discount_product_price">
        
                    <span class="old_price">
                        $${product.old_price.toFixed(2)}
                    </span>
        
                    <span class="current_price">
                        $${product.price.toFixed(2)}
                    </span>
                    
                    <span class = "slash_product">
                    /
                    </span>

                    <span class = "count_of_product">
                        ${product.weight}
                    </span>

                    <span class="rate">
                        ${product.rate !== 0
                    ? `${product.rate.toFixed(1)} <img src="../Product-image/icons8-star-20.png" alt="star">`
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

            productWrapper.appendChild(productBox);

            weeklyDiscountTrack.appendChild(productWrapper);

        });

    })
    .catch(error => {

        console.error("Error loading products:", error);

    });


// ============FRUIT AND VEGETABLE

fetch(data_url)
    .then(response => response.json())
    .then(products => {
        const Fruits_Products = products
            .filter(product => product.categories === "Vegetables & Fruits")
            .slice(0, 8);

        Fruits_Products.forEach(product => {
            const productWrapper = document.createElement("div");

            productWrapper.classList.add("discount_product_wrapper");


            const productBox = document.createElement("div");

            productBox.classList.add("discount_product_box");

            productBox.innerHTML = `
            <div class="discount_product_image">
        
                <img 
                    src="${product.image_address}" 
                    alt=""
                >
        
            </div>
        
            <div class="discount_product_info">
        
                <div class="title_of_discount_box">
        
                    <h3>${product.name}</h3>
        
                    <div class="div_img_of_discount_box">
        
                        <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Gluten-free-symbol.svg" alt="">
        
                        <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Kosher-symbol.svg" alt="">
        
                        <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Vegan-symbol.svg" alt="">
        
                    </div>
        
                </div>
        
                <div class="discount_product_price">
        
                    <span class="old_price">
                        $${product.old_price.toFixed(2)}
                    </span>
        
                    <span class="current_price">
                        $${product.price.toFixed(2)}
                    </span>
                    
                    <span class = "slash_product">
                    /
                    </span>

                    <span class = "count_of_product">
                        ${product.weight}
                    </span>

                    <span class="rate">
                        ${product.rate !== 0
                    ? `${product.rate.toFixed(1)} <img src="../Product-image/icons8-star-20.png" alt="star">`
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

            productWrapper.appendChild(productBox);

            fruitProductsTrack.appendChild(productWrapper);

        });



    })

// CREATING SEAFOOD BOXES
fetch(data_url)
    .then(response => response.json())
    .then(products => {
        const seafood_product = products
            .filter(product => product.categories === "Seafood")
            .slice(0, 8);

        seafood_product.forEach(product => {
            const productWrapper = document.createElement("div");

            productWrapper.classList.add("discount_product_wrapper");


            const productBox = document.createElement("div");

            productBox.classList.add("discount_product_box");

            productBox.innerHTML = `
            <div class="discount_product_image">
        
                <img 
                    src="${product.image_address}" 
                    alt=""
                >
        
            </div>
        
            <div class="discount_product_info">
        
                <div class="title_of_discount_box">
        
                    <h3>${product.name}</h3>
        
                    <div class="div_img_of_discount_box">
        
                        <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Gluten-free-symbol.svg" alt="">
        
                        <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Kosher-symbol.svg" alt="">
        
                        <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Vegan-symbol.svg" alt="">
        
                    </div>
        
                </div>
        
                <div class="discount_product_price">
        
                    <span class="old_price">
                        $${product.old_price.toFixed(2)}
                    </span>
        
                    <span class="current_price">
                        $${product.price.toFixed(2)}
                    </span>
                    
                    <span class = "slash_product">
                    /
                    </span>

                    <span class = "count_of_product">
                        ${product.weight}
                    </span>

                    <span class="rate">
                        ${product.rate !== 0
                    ? `${product.rate.toFixed(1)} <img src="../Product-image/icons8-star-20.png" alt="star">`
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

            productWrapper.appendChild(productBox);

            seafoodproductstrack.appendChild(productWrapper);

        });



    })


// CREATING BAKERY BOXES

fetch(data_url)
    .then(res => res.json())
    .then(products => {
        const seafood_product = products
            .filter(product => product.categories === "Bakery")
            .slice(0, 8);

        seafood_product.forEach(product => {
            const productWrapper = document.createElement("div");

            productWrapper.classList.add("discount_product_wrapper");


            const productBox = document.createElement("div");

            productBox.classList.add("discount_product_box");

            productBox.innerHTML = `
    <div class="discount_product_image">

        <img 
            src="${product.image_address}" 
            alt=""
        >

    </div>

    <div class="discount_product_info">

        <div class="title_of_discount_box">

            <h3>${product.name}</h3>

            <div class="div_img_of_discount_box">

                <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Gluten-free-symbol.svg" alt="">

                <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Kosher-symbol.svg" alt="">

                <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Vegan-symbol.svg" alt="">

            </div>

        </div>

        <div class="discount_product_price">

            <span class="old_price">
                $${product.old_price.toFixed(2)}
            </span>

            <span class="current_price">
                $${product.price.toFixed(2)}
            </span>
            
            <span class = "slash_product">
            /
            </span>

            <span class = "count_of_product">
                ${product.weight}
            </span>

            <span class="rate">
                ${product.rate !== 0
                    ? `${product.rate.toFixed(1)} <img src="../Product-image/icons8-star-20.png" alt="star">`
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

            productWrapper.appendChild(productBox);

            bakeryproduct.appendChild(productWrapper);

        });

    })

// CREATING VEGAN MEAT BOXES

fetch(data_url)
    .then(res => res.json())
    .then(products => {
        const seafood_product = products
            .filter(product => product.categories === "Vegan Meat")
            .slice(0, 8);

        seafood_product.forEach(product => {
            const productWrapper = document.createElement("div");

            productWrapper.classList.add("discount_product_wrapper");


            const productBox = document.createElement("div");

            productBox.classList.add("discount_product_box");

            productBox.innerHTML = `
    <div class="discount_product_image">

        <img 
            src="${product.image_address}" 
            alt=""
        >

    </div>

    <div class="discount_product_info">

        <div class="title_of_discount_box">

            <h3>${product.name}</h3>

            <div class="div_img_of_discount_box">

                <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Gluten-free-symbol.svg" alt="">

                <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Kosher-symbol.svg" alt="">

                <img src="https://woodmart.xtemos.com/vegetables/wp-content/uploads/sites/20/2026/07/Vegan-symbol.svg" alt="">

            </div>

        </div>

        <div class="discount_product_price">

            <span class="old_price">
                $${product.old_price.toFixed(2)}
            </span>

            <span class="current_price">
                $${product.price.toFixed(2)}
            </span>
            
            <span class = "slash_product">
            /
            </span>

            <span class = "count_of_product">
                ${product.weight}
            </span>

            <span class="rate">
                ${product.rate !== 0
                    ? `${product.rate.toFixed(1)} <img src="../Product-image/icons8-star-20.png" alt="star">`
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

            productWrapper.appendChild(productBox);

            veganmeat.appendChild(productWrapper);

        });

    })


// HIDE/SHOW THE TOP FOOTER

topFooterButton.addEventListener("click", () => {

    topFooterContent.classList.toggle("expanded");

});