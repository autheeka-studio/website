import type { Metadata } from "next";
import { privateMetadata } from "@/lib/metadata";

export const metadata: Metadata = privateMetadata("Actualité");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
