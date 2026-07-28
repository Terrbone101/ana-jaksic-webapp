import { useTranslation } from "react-i18next";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso px-6 py-8 text-center text-xs text-ivory/50">
      <Logo className="mx-auto h-12 w-12 text-ivory/80" />
      <p className="mt-2 font-serif text-base text-ivory/80">Ana Jaksic</p>
      <p className="mt-1">{t("footer.basedIn")}</p>
      <p className="mt-3">
        © {year} Ana Jaksic. {t("footer.rights")}
      </p>
    </footer>
  );
}
