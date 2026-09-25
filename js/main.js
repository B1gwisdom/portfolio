/* ==========================================================================
   main.js — 主题切换、导航交互、移动端菜单、滚动状态
   ========================================================================== */

(function () {
  /* ---------- 深浅色主题 ---------- */
  const THEME_KEY = "portfolio-theme";
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");

  /* localStorage 在隐私模式等场景可能不可用，读写失败时不影响页面 */
  function readTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (err) { return null; }
  }
  function saveTheme(theme) {
    try { localStorage.setItem(THEME_KEY, theme); } catch (err) { /* 忽略写入失败 */ }
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", isDark ? "切换浅色主题" : "切换深色主题");
    }
  }

  /* 首次访问默认浅色，之后沿用用户上一次的选择 */
  applyTheme(readTheme() === "dark" ? "dark" : "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      saveTheme(next);
    });
  }

  /* ---------- 导航交互 ---------- */
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