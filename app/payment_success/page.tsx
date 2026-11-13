import type { Metadata } from "next";
import { privateMetadata } from "@/lib/metadata";
import { PaymentResult } from "@/components/PaymentResult";

export const metadata: Metadata = privateMetadata("Paiement réussi");

export default function PaymentSuccessPage() {
  return <PaymentResult success />;
}
