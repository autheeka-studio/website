import type { Metadata } from "next";
import Link from "next/link";
import { fetchGraphQL } from "@/lib/api";

export const metadata: Metadata = {
  title: "Réception du billet | Autheeka",
  robots: { index: false },
};

const CONFIRM_TICKET_RECEIPT = `
  mutation ConfirmTicketReceipt($token: String!) {
    confirmTicketReceipt(token: $token)
  }
`;

/** Opened from the "Confirmer la réception" button of the ticket email: confirms right away */
export default async function TicketReceivedPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  let error = !token;
  if (token) {
    try {
      await fetchGraphQL(CONFIRM_TICKET_RECEIPT, { token });
    } catch {
      error = true;
    }
  }

  return (
    <main className="flex-1 w-full bg-gray-50 min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div
          className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            error ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
          }`}
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {error ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            )}
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {error ? "Erreur de confirmation" : "Réception confirmée"}
        </h1>

        <Link
          href="/"
          className="inline-flex items-center justify-center mt-8 text-blue-600 font-semibold hover:underline"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
