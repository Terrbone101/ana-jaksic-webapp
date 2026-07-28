import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useTranslation } from "react-i18next";
import { CreditCard } from "lucide-react";
import { getStripeLink, PAYPAL_CLIENT_ID } from "../lib/payments";
import type { Sellable } from "../types";

export default function PaymentButtons({
  item,
  title,
  onPaid,
}: {
  item: Sellable;
  title: string;
  onPaid: (method: "paypal" | "stripe") => void;
}) {
  const { t } = useTranslation();
  const stripeLink = getStripeLink(item.id);
  const amountDecimal = (item.amount / 100).toFixed(2);

  return (
    <div className="space-y-5">
      <p className="text-sm text-espresso-light">{t("booking.paymentIntro")}</p>

      {stripeLink ? (
        <a
          href={stripeLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onPaid("stripe")}
          className="flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-ivory transition-transform hover:scale-105"
        >
          <CreditCard size={16} />
          {t("booking.payWithCard")}
        </a>
      ) : (
        <p className="max-w-xs rounded-lg bg-espresso/5 px-4 py-3 text-xs text-espresso-light">
          {t("booking.paymentNotConfigured")}
        </p>
      )}

      <div className="max-w-xs">
        <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: item.currency }}>
          <PayPalButtons
            style={{ layout: "horizontal", color: "gold", label: "pay", height: 45 }}
            forceReRender={[item.id, item.amount]}
            createOrder={(_data, actions) =>
              actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: title,
                    amount: { currency_code: item.currency, value: amountDecimal },
                  },
                ],
              })
            }
            onApprove={async (_data, actions) => {
              await actions.order?.capture();
              onPaid("paypal");
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
