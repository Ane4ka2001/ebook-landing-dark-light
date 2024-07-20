const CART_STORE = {
  // Создание области памяти где лежат элементы и характеристики
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
  // Генерируем HTML на основе объекта книги
  getBookHtml: (book) => {
    const result = `<div>${book.name} $${book.price}</div>`;

    return result;
  },
  // Удаляем книгу
  remove: (itemIndex) => {
    console.log("Удалить книжку", itemIndex);
  },
  // Считаем стоимость всех книг
  getTotal() {
    let sum = 0;

    for (let i = 0; i < this.items.length; i++) {
      sum = sum + this.items[i].price;
    }
    return sum;
  },
  /** Генерируем HTML для всех книг в корзине */
  getCardsHTML() {
    const bookCards = this.items.map(this.getBookHtml).join("");
    return bookCards;
  },
};

function installCartFeature() {
  // Создаем элемент диалога с пользователем
  const dialog = document.createElement("dialog");
  // Навешиваем CSS класс на этот диалог
  dialog.classList.add("dialog");

  // Формируем внешний вид диалога корзины
  const bookCardsHTML = CART_STORE.getCardsHTML();
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
    <div class="dialog-main">${bookCardsHTML}</div>
    <div class="dialog-footer">
      <div>
        <span>Sub-Total</span>
        <strong>$ ${cartTotal} USD</strong>
      </div>
      <button class="dialog-checkout" id="checkout">Continue to Checkout</button>
    </div>
  </div>`;
  document.body.appendChild(dialog);
  // Закончили формировать, вставили в документ

  // Находим кнопку закрытия диалога
  const closeButton = dialog.querySelector("#close");
  // Создаем функцию закрытия диалога
  const closeDialog = () => {
    dialog.close();
  };
  // Закрываем диалог при клике на кнопку закрытия
  closeButton.addEventListener("click", closeDialog);
  // Закрыть диалог при клике на диалог
  dialog.addEventListener("click", closeDialog);
  // Достаем первого ребенка-элемента "диалога"
  const dialogContent = dialog.children[0];
  // При клике не разрешаем слушать событие никому выше dialogContent
  dialogContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Находим кнопку "Продолжить покупки"
  const checkoutButton = dialog.querySelector("#checkout");
  // При клике на нее закрываем диалог
  checkoutButton.addEventListener("click", closeDialog);

  // Находим кнопку корзины
  const cartButton = document.querySelector("#cart-button");
  // Создаем функцию открытия диалога
  const cartButtonClickListener = () => {
    dialog.showModal();
  };
  // При клике на корзину открываем диалог
  cartButton.addEventListener("click", cartButtonClickListener);
}

function main() {
  installCartFeature();
}

document.addEventListener("DOMContentLoaded", main);
