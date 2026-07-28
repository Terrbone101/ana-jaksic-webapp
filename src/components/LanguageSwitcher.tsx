import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "sr", label: "SR" },
  { code: "fr", label: "FR" },
] as const;

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { i18n } = useTranslation();

  return (
    <div
      className={`flex items-center gap-1 rounded-full border p-1 text-xs font-medium tracking-wide ${
        dark ? "border-espresso/20" : "border-ivory/30"
      }`}
    >
      {LANGS.map((lang) => {
        const active = i18n.resolvedLanguage === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            aria-current={active}
            className={`rounded-full px-2.5 py-1 transition-colors cursor-pointer ${
              active
                ? "bg-gold text-ivory"
                : dark
                ? "text-espresso/70 hover:text-espresso"
                : "text-ivory/70 hover:text-ivory"
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
