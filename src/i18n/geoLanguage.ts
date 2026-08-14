import i18n from "./index";

// Maps a visitor's country to a supported UI language.
// Everything not listed keeps the browser-language/English fallback.
const COUNTRY_LANG: Record<string, string> = {
  RS: "sr", // Serbia
  ME: "sr", // Montenegro
  BA: "sr", // Bosnia and Herzegovina
  HR: "hr", // Croatia
  DE: "de", // Germany
  AT: "de", // Austria
  CH: "de", // Switzerland
  LI: "de", // Liechtenstein
  FR: "fr", // France
  BE: "fr", // Belgium
  LU: "fr", // Luxembourg
  MC: "fr", // Monaco
};

const STORAGE_KEY = "i18nextLng";

// Only runs when no language has been chosen/detected yet (first-ever visit),
// so a manual pick from the language switcher is never overridden.
export async function applyCountryLanguage() {
  if (localStorage.getItem(STORAGE_KEY)) return;

  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return;
    const data: { country_code?: string } = await res.json();
    const lang = data.country_code && COUNTRY_LANG[data.country_code];
    if (lang) await i18n.changeLanguage(lang);
  } catch {
    // Geo lookup unavailable - keep the browser-language fallback already active.
  }
}
