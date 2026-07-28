import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DayPicker } from "react-day-picker";
import { de, enUS, sr, fr } from "date-fns/locale";
import type { Locale } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, FlaskConical } from "lucide-react";
import "react-day-picker/style.css";
import AnimatedSection from "./AnimatedSection";
import PaymentButtons from "./PaymentButtons";
import { courses } from "../data/courses";
import { saveBooking } from "../lib/bookings";

interface CourseText {
  title: string;
  duration: string;
  price: string;
  description: string;
}

const DATE_LOCALES: Record<string, Locale> = { en: enUS, de, sr, fr };
const STEPS = ["date", "details", "payment"] as const;
type Step = (typeof STEPS)[number];

export default function Booking() {
  const { t, i18n } = useTranslation();
  const courseTexts = t("booking.courses", { returnObjects: true }) as CourseText[];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [step, setStep] = useState<Step>("date");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<{ course: string; date: string; name: string } | null>(
    null,
  );

  const course = openIndex !== null ? courses[openIndex] : null;
  const courseText = openIndex !== null ? courseTexts[openIndex] : null;

  const detailsFilled = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);
  const dateLocale = DATE_LOCALES[i18n.resolvedLanguage ?? "en"] ?? enUS;
  const formattedDate = useMemo(
    () => (date ? date.toLocaleDateString(i18n.resolvedLanguage, { dateStyle: "long" }) : ""),
    [date, i18n.resolvedLanguage],
  );

  function openCourse(i: number) {
    setOpenIndex(i);
    setStep("date");
    setDate(undefined);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSuccess(null);
  }

  function closeDetail() {
    setOpenIndex(null);
    setSuccess(null);
  }

  function handlePaid(method: "paypal" | "stripe") {
    if (!course || !courseText || !date) return;
    saveBooking({
      courseId: course.id,
      courseTitle: courseText.title,
      date: date.toISOString(),
      name,
      email,
      phone,
      message,
      paymentMethod: method,
      createdAt: new Date().toISOString(),
    });
    setSuccess({ course: courseText.title, date: formattedDate, name });
  }

  const stepIndex = STEPS.indexOf(step);

  return (
    <AnimatedSection id="booking" className="bg-gradient-to-b from-blush to-ivory px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {t("booking.eyebrow")}
        </p>
        <h2 className="mt-3 text-center font-serif text-4xl text-espresso sm:text-5xl">
          {t("booking.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-espresso-light">
          {t("booking.subtitle")}
        </p>

        <AnimatePresence mode="wait">
          {course === null ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {courses.map((c, i) => {
                const text = courseTexts[i];
                return (
                  <button
                    key={c.id}
                    onClick={() => openCourse(i)}
                    className="group overflow-hidden rounded-2xl border border-espresso/10 bg-white text-left shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={c.image}
                        alt={text.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {c.isTest && (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ivory shadow">
                          <FlaskConical size={11} />
                          {t("booking.testBadge")}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="font-serif text-lg leading-snug text-espresso">{text.title}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-espresso-light">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {text.duration}
                        </span>
                        <span className="font-semibold text-rose">{text.price}</span>
                      </div>
                      <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-gold group-hover:underline">
                        {t("booking.moreInfo")} →
                      </span>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-14 overflow-hidden rounded-3xl border border-gold/20 bg-white shadow-xl shadow-espresso/5"
            >
              <button
                onClick={closeDetail}
                className="flex items-center gap-2 px-6 pt-6 text-xs font-semibold uppercase tracking-wide text-espresso-light hover:text-espresso"
              >
                <ArrowLeft size={14} /> {t("booking.backToCourses")}
              </button>

              {success ? (
                <div className="flex flex-col items-center px-6 py-14 text-center">
                  <CheckCircle2 size={56} className="text-rose" />
                  <h3 className="mt-5 font-serif text-2xl text-espresso">{t("booking.successTitle")}</h3>
                  <p className="mt-3 max-w-md text-espresso-light">
                    {t("booking.successText", {
                      name: success.name,
                      course: success.course,
                      date: success.date,
                    })}
                  </p>
                  <button
                    onClick={closeDetail}
                    className="mt-8 rounded-full bg-espresso px-7 py-3 text-sm font-semibold text-ivory transition-transform hover:scale-105"
                  >
                    {t("booking.bookAnother")}
                  </button>
                </div>
              ) : (
                <div className="grid gap-0 lg:grid-cols-2">
                  <div className="aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full">
                    <img src={course.image} alt={courseText?.title} className="h-full w-full object-cover" />
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="font-serif text-2xl text-espresso">{courseText?.title}</h3>
                    <div className="mt-2 flex items-center gap-4 text-sm text-espresso-light">
                      <span className="flex items-center gap-1">
                        <Clock size={13} /> {courseText?.duration}
                      </span>
                      <span className="font-semibold text-rose">{courseText?.price}</span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-espresso-light">
                      {courseText?.description}
                    </p>
                    {course.isTest && (
                      <p className="mt-3 rounded-lg bg-gold/10 px-3 py-2.5 text-xs leading-relaxed text-espresso-light">
                        {t("booking.testNotice")}
                      </p>
                    )}

                    {/* Step indicator */}
                    <div className="mt-6 flex items-center gap-2">
                      {STEPS.map((s, i) => (
                        <div key={s} className="flex items-center gap-2">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                              i <= stepIndex ? "bg-rose text-ivory" : "bg-espresso/10 text-espresso-light"
                            }`}
                          >
                            {i + 1}
                          </div>
                          {i < STEPS.length - 1 && (
                            <div className={`h-0.5 w-6 ${i < stepIndex ? "bg-rose" : "bg-espresso/10"}`} />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      {step === "date" && (
                        <div>
                          <h4 className="mb-3 text-sm font-semibold text-espresso">{t("booking.step2")}</h4>
                          <div className="inline-block rounded-2xl border border-espresso/10 p-2">
                            <DayPicker
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              locale={dateLocale}
                              disabled={{ before: new Date() }}
                              className="ana-daypicker"
                            />
                          </div>
                          <button
                            disabled={!date}
                            onClick={() => setStep("details")}
                            className="mt-5 block w-full rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-ivory transition-transform enabled:hover:scale-105 disabled:opacity-30"
                          >
                            {t("booking.step3")} →
                          </button>
                        </div>
                      )}

                      {step === "details" && (
                        <div className="space-y-3">
                          <h4 className="mb-1 text-sm font-semibold text-espresso">{t("booking.step3")}</h4>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t("booking.name")}
                            className="w-full rounded-xl border border-espresso/15 px-4 py-3 text-sm text-espresso outline-none focus:border-gold"
                          />
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder={t("booking.email")}
                            className="w-full rounded-xl border border-espresso/15 px-4 py-3 text-sm text-espresso outline-none focus:border-gold"
                          />
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            placeholder={t("booking.phone")}
                            className="w-full rounded-xl border border-espresso/15 px-4 py-3 text-sm text-espresso outline-none focus:border-gold"
                          />
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t("booking.messagePlaceholder")}
                            rows={2}
                            className="w-full rounded-xl border border-espresso/15 px-4 py-3 text-sm text-espresso outline-none focus:border-gold"
                          />
                          <div className="flex gap-3 pt-1">
                            <button
                              onClick={() => setStep("date")}
                              className="rounded-full border border-espresso/15 px-5 py-3 text-sm font-semibold text-espresso"
                            >
                              ←
                            </button>
                            <button
                              disabled={!detailsFilled}
                              onClick={() => setStep("payment")}
                              className="flex-1 rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-ivory transition-transform enabled:hover:scale-105 disabled:opacity-30"
                            >
                              {t("booking.step4")} →
                            </button>
                          </div>
                        </div>
                      )}

                      {step === "payment" && course && courseText && (
                        <div>
                          <h4 className="mb-3 text-sm font-semibold text-espresso">{t("booking.step4")}</h4>
                          <PaymentButtons item={course} title={courseText.title} onPaid={handlePaid} />
                          <button
                            onClick={() => setStep("details")}
                            className="mt-4 text-xs font-semibold text-espresso-light hover:text-espresso"
                          >
                            ← {t("booking.step3")}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
