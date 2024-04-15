const CART_STORE = {
  items: [
    {
      name: "Atomic One’s",
      price: 30,
      count: 1,
      imageSrc: "./Book-2.png",
    },
    {
      name: "Atomic One’s 2",
      price: 30,
      count: 1,
      imageSrc: "./Book-2.png",
    },
    {
      name: "Atomic One’s 3",
      price: 30,
      count: 1,
      imageSrc: "./Book-2.png",
    },
  ],
  getBookHtml: (book) => {
    const result = `<div>${book.name} $${book.price}</div>`;

    return result;
  },
  remove: (itemIndex) => {
    console.log("Удалить книжку", itemIndex);
  },
  getTotal() {
    let sum = 0;

    for (let i = 0; i < this.items.length; i++) {
      sum = sum + this.items[i].price;
    }
    return sum;
  },
  getCardsHTML() {
    const bookCards = this.items.map(this.getBookHtml).join("");
    return bookCards;
  },
};

function installCartFeature() {
  const cartButton = document.querySelector("#cart-button");

  const dialog = document.createElement("dialog");
  dialog.classList.add("dialog");

  const bookCards = CART_STORE.getCardsHTML();
  const cartTotal = CART_STORE.getTotal();
  dialog.innerHTML = `
  <div class='dialog-content'>
    <div class='dialog-header'>
      <p class='dialog-header-title'>Your cart</p>
      <button id="close" class='dialog-header-close'>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 1L1 21M21 21L1 1L21 21Z" stroke="#1B3764" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="dialog-main">${bookCards}</div>
    <div class="dialog-footer">
      <div>
        <span>Sub-Total</span>
        <strong>$ ${cartTotal} USD</strong>
      </div>
      <button class="dialog-checkout" id="checkout">Continue to Checkout</button>
    </div>
  </div>
  `;
  const closeButton = dialog.querySelector("#close");
  const dialogContent = dialog.children[0];
  document.body.appendChild(dialog);

  const closeDialog = () => {
    dialog.close();
  };

  const checkoutButton = dialog.querySelector("#checkout");
  checkoutButton.addEventListener("click", closeDialog);

  dialog.addEventListener("click", closeDialog);
  closeButton.addEventListener("click", closeDialog);
  dialogContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  const cartButtonClickListener = () => {
    dialog.showModal();
  };

  cartButton.addEventListener("click", cartButtonClickListener);
}

function main() {
  installCartFeature();
}

document.addEventListener("DOMContentLoaded", main);
