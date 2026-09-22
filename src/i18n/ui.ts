/**
 * Dil listesi, adresler ve içerik dosyalarında yeri olmayan birkaç
 * arayüz dizgisi. Sayfa metinlerinin tamamı `src/content/*.json` içinde.
 */
export const locales = ["en", "tr", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** `<html lang>` ve `hreflang` için dil etiketleri. */
export const htmlLang: Record<Locale, string> = { en: "en", tr: "tr", ru: "ru" };

export const localeName: Record<Locale, string> = { en: "EN", tr: "TR", ru: "RU" };

/** Denetimlerin erişilebilirlik etiketleri — içerikte karşılığı yok. */
export const ui = {
  en: { changeLanguage: "Change language", lightTheme: "Switch to light theme", darkTheme: "Switch to dark theme" },
  tr: { changeLanguage: "Dili değiştir", lightTheme: "Açık temaya geç", darkTheme: "Koyu temaya geç" },
  ru: { changeLanguage: "Сменить язык", lightTheme: "Светлая тема", darkTheme: "Тёмная тема" },
} as const satisfies Record<Locale, unknown>;

/** Bölüm çapaları üç dilde de aynı — yayındaki adresler korunuyor. */
export const anchors = {
  features: "ozellikler",
  privacy: "gizlilik",
  faq: "sss",
  download: "indir",
} as const;

/** Dışarıya giden adresler tek yerde. */
export const repoUrl = "https://github.com/Dadebay/my_mac_utils";
export const releasesUrl = `${repoUrl}/releases`;
export const latestReleaseUrl = `${repoUrl}/releases/latest`;
export const issuesUrl = `${repoUrl}/issues`;
export const authorUrl = "https://github.com/Dadebay";
