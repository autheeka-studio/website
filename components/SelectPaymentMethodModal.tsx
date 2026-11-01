"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchGraphQL } from "@/lib/api";
import { GET_MY_WALLET } from "@/lib/graphql/wallet";

export type PaymentMethod = "INTERNAL_FUND" | "CARD" | "MONCASH" | "PAYPAL" | "CASHAPP";

type Wallet = { balance: number; currency: string };

/**
 * Payment method choice, same as the app (select_payment_method.dart):
 * the purchase offers the internal wallet (with its balance), then "Continuer".
 */
export function SelectPaymentMethodModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (method: PaymentMethod) => void;
}) {
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  // Fresh balance each time the modal opens
  useEffect(() => {
    if (!open) return;
    const token = Cookies.get("autheeka_token");
    fetchGraphQL(GET_MY_WALLET, {}, token)
      .then((data) => setWallet(data?.myWallet ?? null))
      .catch(() => setWallet(null));
  }, [open]);

  if (!open) return null;

  // No preselected method the next time the modal opens
  const close = () => {
    setMethod(null);
    onClose();
  };

  const handleContinue = () => {
    if (!method) return;
    onSelect(method);
    close();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-method-title"
        className="w-full sm:max-w-md bg-white rounded-t-[28px] sm:rounded-[28px] p-6 pb-8 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto sm:hidden" />
        <h2 id="payment-method-title" className="text-xl font-bold text-gray-900">
          Moyen de paiement
        </h2>

        <button
          type="button"
          onClick={() => setMethod("INTERNAL_FUND")}
          aria-pressed={method === "INTERNAL_FUND"}
          className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-colors ${
            method === "INTERNAL_FUND"
              ? "bg-blue-50 border-blue-600"
              : "bg-gray-50 border-transparent hover:border-blue-200"
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              method === "INTERNAL_FUND" ? "border-blue-600" : "border-gray-400"
            }`}
          >
            {method === "INTERNAL_FUND" && <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-bold text-gray-900">Portefeuille Interne</span>
            {wallet && (
              <span className="block text-sm font-semibold text-blue-600 mt-0.5">
                {Number(wallet.balance).toFixed(2)} {wallet.currency}
              </span>
            )}
          </span>
          <svg className="w-8 h-8 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </button>

        {method && (
          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors shadow-sm"
          >
            Continuer
          </button>
        )}
      </div>
    </div>
  );
}
