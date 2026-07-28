import { useTranslation } from "react-i18next";
import AnimatedSection from "./AnimatedSection";

const PORTRAIT =
  "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/a6764c93-e434-4d45-98bd-b2928d8ff921/DSC_0508.JPG";

export default function About() {
  const { t } = useTranslation();

  const facts: [string, string][] = [
    [t("about.basedInLabel"), t("about.basedIn")],
    [t("about.specialtiesLabel"), t("about.specialties")],
    [t("about.experienceLabel"), t("about.experience")],
    [t("about.awardsLabel"), t("about.awards")],
  ];

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
            <p className="text-lg leading-relaxed text-espresso-light">{t("about.intro")}</p>

            <dl className="mt-8 grid grid-cols-2 gap-6">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gold">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm text-espresso-light">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 border-l-2 border-gold pl-4 font-serif text-lg italic text-espresso">
              {t("about.storyP3")}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
