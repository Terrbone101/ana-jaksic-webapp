import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HERO_IMG =
  "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/c1303c02-b3a4-4129-9f2b-50b0de9d0473/_DSC9251-Edit.jpg";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div id="top" className="relative flex min-h-screen items-center overflow-hidden bg-espresso">
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Ana Jaksic editorial makeup artistry"
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-rose/30 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/25 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light"
        >
          {t("hero.eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="font-serif text-5xl leading-tight text-ivory sm:text-6xl lg:text-7xl"
        >
          {t("hero.title1")}{" "}
          <span className="italic text-gold-light">{t("hero.title2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg"
        >
          {t("hero.text")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#booking"
            className="rounded-full bg-rose px-8 py-3.5 text-sm font-semibold tracking-wide text-ivory shadow-lg shadow-rose/30 transition-transform hover:scale-105 hover:bg-rose-dark"
          >
            {t("hero.cta1")}
          </a>
          <a
            href="#portfolio"
            className="rounded-full border border-ivory/40 px-8 py-3.5 text-sm font-semibold tracking-wide text-ivory transition-colors hover:bg-ivory/10"
          >
            {t("hero.cta2")}
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-ivory/60"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">{t("hero.scroll")}</span>
        <ChevronDown size={18} />
      </motion.div>
    </div>
  );
}
