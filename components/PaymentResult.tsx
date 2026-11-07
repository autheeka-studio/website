import Link from "next/link";

/**
 * Page shown by Stripe after a payment (success_url / cancel_url).
 * Opened from the app, it is displayed over the app: the user closes it to go back.
 */
export function PaymentResult({ success }: { success: boolean }) {
  return (
    <main className="flex-1 w-full bg-gray-50 min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div
          className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            success ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"
          }`}
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d={success ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {success ? "Paiement réussi" : "Paiement annulé"}
        </h1>
        <p className="text-gray-500 mb-10 text-lg">
          {success
            ? "Votre paiement a bien été reçu. Il apparaîtra dans quelques instants."
            : "Aucun montant n'a été débité. Vous pouvez réessayer quand vous voulez."}
          <br />
          Depuis l&apos;application, fermez simplement cette page.
        </p>

        <Link
          href="/tickets"
          className="inline-flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors shadow-sm"
        >
          Voir mes billets
        </Link>
      </div>
    </main>
  );
}
