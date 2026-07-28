import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

function MenuIcon({ open }: { open: boolean }) {
  const bar = "absolute left-0 h-[2px] w-6 rounded-full bg-current";
  return (
    <span className="relative block h-4 w-6">
      <motion.span
        className={bar}
        animate={open ? { top: 7, rotate: 45 } : { top: 0, rotate: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
      <motion.span
        className={bar}
        style={{ top: 7 }}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className={bar}
        animate={open ? { top: 7, rotate: -45 } : { top: 14, rotate: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
    </span>
  );
}

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
          <a href="#booking" className="btn btn-primary btn-sm">
            {t("nav.book")}
          </a>
        </div>

        <button
          className={`-mr-2 flex h-12 w-12 items-center justify-center lg:hidden ${
            scrolled ? "text-espresso" : "text-ivory"
          }`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <MenuIcon open={open} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-ivory px-6 lg:hidden"
          >
            <div className="flex flex-col gap-4 pb-6">
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
              <a href="#booking" onClick={() => setOpen(false)} className="btn btn-primary justify-center">
                {t("nav.book")}
              </a>
              <LanguageSwitcher dark />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
