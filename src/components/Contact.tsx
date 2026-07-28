import { useTranslation } from "react-i18next";
import AnimatedSection from "./AnimatedSection";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useTranslation();

  return (
    <AnimatedSection id="contact" className="bg-espresso px-6 py-24 text-center text-ivory lg:px-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
          {t("contact.instagramTitle")}
        </p>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{t("contact.instagramHandle")}</h2>
        <p className="mt-4 leading-relaxed text-ivory/70">{t("contact.instagramText")}</p>
        <a
          href="https://www.instagram.com/a.j.makeupandart/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3 text-sm font-semibold text-espresso transition-transform hover:scale-105"
        >
          <InstagramIcon size={16} />
          {t("contact.instagramCta")}
        </a>
      </div>
    </AnimatedSection>
  );
}
