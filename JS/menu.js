document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menuList = document.getElementById("menu-list");
  const chk = document.getElementById("chk");

  // Hamburguer menu
  toggle.addEventListener("click", () => {
    menuList.classList.toggle("show");
  });

  // Dark mode toggle
  chk.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    // Salvar preferência
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("modo", "dark");
    } else {
      localStorage.setItem("modo", "light");
    }
  });

  // Carregar preferência
  if (localStorage.getItem("modo") === "dark") {
    document.body.classList.add("dark");
    chk.checked = true;
  }
});
