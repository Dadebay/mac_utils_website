/**
 * Açık/koyu tema düğmesi.
 *
 * Temanın kendisi sayfa boyanmadan önce `<html data-theme>` üzerine
 * yazılıyor (bkz. `Base.astro` içindeki satır içi betik) — burada
 * yalnızca değiştirme, kalıcılık ve etiket güncellemesi var.
 */
const STORAGE_KEY = "glassdo-theme";

type Theme = "light" | "dark";

function current(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;

  document.querySelector("[data-theme-color]")?.setAttribute("content", theme === "light" ? "#ffffff" : "#0a0b0f");

  for (const button of document.querySelectorAll<HTMLElement>("[data-theme-toggle]")) {
    // Düğme her zaman *gideceği* yeri söylüyor.
    const label = theme === "light" ? button.dataset.labelDark : button.dataset.labelLight;
    if (label) button.setAttribute("aria-label", label);
  }

  /* Sayfanın zemin rengini önbelleğe alan başka betikler var
     (kum efekti); tazelenmeleri için haber veriliyor. */
  dispatchEvent(new CustomEvent("glassdo:themechange", { detail: theme }));
}

apply(current());

for (const button of document.querySelectorAll<HTMLElement>("[data-theme-toggle]")) {
  button.addEventListener("click", () => {
    const next: Theme = current() === "light" ? "dark" : "light";
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Gizli sekmede yazma reddedilebilir; tema yine de değişiyor,
         yalnızca bir sonraki ziyarete taşınmıyor. */
    }
  });
}

/* Kullanıcı kendi seçimini yapmadıysa işletim sistemini izle: gün
   batımında macOS koyuya geçince site de geçiyor. */
matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return;
  } catch {
    /* Okunamıyorsa seçim de saklanmamıştır; sistemi izlemeye devam. */
  }
  apply(event.matches ? "light" : "dark");
});
