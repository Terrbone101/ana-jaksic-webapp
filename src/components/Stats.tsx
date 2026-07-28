import { useTranslation } from "react-i18next";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import AnimatedSection from "./AnimatedSection";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1.4, bounce: 0 });

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, to, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toString();
    });
  }, [spring]);

  return <span ref={ref}>0</span>;
}

export default function Stats() {
  const { t } = useTranslation();

  const stats = [
    { value: 25, suffix: "+", label: t("stats.s1") },
    { value: 15, suffix: "+", label: t("stats.s2") },
    { value: 8, suffix: "+", label: t("stats.s3") },
    { value: null, suffix: "∞", label: t("stats.s4") },
  ];

  return (
    <AnimatedSection className="bg-blush px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {t("stats.eyebrow")}
        </p>
        <h2 className="mt-3 text-center font-serif text-4xl text-espresso sm:text-5xl">
          {t("stats.title")}
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-4xl text-rose sm:text-5xl">
                {s.value !== null ? <Counter to={s.value} /> : s.suffix}
                {s.value !== null && s.suffix}
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-espresso-light">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="mb-4 font-serif text-xl text-espresso">{t("stats.cta")}</p>
          <a
            href="#contact"
            className="inline-block rounded-full bg-espresso px-8 py-3 text-sm font-semibold text-ivory transition-transform hover:scale-105"
          >
            {t("nav.contact")}
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
