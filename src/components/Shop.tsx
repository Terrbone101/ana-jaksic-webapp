import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, FlaskConical, X } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import PaymentButtons from "./PaymentButtons";
import { products } from "../data/products";

interface ProductText {
  title: string;
  description: string;
  price: string;
}

export default function Shop() {
  const { t } = useTranslation();
  const productTexts = t("shop.products", { returnObjects: true }) as ProductText[];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successIndex, setSuccessIndex] = useState<number | null>(null);

  const detailsFilled = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  function openProduct(i: number) {
    setOpenIndex(openIndex === i ? null : i);
    setName("");
    setEmail("");
  }

  function handlePaid(i: number) {
    setSuccessIndex(i);
    setOpenIndex(null);
  }

  return (
    <AnimatedSection id="shop" className="bg-ivory px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {t("shop.eyebrow")}
        </p>
        <h2 className="mt-3 text-center font-serif text-4xl text-espresso sm:text-5xl">
          {t("shop.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-espresso-light">
          {t("shop.subtitle")}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => {
            const text = productTexts[i];
            const isOpen = openIndex === i;
            const isSuccess = successIndex === i;
            return (
              <div
                key={product.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-espresso/10 bg-white"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={text.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  {product.isTest && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ivory shadow">
                      <FlaskConical size={11} />
                      {t("shop.testBadge")}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-lg text-espresso">{text.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso-light">
                    {text.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-rose">{text.price}</span>
                    {!isOpen && (
                      <button
                        onClick={() => openProduct(i)}
                        className="rounded-full bg-espresso px-5 py-2 text-xs font-semibold text-ivory transition-transform hover:scale-105"
                      >
                        {t("shop.buyNow")}
                      </button>
                    )}
                  </div>

                  {product.isTest && !isOpen && !isSuccess && (
                    <p className="mt-3 text-[11px] leading-snug text-espresso-light/80">
                      {t("shop.testNotice")}
                    </p>
                  )}

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-3 overflow-hidden border-t border-espresso/10 pt-4"
                      >
                        <button
                          onClick={() => setOpenIndex(null)}
                          className="ml-auto flex items-center gap-1 text-xs text-espresso-light hover:text-espresso"
                        >
                          <X size={12} /> {t("shop.close")}
                        </button>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t("booking.name")}
                          className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-2.5 text-sm text-espresso outline-none focus:border-gold"
                        />
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder={t("booking.email")}
                          className="w-full rounded-xl border border-espresso/15 bg-white px-4 py-2.5 text-sm text-espresso outline-none focus:border-gold"
                        />
                        {detailsFilled ? (
                          <PaymentButtons item={product} title={text.title} onPaid={() => handlePaid(i)} />
                        ) : (
                          <p className="text-xs text-espresso-light">{t("booking.fillDetailsFirst")}</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isSuccess && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 flex items-start gap-2 rounded-lg bg-rose/10 p-3 text-xs text-espresso"
                      >
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-rose" />
                        <span>{t("shop.successText", { product: text.title })}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
