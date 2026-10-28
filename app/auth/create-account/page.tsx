"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthBackground } from "@/components/AuthBackground";
import { GlassCard } from "@/components/GlassCard";
import { AuthEmailBadge } from "@/components/AuthEmailBadge";
import {
  PasswordRequirementsWidget,
  isPasswordValid,
} from "@/components/PasswordRequirementsWidget";

function CreateAccountForm() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/explore");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError("Veuillez renseigner votre email.");
      return;
    }

    if (!name.trim()) {
      setError("Veuillez renseigner votre nom complet.");
      return;
    }

    if (!isPasswordValid(password, confirmPassword)) {
      setError("Le mot de passe ne respecte pas les critères de sécurité.");
      return;
    }

    setLoading(true);

    try {
      await register(name.trim(), cleanEmail, password);
      // Pass encoded email in query param for OTP verification
      router.push(`/auth/otp?email=${encodeURIComponent(cleanEmail)}`);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="relative z-10">
      <div className="mb-6 text-center">
        <h2 className="text-[20px] font-semibold text-[#1e293b] leading-snug">
          Créer un compte
        </h2>
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
              required
              className="appearance-none rounded-full relative block w-full pl-[50px] pr-4 py-[16px] border border-black/5 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[15px] font-medium bg-white/80 transition-all"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {/* Full Name */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-[18px] flex items-center pointer-events-none z-10 text-gray-500">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <input
            type="text"
            name="name"
            autoComplete="name"
            autoFocus
            required
            className="appearance-none rounded-full relative block w-full pl-[50px] pr-4 py-[16px] border border-black/5 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[15px] font-medium bg-white/80 transition-all"
            placeholder="Nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-[18px] flex items-center pointer-events-none z-10 text-gray-500">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-full relative block w-full pl-[50px] pr-12 py-[16px] border border-black/5 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[15px] font-medium bg-white/80 transition-all"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-[18px] flex items-center pointer-events-none z-10 text-gray-500">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            autoComplete="new-password"
            required
            className="appearance-none rounded-full relative block w-full pl-[50px] pr-12 py-[16px] border border-black/5 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[15px] font-medium bg-white/80 transition-all"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirmPassword ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Security / Password requirements checklist with suggestion button */}
        <PasswordRequirementsWidget
          password={password}
          confirmPassword={confirmPassword}
          showSuggestion={true}
          onSuggest={(suggested) => {
            setPassword(suggested);
            setConfirmPassword(suggested);
          }}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-[15px] px-4 text-[16px] font-semibold rounded-full text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-95 transition-all shadow-[0_4px_12px_rgba(53,134,197,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Créer un compte"
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-[14px] text-gray-600">
            Vous avez déjà un compte ?{" "}
            <button
              type="button"
              onClick={() =>
                router.push(
                  initialEmail
                    ? `/auth/login?email=${encodeURIComponent(initialEmail)}`
                    : "/auth/login"
                )
              }
              className="font-semibold text-blue-600 hover:underline inline"
            >
              Se connecter
            </button>
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => router.push("/auth/main")}
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

export default function CreateAccountPage() {
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
          <CreateAccountForm />
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
