import type { Metadata } from "next";

export const SITE_URL = "https://autheeka.com";
export const SITE_NAME = "Autheeka";
const DEFAULT_IMAGE_ALT = "Autheeka, billetterie et événements en toute confiance";

type OpenGraphImage = { url: string; alt: string };

/** Search engines and link previews cut around 160 characters */
export const excerpt = (text: string, max = 160) => {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length <= max ? flat : `${flat.slice(0, max - 1).trimEnd()}…`;
};

/** A child `openGraph` replaces the parent one entirely: each indexable page restates the shared fields */
export const pageMetadata = ({
  title,
  description,
  path,
  images,
}: {
  title: string;
  description: string;
  path: string;
  images?: OpenGraphImage[];
}): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "fr_FR",
    url: path,
    title,
    description,
    // Restating `openGraph` drops the root opengraph-image: fall back to it explicitly
    images: images ?? [{ url: "/opengraph-image.png", width: 1024, height: 500, alt: DEFAULT_IMAGE_ALT }],
  },
});

export const privateMetadata = (title: string): Metadata => ({
  title,
  robots: { index: false, follow: false },
});
