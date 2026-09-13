"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DesktopNav() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `transition-colors ${isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600 font-semibold text-gray-600'}`;
  };

  return (
    <nav className="hidden md:flex gap-6 text-sm">
      <Link href="/explore" className={getLinkClass('/explore')}>
        Explorer
      </Link>
      <Link href="/create" className={getLinkClass('/create')}>
        Créer un événement
      </Link>
      <a href="mailto:support@autheeka.com" className="hover:text-blue-600 transition-colors font-semibold text-gray-600">
        Aide
      </a>
    </nav>
  );
}
