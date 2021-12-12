window.addEventListener("DOMContentLoaded", () => {
  const headerMobileButton = document.querySelector("#header-mobile-toggle");
  const headerContent = document.querySelector("#header-menu");

  headerMobileButton.addEventListener("click", () => {
    headerContent.classList.toggle("hidden");
  });
});
