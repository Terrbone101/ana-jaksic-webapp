import { useTranslation } from "react-i18next";
import { GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const EDU_IMG =
  "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/c2ef98ca-11e3-40c2-a5ca-acdfacf5a469/MUD11+2.JPG";

export default function Education() {
  const { t } = useTranslation();
  const programs = t("education.programs", { returnObjects: true }) as string[];

  return (
    <AnimatedSection id="education" className="bg-ivory px-6 py-24 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={EDU_IMG}
            alt="Makeup education session"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {t("education.eyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-4xl text-espresso sm:text-5xl">
            {t("education.title1")} <span className="italic text-rose">{t("education.title2")}</span>
          </h2>
          <p className="mt-5 leading-relaxed text-espresso-light">{t("education.text")}</p>

          <ul className="mt-8 space-y-3">
            {programs.map((program) => (
              <li key={program} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-light/50 text-gold">
                  <GraduationCap size={16} />
                </span>
                <span className="text-espresso">{program}</span>
              </li>
            ))}
          </ul>

          <a
            href="#booking"
            className="mt-9 inline-block rounded-full bg-rose px-8 py-3 text-sm font-semibold text-ivory shadow-md shadow-rose/30 transition-transform hover:scale-105"
          >
            {t("nav.book")}
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
