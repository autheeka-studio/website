import type { Metadata } from "next";
import { privateMetadata } from "@/lib/metadata";
import { PaymentResult } from "@/components/PaymentResult";

export const metadata: Metadata = privateMetadata("Paiement annulé");

export default function PaymentCanceledPage() {
  return <PaymentResult success={false} />;
}
