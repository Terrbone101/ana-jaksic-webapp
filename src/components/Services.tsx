import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Camera, Sparkles, Heart, Palette } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ICONS = [Camera, Sparkles, Heart, Palette];

interface ServiceItem {
  title: string;
  text: string;
}

export default function Services() {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) as ServiceItem[];

  return (
    <AnimatedSection id="services" className="bg-ivory px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {t("services.eyebrow")}
        </p>
        <h2 className="mt-3 text-center font-serif text-4xl text-espresso sm:text-5xl">
          {t("services.title")}
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-2xl border border-espresso/10 bg-blush/40 p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-light/50 text-gold">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-serif text-xl text-espresso">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso-light">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
