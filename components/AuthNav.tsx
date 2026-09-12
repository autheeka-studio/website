"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { getMediaVariant } from "@/lib/utils";
import { useState } from "react";

export function AuthNav() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-16 h-8 animate-pulse bg-gray-200 rounded-full"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 focus:outline-none"
        >
          {user.picture ? (
            <img
              src={getMediaVariant(user.picture, "thumbnail")}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </button>

        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 py-2">
              <div className="px-4 py-2 border-b border-gray-50">
                <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  setShowDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                Déconnexion
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/auth/main"
        className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
      >
        Se connecter
      </Link>
    </div>
  );
}
