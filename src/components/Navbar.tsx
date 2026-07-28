import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

const LINKS = [
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#portfolio", key: "portfolio" },
  { href: "#education", key: "education" },
  { href: "#shop", key: "shop" },
  { href: "#contact", key: "contact" },
] as const;

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ivory/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="#top"
          className={`flex items-center gap-2.5 font-serif text-xl tracking-wide ${
            scrolled ? "text-espresso" : "text-ivory"
          }`}
        >
          <Logo className="h-9 w-9" />
          Ana Jaksic
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                scrolled ? "text-espresso/80 hover:text-espresso" : "text-ivory/85 hover:text-ivory"
              }`}
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher dark={scrolled} />
          <a
            href="#booking"
            className="rounded-full bg-rose px-5 py-2.5 text-sm font-semibold text-ivory shadow-md shadow-rose/30 transition-transform hover:scale-105 hover:bg-rose-dark"
          >
            {t("nav.book")}
          </a>
        </div>

        <button
          className={`lg:hidden ${scrolled ? "text-espresso" : "text-ivory"}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-ivory px-6 pb-6 lg:hidden"
        >
          <div className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-espresso/80 font-medium"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="rounded-full bg-rose px-5 py-2.5 text-center text-sm font-semibold text-ivory"
            >
              {t("nav.book")}
            </a>
            <LanguageSwitcher dark />
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
