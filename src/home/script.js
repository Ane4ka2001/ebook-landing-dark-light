function installCartFeature() {
  const cartButton = document.querySelector("#cart-button");

  const dialog = document.createElement("dialog");

  dialog.innerHTML = "<div>Что-то</div>";
  const dialogContent = dialog.children[0];
  document.body.appendChild(dialog);

  dialog.addEventListener("click", () => {
    dialog.close();
  });
  dialogContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  const cartButtonClickListener = () => {
    dialog.showModal();
  };
  dialog.showModal();

  cartButton.addEventListener("click", cartButtonClickListener);
}

function main() {
  installCartFeature();
}

document.addEventListener("DOMContentLoaded", main);
