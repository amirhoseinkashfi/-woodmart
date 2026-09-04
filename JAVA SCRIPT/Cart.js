const cartProducts =
    document.getElementById("cartProducts");

const emptyCart =
    document.getElementById("emptyCart");


// ======================
// GET CART
// ======================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ======================
// SAVE CART
// ======================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ======================
// SHOW CART
// ======================

function showCart(products) {

    cartProducts.innerHTML = "";


    // ======================
    // CHECK EMPTY CART
    // ======================

    if (cart.length === 0) {

        emptyCart.style.display = "flex";

        cartProducts.style.display = "none";

        return;
    }


    // ======================
    // SHOW CART
    // ======================

    emptyCart.style.display = "none";

    cartProducts.style.display = "grid";


    // ======================
    // FIND CART PRODUCTS
    // ======================

    const cartItems =
        products.filter(product =>
            cart.some(item =>
                item.id === product.id
            )
        );


    // ======================
    // CREATE PRODUCTS
    // ======================

    cartItems.forEach(product => {

        const cartItem =
            cart.find(item =>
                item.id === product.id
            );


        const quantity =
            cartItem.quantity;


        const totalPrice =
            product.price * quantity;


        // ======================
        // WRAPPER
        // ======================

        const productWrapper =
            document.createElement("div");

        productWrapper.classList.add(
            "cart_product_wrapper"
        );


        // ======================
        // PRODUCT BOX
        // ======================

        const productBox =
            document.createElement("div");

        productBox.classList.add(
            "cart_product_box"
        );


        productBox.dataset.productId =
            product.id;


        // ======================
        // PRODUCT HTML
        // ======================

        productBox.innerHTML = `

            <div class="cart_product_image">

                <img
                    src="${product.image_address}"
                    alt="${product.name}"
                >

            </div>


            <div class="cart_product_info">

                <h3>
                    ${product.name}
                </h3>


                <div class="cart_product_price">

                    <span>
                        $${product.price.toFixed(2)}
                    </span>

                    <span class="cart_product_slash">
                        /
                    </span>

                    <span>
                        ${product.weight}
                    </span>

                </div>


                <div class="cart_product_quantity">

                    <button class="cart_quantity_minus">
                        −
                    </button>


                    <span class="cart_quantity_number">
                        ${quantity}
                    </span>


                    <button class="cart_quantity_plus">
                        +
                    </button>

                </div>


                <div class="cart_product_total">

                    Total:

                    <span>
                        $${totalPrice.toFixed(2)}
                    </span>

                </div>

            </div>


            <button class="remove_from_cart">
                ×
            </button>

        `;


        // ======================
        // PRODUCT CLICK
        // ======================

        productBox.addEventListener(
            "click",
            (event) => {

                // اگر روی quantity کلیک شد

                if (
                    event.target.closest(
                        ".cart_product_quantity"
                    )
                ) {
                    return;
                }


                // اگر روی remove کلیک شد

                if (
                    event.target.closest(
                        ".remove_from_cart"
                    )
                ) {
                    return;
                }


                // رفتن به صفحه محصول

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

        cartProducts.appendChild(
            productWrapper
        );

    });

}


// ======================
// FETCH PRODUCTS
// ======================

fetch("../data/products.json")

    .then(response => response.json())

    .then(products => {

        // نمایش Cart

        showCart(products);


        // ======================
        // CART BUTTONS
        // ======================

        cartProducts.addEventListener(
            "click",
            (event) => {


                // ======================
                // PLUS
                // ======================

                if (
                    event.target.classList.contains(
                        "cart_quantity_plus"
                    )
                ) {

                    event.stopPropagation();


                    const productBox =
                        event.target.closest(
                            ".cart_product_box"
                        );


                    const productId =
                        Number(
                            productBox.dataset.productId
                        );


                    const cartItem =
                        cart.find(item =>
                            item.id === productId
                        );


                    if (cartItem) {

                        cartItem.quantity++;

                    }


                    saveCart();


                    showCart(products);


                    return;
                }


                // ======================
                // MINUS
                // ======================

                if (
                    event.target.classList.contains(
                        "cart_quantity_minus"
                    )
                ) {

                    event.stopPropagation();


                    const productBox =
                        event.target.closest(
                            ".cart_product_box"
                        );


                    const productId =
                        Number(
                            productBox.dataset.productId
                        );


                    const cartItem =
                        cart.find(item =>
                            item.id === productId
                        );


                    if (
                        cartItem &&
                        cartItem.quantity > 1
                    ) {

                        cartItem.quantity--;

                    }


                    saveCart();


                    showCart(products);


                    return;
                }


                // ======================
                // REMOVE
                // ======================

                if (
                    event.target.classList.contains(
                        "remove_from_cart"
                    )
                ) {

                    event.stopPropagation();


                    const productBox =
                        event.target.closest(
                            ".cart_product_box"
                        );


                    const productId =
                        Number(
                            productBox.dataset.productId
                        );


                    // حذف محصول از Cart

                    cart =
                        cart.filter(item =>
                            item.id !== productId
                        );


                    // ذخیره Cart جدید

                    saveCart();


                    // نمایش دوباره Cart

                    showCart(products);


                    return;
                }

            }
        );

    })


// ======================
// ERROR
// ======================

    .catch(error => {

        console.error(
            "Error loading cart:",
            error
        );

    });