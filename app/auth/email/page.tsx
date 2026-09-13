"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthBackground } from "@/components/AuthBackground";
import { GlassCard } from "@/components/GlassCard";

function EmailAuthForm() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const isLogin = searchParams.get("isLogin") === "true";
  
  const [email] = useState(initialEmail);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, register, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/explore");
    } else if (!initialEmail) {
      router.push("/auth/main");
    }
  }, [isAuthenticated, initialEmail, router]);

  if (isAuthenticated || !initialEmail) {
    return null;
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/explore");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      router.push(`/auth/otp?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="relative z-10">
      <div className="mb-8">
        <h2 className="text-center text-[22px] font-bold text-[#1e293b] leading-snug">
          {isLogin ? "Entrez votre mot de passe" : "Créez un mot de passe"}
        </h2>
      </div>

      <form className="space-y-5" onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
        {error && (
          <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-2xl text-center">
            {error}
          </div>
        )}

        {/* Read-only email button to go back */}
        <button type="button" onClick={() => router.push("/auth/main")} className="w-full flex items-center justify-center gap-3 py-4 px-5 bg-blue-500/15 text-[#1e293b] rounded-full hover:bg-blue-500/25 transition-colors mb-6">
          <div className="flex items-center justify-center gap-3 truncate max-w-[80%]">
            {/* <svg className="w-5 h-5 text-blue-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg> */}
            <span className="font-semibold text-[16px] truncate">{email}</span>
          </div>
          <svg className="w-5 h-5 text-blue-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
        </button>

        <div className="space-y-5">
          {!isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-[18px] flex items-center pointer-events-none z-10">
                <svg className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                name="name"
                autoComplete="name"
                autoFocus={!isLogin ? true : false}
                required
                className="appearance-none rounded-full relative block w-full pl-[52px] pr-4 py-[18px] border border-black/5 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500 focus:border-[1.5px] text-[16px] font-medium bg-white/80 transition-all"
                placeholder="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-[18px] flex items-center pointer-events-none z-10">
              <svg className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              autoFocus={isLogin ? true : false}
              required
              className="appearance-none rounded-full relative block w-full pl-[52px] pr-4 py-[18px] border border-black/5 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500 focus:border-[1.5px] text-[16px] font-medium bg-white/80 transition-all"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-[18px] flex items-center pointer-events-none z-10">
                <svg className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                required
                className="appearance-none rounded-full relative block w-full pl-[52px] pr-4 py-[18px] border border-black/5 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500 focus:border-[1.5px] text-[16px] font-medium bg-white/80 transition-all"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
        </div>

        {isLogin && (
          <div className="flex justify-end pt-1">
            <button type="button" className="text-blue-500 font-semibold text-[14px] hover:underline">
              Mot de passe oublié ?
            </button>
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-[16px] px-4 text-[16px] font-semibold rounded-full text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition-all shadow-[0_4px_12px_var(--color-blue-500)] shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Continuer"
            )}
          </button>
        </div>

        <div className="mt-4 pt-2">
          <button 
            type="button"
            onClick={() => router.push("/auth/main")} 
            className="w-full flex justify-center items-center gap-2 py-2 text-sm text-blue-500 hover:text-blue-600 transition-colors font-semibold"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Annuler
          </button>
        </div>
      </form>
    </GlassCard>
  );
}

export default function EmailAuthPage() {
  return (
    <AuthBackground>
      <div className="flex-1 flex flex-col items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <Suspense fallback={<div className="flex justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
          <EmailAuthForm />
        </Suspense>

        <p className="mt-8 text-center text-xs text-gray-500 max-w-sm">
          En continuant, vous acceptez nos{" "}
          <a href="/terms" className="underline hover:text-gray-700">
            Conditions d'utilisation
          </a>{" "}
          et notre{" "}
          <a href="/privacy-policy" className="underline hover:text-gray-700">
            Politique de confidentialité
          </a>.
        </p>
      </div>
    </AuthBackground>
  );
}
