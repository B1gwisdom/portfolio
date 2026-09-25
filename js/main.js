/* ==========================================================================
   main.js — 导航交互、移动端菜单、滚动状态
   ========================================================================== */

(function () {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  /* 移动端菜单开关 */
  function closeMenu() {
    navToggle.classList.remove("is-open");
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "打开菜单");
  }
  function openMenu() {
    navToggle.classList.add("is-open");
    navLinks.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "关闭菜单");
  }

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  /* 点击链接 / 键盘回车后关闭菜单 */
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* 鼠标点击菜单外关闭 */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-nav")) closeMenu();
    preventIfLink(e);
  });
  function preventIfLink(e) {
    const el = e.target.closest('a[href="#"]');
    if (el) e.preventDefault();
  }

  /* 导航吸顶后加实底，突出层次 */
  const header = document.getElementById("siteNav");
  const onScroll = () => {
    header.classList.toggle("site-nav--solid", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();