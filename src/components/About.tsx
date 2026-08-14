import { useTranslation } from "react-i18next";
import AnimatedSection from "./AnimatedSection";

const PORTRAIT =
  "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/4dad5489-0c49-4bbe-8fe9-7cffb0f6eeea/IMG_0638.jpg?format=1000w";

export default function About() {
  const { t } = useTranslation();
  const highlights = t("about.highlights", { returnObjects: true }) as string[];

  return (
    <AnimatedSection id="about" className="bg-ivory px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {t("about.eyebrow")}
        </p>
        <h2 className="mt-3 text-center font-serif text-4xl text-espresso sm:text-5xl">
          {t("about.name")}
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={PORTRAIT}
              alt="Ana Jaksic portrait"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <h3 className="font-serif text-2xl text-espresso sm:text-3xl">
              {t("about.title1")} <span className="italic text-rose">{t("about.title2")}</span>
            </h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-espresso-light">
              {t("about.subtitle")}
            </p>

            <ul className="mt-8 space-y-2.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-espresso">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 border-l-2 border-gold pl-4 font-serif text-lg italic text-espresso">
              {t("about.quote1")}
            </p>
            <p className="mt-2 pl-4 text-sm leading-relaxed text-espresso-light">
              {t("about.quote2")}
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-4xl">
          <h3 className="font-serif text-2xl text-espresso">{t("about.bioTitle")}</h3>
          <div className="mt-4 space-y-4 leading-relaxed text-espresso-light">
            <p>{t("about.bioP1")}</p>
            <p>{t("about.bioP2")}</p>
            <p>{t("about.bioP3")}</p>
            <p>{t("about.bioP4")}</p>
            <p>{t("about.bioP5")}</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
