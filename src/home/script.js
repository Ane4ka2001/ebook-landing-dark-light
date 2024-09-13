const DEFAULT_BOOKS = [
  {
    name: "Atomic One’s 2",
    price: 30,
    count: 2,
    imageSrc: "./Book-2.png",
  },
  {
    name: "Atomic One’s",
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
];

// Пробуем достать из хранилища книги
const booksFromStorage = localStorage.getItem("books");

// В хранилище все лежит как строка. "Парсим" строку обратно в массив
let booksFromStorageParsed;
if (!!booksFromStorage) {
  booksFromStorageParsed = JSON.parse(booksFromStorage);
} else {
  booksFromStorageParsed = DEFAULT_BOOKS;
  // Если в хранилище ничего нет - добавляем туда дефолтные книжки
  localStorage.setItem("books", JSON.stringify(DEFAULT_BOOKS));
}
const CART_STORE = {
  // Создание области памяти где лежат элементы и характеристики
  items: booksFromStorageParsed,
  // Генерируем HTML на основе объекта книги
  getBookHtml: function getBookHtml(book, bookIndex) {
    const total = book.price * book.count;

    const result = `<div class="cart-body">
      <img src="${book.imageSrc}" alt="Image" height="175px" width="130px" />
      <div>
        <p class="book-name">${book.name}</p>
        <p class="book-total">$${total.toFixed(2)} USD</p>
      </div>
      <input disabled value="${book.count}" class="book-count" />
      <button id="remove-button" class="dialog-remove-button" data-bookindex="${bookIndex}">Remove</button>
    </div>`;

    return result;
  },
  // Удаляем книгу
  remove(indexToRemove) {
    this.items = this.items.filter((book, bookIndex) => {
      const shouldOstavit = bookIndex !== indexToRemove;
      return shouldOstavit;
    });

    // Берем все актуальные книги из корзины и сохраняем в хранилище
    localStorage.setItem("books", JSON.stringify(this.items));
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
  // Вставили в документ
  document.body.appendChild(dialog);

  // Формируем внешний вид диалога корзины
  const renderCart = () => {
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
        <span class="dialog-footer-sub-total">Sub-Total</span>
        <strong class="dialog-footer-sub-total-sum">$ ${cartTotal} USD</strong>
      </div>
      <button class="dialog-checkout" id="checkout">Continue to Checkout</button>
    </div>
  </div>`;
    dialog.querySelectorAll("#remove-button").forEach((removeButton) => {
      removeButton.addEventListener("click", () => {
        const bookIndexString = removeButton.getAttribute("data-bookindex");
        const bookIndex = Number(bookIndexString);
        CART_STORE.remove(bookIndex);
        renderCart();
      });
    });

    // Достаем первого ребенка-элемента "диалога"
    const dialogContent = dialog.children[0];
    // При клике не разрешаем слушать событие никому выше dialogContent
    dialogContent.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  };

  renderCart();

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


  function main() {
    installCartFeature();
  }

  document.addEventListener("DOMContentLoaded", main);
