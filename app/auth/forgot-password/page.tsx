"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchGraphQL } from "@/lib/api";
import { MUTATION_REQUEST_PASSWORD_RESET } from "@/lib/graphql/auth";
import { AuthBackground } from "@/components/AuthBackground";
import { GlassCard } from "@/components/GlassCard";
import { useAuth } from "@/lib/AuthContext";
import { AuthEmailBadge } from "@/components/AuthEmailBadge";

function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/explore");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError("Veuillez entrer votre adresse e-mail.");
      return;
    }

    setLoading(true);

    try {
      const data = await fetchGraphQL(MUTATION_REQUEST_PASSWORD_RESET, { email: cleanEmail });
      if (data?.requestPasswordReset === true) {
        // Redirige vers /auth/otp en mode reset password
        router.push(
          `/auth/otp?email=${encodeURIComponent(cleanEmail)}&reset=true`
        );
      }
    } catch (err: any) {
      setError(err.message || "Impossible d'envoyer l'e-mail de réinitialisation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="relative z-10">
      <div className="mb-6 text-center">
        <h2 className="text-[20px] font-semibold text-[#1e293b] leading-snug">
          Mot de passe oublié
        </h2>
        <p className="text-[14px] text-gray-600 mt-2">
          Entrez votre adresse e-mail pour recevoir un code de vérification.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm font-medium p-3.5 rounded-2xl text-center mb-5">
          {error}
        </div>
      )}

      {initialEmail ? (
        <div className="mb-5">
          <AuthEmailBadge email={initialEmail} onEdit={() => router.push("/auth/main")} />
        </div>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!initialEmail && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-[18px] flex items-center pointer-events-none z-10 text-gray-500">
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
              autoFocus
              required
              className="appearance-none rounded-full relative block w-full pl-[50px] pr-4 py-[16px] border border-black/5 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[15px] font-medium bg-white/80 transition-all"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-[15px] px-4 text-[16px] font-semibold rounded-full text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-95 transition-all shadow-[0_4px_12px_rgba(53,134,197,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Envoyer le code"
          )}
        </button>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full flex justify-center items-center gap-2 py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors font-semibold"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour
          </button>
        </div>
      </form>
    </GlassCard>
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthBackground>
      <div className="flex-1 flex flex-col items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <Suspense
          fallback={
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <ForgotPasswordForm />
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
