import type { Metadata } from "next";
import { PaymentResult } from "@/components/PaymentResult";

export const metadata: Metadata = {
  title: "Paiement réussi",
  robots: { index: false },
};

export default function PaymentSuccessPage() {
  return <PaymentResult success />;
}
