import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const IMAGES = [
  "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/fe555edc-4b50-47e0-8597-9010b182817a/Bild+23.09.24+um+11.45.jpeg",
  "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/d0fe040d-00d1-4e36-a0a1-fa4814eab06b/florisomnia_stefankokovic_06.jpg",
  "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/49fa7e07-d170-42b7-bfab-7d712a9d8f6f/BUNDY_BRIDE_%28c%29_IsabellaAbel_01781+copy.jpg",
  "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/c1303c02-b3a4-4129-9f2b-50b0de9d0473/_DSC9251-Edit.jpg",
  "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/d8b9c84b-f6e6-4c25-af3a-13b0f605c07a/LF.jpg",
  "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/7fd575c3-ee16-49eb-b748-bf372bd129ef/florisomnia_stefankokovic_04.jpg",
];

export default function Portfolio() {
  const { t } = useTranslation();
  const categories = t("portfolio.categories", { returnObjects: true }) as string[];

  return (
    <AnimatedSection id="portfolio" className="bg-blush/50 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {t("portfolio.eyebrow")}
        </p>
        <h2 className="mt-3 text-center font-serif text-4xl text-espresso sm:text-5xl">
          {t("portfolio.title")}
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-gold/40 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-espresso-light"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {IMAGES.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group overflow-hidden rounded-xl"
            >
              <img
                src={src}
                alt={`Ana Jaksic portfolio work ${i + 1}`}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
