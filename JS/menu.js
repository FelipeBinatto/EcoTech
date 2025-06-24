document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menuList = document.getElementById("menu-list");
  const chk = document.getElementById("chk");

  // Hamburguer menu
  toggle.addEventListener("click", () => {
    menuList.classList.toggle("show");
  });

})