// =====================================================
//                    PRICE SLIDER
// =====================================================

const minPrice =
    document.getElementById("min_price");

const maxPrice =
    document.getElementById("max_price");

const minPriceValue =
    document.getElementById("min_price_value");

const maxPriceValue =
    document.getElementById("max_price_value");

const priceProgress =
    document.querySelector(".price_slider_progress");

const filterPriceButton =
    document.getElementById("filter_price_button");


// =====================================================
//                  FILTER VARIABLES
// =====================================================

// Category انتخاب شده
let selectedCategory = null;


// Country های انتخاب شده
let selectedCountries = [];




// =====================================================
//                UPDATE PRICE SLIDER
// =====================================================

function updatePriceSlider() {

    if (
        !minPrice ||
        !maxPrice ||
        !minPriceValue ||
        !maxPriceValue ||
        !priceProgress
    ) {
        return;
    }


    let min =
        Number(minPrice.value);

    let max =
        Number(maxPrice.value);


    // جلوگیری از عبور MIN از MAX

    if (min > max) {

        min = max;

        minPrice.value = min;

    }


    // تبدیل قیمت به درصد

    const minPercent =
        (min / 130) * 100;

    const maxPercent =
        (max / 130) * 100;


    // Progress Bar

    priceProgress.style.left =
        minPercent + "%";

    priceProgress.style.right =
        (100 - maxPercent) + "%";


    // نمایش قیمت

    minPriceValue.textContent =
        "$" + min;

    maxPriceValue.textContent =
        "$" + max;

}


// =====================================================
//                    PRICE EVENTS
// =====================================================

if (minPrice) {

    minPrice.addEventListener(
        "input",
        updatePriceSlider
    );

}


if (maxPrice) {

    maxPrice.addEventListener(
        "input",
        updatePriceSlider
    );

}


updatePriceSlider();



// =====================================================
//                  CATEGORY FILTER
// =====================================================

const categoryLinks =
    document.querySelectorAll(
        ".filters_category_list a"
    );


// =====================================================
//                CATEGORY COUNTS
// =====================================================

function updateCategoryCounts() {

    categoryLinks.forEach(link => {

        const category =
            link.dataset.category;


        const count =
            originalProducts.filter(product => {

                return product.categories ===
                    category;

            }).length;


        const countElement =
            link.parentElement.querySelector(
                ".count"
            );


        if (countElement) {

            countElement.textContent =
                count;

        }

    });

}


// =====================================================
//                  APPLY ALL FILTERS
// =====================================================

function applyFilters() {

    // شروع از تمام محصولات اصلی

    let filteredProducts =
        [...originalProducts];


    // =================================================
    // CATEGORY
    // =================================================

    if (selectedCategory) {

        filteredProducts =
            filteredProducts.filter(product => {

                return product.categories ===
                    selectedCategory;

            });

    }


    // =================================================
    // PRICE
    // =================================================

    const min =
        Number(minPrice?.value ?? 0);

    const max =
        Number(maxPrice?.value ?? 130);


    filteredProducts =
        filteredProducts.filter(product => {

            const price =
                Number(product.price);


            return (
                price >= min &&
                price <= max
            );

        });


    // =================================================
    // COUNTRY
    // =================================================

    if (selectedCountries.length > 0) {

        filteredProducts =
            filteredProducts.filter(product => {

                return selectedCountries.includes(
                    product.country
                );

            });

    }


    // =================================================
    // UPDATE PRODUCTS
    // =================================================

    allProducts =
        filteredProducts;


    // برگشت به صفحه اول

    currentPage = 1;


    // نمایش محصولات

    showProducts();


    // ساخت Pagination

    createPagination();

}


// =====================================================
//                  CATEGORY CLICK
// =====================================================

categoryLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();


            // Category انتخاب شده

            selectedCategory =
                link.dataset.category;


            // Active

            categoryLinks.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            link.classList.add(
                "active"
            );


            // اعمال همه فیلترها

            applyFilters();

        }
    );

});



// =====================================================
//                    PRICE BUTTON
// =====================================================

if (filterPriceButton) {

    filterPriceButton.addEventListener(
        "click",
        () => {

            applyFilters();

        }
    );

}



// =====================================================
//                   COUNTRY FILTER
// =====================================================


// گرفتن تمام Checkbox های Country

const countryCheckboxes =
    document.querySelectorAll(
        ".checkbox_list input[type='checkbox']"
    );


// اضافه کردن Event

countryCheckboxes.forEach(checkbox => {

    checkbox.addEventListener(
        "change",
        () => {

            // خالی کردن لیست

            selectedCountries = [];


            // پیدا کردن Checkbox های فعال

            countryCheckboxes.forEach(item => {

                if (item.checked) {

                    selectedCountries.push(
                        item.value
                    );

                }

            });


            // اعمال همه فیلترها

            applyFilters();

        }
    );

});



// =====================================================
//                PRODUCTS LOADED
// =====================================================

document.addEventListener(
    "productsLoaded",
    () => {

        updateCategoryCounts();

    }
);