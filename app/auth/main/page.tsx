"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthBackground } from "@/components/AuthBackground";
import { GlassCard } from "@/components/GlassCard";

export default function MainAuthPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, socialLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/explore");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError("Veuillez entrer une adresse e-mail.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError("Format d'e-mail invalide.");
      return;
    }
    setError("");
    router.push(`/auth/login?email=${encodeURIComponent(cleanEmail)}`);
  };

  const handleGoToCreateAccount = (e: React.MouseEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    router.push(
      cleanEmail
        ? `/auth/create-account?email=${encodeURIComponent(cleanEmail)}`
        : "/auth/create-account"
    );
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setError("");
        await socialLogin(tokenResponse.access_token, "GOOGLE");
        router.push("/explore");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError("La connexion avec Google a échoué.");
    },
  });

  return (
    <AuthBackground>
      <div className="flex-1 flex flex-col items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <GlassCard className="relative z-10">
          <div className="mb-6">
            <h2 className="text-center text-[20px] font-semibold text-[#1e293b] leading-snug">
              Connectez-vous ou créez un compte
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-medium p-3.5 rounded-2xl text-center mb-5">
              {error}
            </div>
          )}

          <div className="relative w-full mb-6">
            <button
              type="button"
              onClick={() => googleLogin()}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white/80 border-[1.5px] border-black/10 rounded-full py-4 px-4 hover:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-base font-semibold text-[#1e293b]">
                Continuer avec Google
              </span>
            </button>
          </div>

          <div className="mb-6 relative flex items-center justify-center">
            <div className="flex-1 border-t border-black/15"></div>
            <span className="px-4 text-[13px] font-medium text-black/50">OU</span>
            <div className="flex-1 border-t border-black/15"></div>
          </div>

          <form onSubmit={handleContinue} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none z-10 text-gray-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="appearance-none rounded-full relative block w-full pl-12.5 pr-4 py-4 border border-black/5 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[15px] font-medium bg-white/80 transition-all"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3.75 px-4 text-[16px] font-semibold rounded-full text-white bg-linear-to-r from-blue-500 to-blue-700 hover:opacity-95 transition-all shadow-[0_4px_12px_rgba(53,134,197,0.35)]"
            >
              Continuer
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-[14px] text-gray-600">
              Vous n'avez pas de compte ?{" "}
              <button
                type="button"
                onClick={handleGoToCreateAccount}
                className="font-semibold text-blue-600 hover:underline inline"
              >
                Créer un compte
              </button>
            </p>
          </div>

          <div className="mt-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full flex justify-center items-center gap-2 py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors font-semibold"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Annuler
            </button>
          </div>
        </GlassCard>

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
