const minPrice = document.getElementById("min_price");
const maxPrice = document.getElementById("max_price");

const minPriceValue = document.getElementById("min_price_value");
const maxPriceValue = document.getElementById("max_price_value");

const priceProgress = document.querySelector(".price_slider_progress");


function updatePriceSlider() {

    let min = Number(minPrice.value);
    let max = Number(maxPrice.value);

    // اجازه نمی‌دهیم MIN از MAX رد شود
    if (min > max) {
        min = max;
        minPrice.value = min;
    }

    const minPercent = (min / 130) * 100;
    const maxPercent = (max / 130) * 100;

    priceProgress.style.left = minPercent + "%";
    priceProgress.style.right = (100 - maxPercent) + "%";

    minPriceValue.textContent = "$" + min;
    maxPriceValue.textContent = "$" + max;
}


minPrice.addEventListener("input", updatePriceSlider);
maxPrice.addEventListener("input", updatePriceSlider);


updatePriceSlider();