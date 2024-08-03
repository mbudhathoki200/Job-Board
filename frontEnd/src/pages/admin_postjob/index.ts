const modal = document.getElementById("modal") as HTMLDivElement;

const modalCloseBtn = document.getElementById(
  "btn--close-modal",
) as HTMLButtonElement;
const modalOpenBtn = document.getElementById(
  "btn--open-modal",
) as HTMLButtonElement;

modalCloseBtn.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

modalOpenBtn.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});
