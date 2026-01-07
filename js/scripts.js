document.addEventListener("DOMContentLoaded", () => {
  // año automático (solo si existe #year)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // tema (oscuro/claro)
  const themeBtn = document.getElementById("themeBtn");
  const themeIcon = document.getElementById("themeIcon");
  const root = document.documentElement;

  // ✅ el icono que tú quieres para LIGHT
  const ICON_LIGHT = "bi-brightness-high-fill";
  // ✅ icono para DARK (elige uno que exista)
  const ICON_DARK = "bi-moon-fill"; // si no te gusta, cámbialo por otro BI

  function updateThemeVideo(isLight) {
    const video = document.getElementById("bgVideo");
    const source = document.getElementById("bgVideoSource");
    if (!video || !source) return;

    const nextSrc = isLight ? "media/herovideolight.mp4" : "media/herovideomoon.mp4";
    if (source.getAttribute("src") === nextSrc) return;

    source.setAttribute("src", nextSrc);

    // asegurar autoplay permitido
    video.muted = true;
    video.playsInline = true;

    video.load();
    video.play().catch(() => {});
  }

  function updateContactVideo(isLight) {
  const video = document.getElementById("contactVideo");
  const source = document.getElementById("contactVideoSource");
  if (!video || !source) return;

  const nextSrc = isLight
    ? "media/contactlight-video.mp4"
    : "media/contactmoon-video.mp4";

  if (source.getAttribute("src") === nextSrc) return;

  source.setAttribute("src", nextSrc);

  video.muted = true;
  video.playsInline = true;

  video.load();
  video.play().catch(() => {});
}


  function setTheme(theme) {
    const isLight = theme === "light";

    if (isLight) root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");

    // icono
    if (themeIcon) {
      themeIcon.classList.add("bi"); // base
      themeIcon.classList.remove(ICON_LIGHT, ICON_DARK, "bi-cloud-sun"); // limpia por si acaso
      themeIcon.classList.add(isLight ? ICON_LIGHT : ICON_DARK);
    }

    // video
    updateThemeVideo(isLight);
    updateContactVideo(isLight);

  }

  // 1) Aplicar tema guardado al cargar
  const savedTheme = localStorage.getItem("theme"); // "light" o ""
  setTheme(savedTheme === "light" ? "light" : "");

  // 2) Toggle al hacer click
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLightNow = root.getAttribute("data-theme") === "light";
      const nextTheme = isLightNow ? "" : "light";
      setTheme(nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }
});
