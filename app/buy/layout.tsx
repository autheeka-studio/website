import type { Metadata } from "next";
import { privateMetadata } from "@/lib/metadata";

export const metadata: Metadata = privateMetadata("Acheter un billet");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
