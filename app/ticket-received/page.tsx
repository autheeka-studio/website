import type { Metadata } from "next";
import { ConfirmReceipt } from "./ConfirmReceipt";

export const metadata: Metadata = {
  title: "Confirmer la réception | Autheeka",
  robots: { index: false },
};

/** Opened from the "Confirmer la réception" button of the ticket email */
export default async function TicketReceivedPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <ConfirmReceipt token={token ?? ""} />;
}
