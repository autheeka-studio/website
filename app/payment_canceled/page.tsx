import type { Metadata } from "next";
import { PaymentResult } from "@/components/PaymentResult";

export const metadata: Metadata = {
  title: "Paiement annulé",
  robots: { index: false },
};

export default function PaymentCanceledPage() {
  return <PaymentResult success={false} />;
}
