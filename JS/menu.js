document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menuList = document.getElementById("menu-list");

  toggle.addEventListener("click", () => {
    menuList.classList.toggle("show");
  });
});