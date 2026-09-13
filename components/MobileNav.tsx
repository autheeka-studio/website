"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `transition-colors py-2 border-b border-gray-50 ${isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600 text-gray-600 font-semibold'}`;
  };

  return (
    <div className="md:hidden flex items-center" ref={navRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 -mr-2 text-gray-600 focus:outline-none">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
          <div className="absolute top-[64px] left-0 w-full bg-white border-b border-gray-100 shadow-md py-4 px-6 flex flex-col gap-4 font-semibold text-gray-600 z-[110]">
            <Link href="/explore" onClick={() => setIsOpen(false)} className={getLinkClass('/explore')}>Explorer</Link>
            <Link href="/create" onClick={() => setIsOpen(false)} className={getLinkClass('/create')}>Créer un événement</Link>
            <a href="mailto:support@autheeka.com" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition-colors py-2">Aide</a>
          </div>
      )}
    </div>
  );
}
