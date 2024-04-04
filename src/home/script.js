function installCartFeature() {
  const cartButton = document.querySelector("#cart-button");

  const dialog = document.createElement("dialog");
  dialog.classList.add("dialog");

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
  </div>
  `;
  const closeButton = dialog.querySelector("#close");
  const dialogContent = dialog.children[0];
  document.body.appendChild(dialog);

  const closeDialog = () => {
    dialog.close();
  };

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
