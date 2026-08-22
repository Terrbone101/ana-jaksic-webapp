import { useTranslation } from "react-i18next";
import { GraduationCap, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function Education() {
  const { t } = useTranslation();
  const path1Items = t("education.path1Items", { returnObjects: true }) as string[];
  const path2Items = t("education.path2Items", { returnObjects: true }) as string[];

  const paths = [
    {
      icon: GraduationCap,
      badge: t("education.path1Badge"),
      title: t("education.path1Title"),
      subtitle: t("education.path1Subtitle"),
      intro: t("education.path1Intro"),
      items: path1Items,
      cta: t("education.path1Cta"),
    },
    {
      icon: Sparkles,
      badge: t("education.path2Badge"),
      title: t("education.path2Title"),
      subtitle: t("education.path2Subtitle"),
      items: path2Items,
      cta: t("education.path2Cta"),
    },
  ];

  return (
    <AnimatedSection id="education" className="bg-ivory px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {t("education.eyebrow")}
        </p>
        <h2 className="mt-3 text-center font-serif text-4xl text-espresso sm:text-5xl">
          {t("education.title1")} <span className="italic text-rose">{t("education.title2")}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-espresso-light">
          {t("education.text")}
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {paths.map((path) => (
            <div key={path.title} className="rounded-2xl border border-espresso/10 bg-blush/40 p-8">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-light/50 text-gold">
                  <path.icon size={22} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{path.badge}</p>
                  <h3 className="font-serif text-2xl text-espresso">{path.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-espresso-light">{path.subtitle}</p>
              {path.intro && (
                <p className="mt-3 text-sm leading-relaxed text-espresso-light">{path.intro}</p>
              )}
              <ul className="mt-6 space-y-2.5">
                {path.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-espresso">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#booking" className="btn btn-primary btn-sm mt-8">
                {path.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
