import type { Metadata } from "next";
import { privateMetadata } from "@/lib/metadata";

export const metadata: Metadata = privateMetadata("Créer un événement");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
