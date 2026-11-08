export function getMediaVariant(url: string, variant: 'thumbnail' | 'medium' | 'large' = 'large') {
  if (!url) return url;
  try {
    const uri = new URL(url);

    // Check if the URL is from Firebase Storage and belongs to the Autheeka app
    if (uri.hostname !== "firebasestorage.googleapis.com") return url;
    if (!uri.pathname.includes("autheeka.firebasestorage.app")) return url;

    // Determine the suffix based on the variant
    let suffix = "";
    if (variant === 'thumbnail') suffix = "_200x200";
    else if (variant === 'medium') suffix = "_600x600";
    else if (variant === 'large') suffix = "_1200x1200";

    // Firebase Storage uses '%2F' as path separators in the URL pathname
    const subParts = uri.pathname.split("%2F");
    const name = subParts[subParts.length - 1];

    // Replace the last occurrence of the name with the name + suffix
    uri.pathname = uri.pathname.replace(name, name + suffix);

    return uri.toString();
  } catch (e) {
    return url;
  }
}

export function formatDate(dateString: string) {
  const eventDate = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(eventDate);
}

export function formatTime(dateString: string) {
  const eventDate = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(eventDate);
}

export function currencyFromBrowserRegion(): "HTG" | "USD" | "CAD" | undefined {
  const region = new Intl.Locale(navigator.language).maximize().region;
  if (!region) return undefined;
  if (region === "HT") return "HTG";
  if (region === "CA") return "CAD";
  return "USD";
}
