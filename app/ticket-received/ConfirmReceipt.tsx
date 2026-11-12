"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchGraphQL } from "@/lib/api";

const CONFIRM_TICKET_RECEIPT = `
  mutation ConfirmTicketReceipt($token: String!) {
    confirmTicketReceipt(token: $token)
  }
`;

// A click is required: email scanners that open the link must not confirm on their own
export function ConfirmReceipt({ token }: { token: string }) {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(token ? "" : "Ce lien est incomplet.");

  const confirm = async () => {
    setLoading(true);
    setError("");
    try {
      await fetchGraphQL(CONFIRM_TICKET_RECEIPT, { token });
      setConfirmed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "La confirmation a échoué.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 w-full bg-gray-50 min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {confirmed ? "Réception confirmée" : "Confirmer la réception"}
        </h1>
        <p className="text-gray-500 mb-10 text-lg">
          {confirmed
            ? "Merci ! La personne qui vous a offert ce billet a été prévenue."
            : "Confirmez que votre billet est bien arrivé pour prévenir la personne qui vous l'a envoyé."}
        </p>

        {error && <p className="text-red-600 mb-6">{error}</p>}

        {confirmed ? (
          <Link
            href="/"
            className="inline-flex items-center justify-center text-blue-600 font-semibold hover:underline"
          >
            Retour à l&apos;accueil
          </Link>
        ) : (
          <button
            onClick={confirm}
            disabled={loading || !token}
            className="inline-flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? "Confirmation…" : "Confirmer la réception"}
          </button>
        )}
      </div>
    </main>
  );
}
