const header = document.getElementById("bottomHeader");
const headerWrapper = document.querySelector(".bottom_header_wrapper");
const headerTop = headerWrapper.offsetTop;
const searchBox = document.getElementById("searchBox");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const weeklySlider = document.querySelector(".weekly_discount_slider");
const weeklyDiscountTrack = document.querySelector(".weekly_discount_track");
const fruitProductsTrack =
    document.querySelector(".fruit_products_track");
const data_url = "./data/products.json";
const weeklyScrollbarDiscount =
    document.querySelector(".slider_scrollbar_discount");

const discountProgress =
    document.querySelector(".slider_scrollbar_progress_discount");



let isDragging = false;
let startX = 0;
let startScrollLeft = 0;

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

const track = document.querySelector(".products_track");
const progressBar = document.querySelector(".slider_scrollbar_progress");

track.addEventListener("scroll", () => {

    const maxScroll = track.scrollWidth - track.clientWidth;

    const scrollPercentage = track.scrollLeft / maxScroll;

    const maxMove = 75;

    progressBar.style.transform =
        `translateX(${scrollPercentage * maxMove}%)`;
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


// HORIZONTAL SCROLL BAR FOR ITEMS


weeklySlider.addEventListener("mousedown", (e) => {

    if (e.button !== 0) return;

    isDragging = true;

    startX = e.pageX;

    startScrollLeft = weeklySlider.scrollLeft;

    weeklySlider.classList.add("dragging");

});


weeklySlider.addEventListener("mousemove", (e) => {

    if (!isDragging || e.buttons !== 1) return;

    e.preventDefault();

    const x = e.pageX;

    const distance = x - startX;

    weeklySlider.scrollLeft =
        startScrollLeft - distance;

});


window.addEventListener("mouseup", (e) => {

    if (e.button !== 0) return;

    isDragging = false;

    weeklySlider.classList.remove("dragging");

});



weeklySlider.addEventListener("scroll", () => {

    const maxScroll =
        weeklySlider.scrollWidth - weeklySlider.clientWidth;

    if (maxScroll <= 0) {
        discountProgress.style.width = "100%";
        discountProgress.style.transform = "translateX(0)";
        return;
    }

    const progressWidth =
        (weeklySlider.clientWidth / weeklySlider.scrollWidth) * 100;

    discountProgress.style.width =
        `${progressWidth}%`;

    const scrollbarWidth =
        weeklyScrollbarDiscount.clientWidth;

    const progressPixelWidth =
        scrollbarWidth * (progressWidth / 100);

    const maxMove =
        scrollbarWidth - progressPixelWidth;

    const move =
        (weeklySlider.scrollLeft / maxScroll) * maxMove;

    discountProgress.style.transform =
        `translateX(${move}px)`;
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

