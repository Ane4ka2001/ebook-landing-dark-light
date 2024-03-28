function installCartFeature() {
    const cartButton = document.querySelector("#cart-button");
    const cartButtonClickListener = () => {
        console.log("Кликнул")
    };
    console.log(cartButton);
    cartButton.addEventListener("click", cartButtonClickListener);
}

function main() {
    installCartFeature();
}

document.addEventListener("DOMContentLoaded", main)
