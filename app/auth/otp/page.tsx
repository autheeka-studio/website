"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { fetchGraphQL } from "@/lib/api";
import {
  MUTATION_REQUEST_PASSWORD_RESET,
  MUTATION_VERIFY_RESET_PASSWORD_OTP,
} from "@/lib/graphql/auth";
import { AuthBackground } from "@/components/AuthBackground";
import { GlassCard } from "@/components/GlassCard";

function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confirmEmail, isAuthenticated } = useAuth();

  const email = searchParams.get("email") || "";
  const isResetPassword = searchParams.get("reset") === "true";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/explore");
    } else if (!email) {
      router.push("/auth/main");
    }
  }, [isAuthenticated, email, router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6).split("");
    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      if (/^\d$/.test(char) && index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    const nextEmptyIndex = newOtp.findIndex((val) => val === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = async () => {
    if (!isResetPassword || resending || loading) return;
    setResending(true);
    setError("");
    setInfo("");

    try {
      await fetchGraphQL(MUTATION_REQUEST_PASSWORD_RESET, { email });
      setInfo("Un nouveau code de réinitialisation a été envoyé.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setError(err.message || "Impossible de renvoyer le code.");
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Veuillez entrer le code à 6 chiffres.");
      return;
    }

    setLoading(true);
    setError("");
    setInfo("");

    try {
      if (isResetPassword) {
        // Valide le code pour le reset password puis redirige vers /auth/reset-password
        const data = await fetchGraphQL(MUTATION_VERIFY_RESET_PASSWORD_OTP, {
          email,
          otp: otpCode,
        });
        if (data?.verifyResetPasswordOtp === true) {
          router.push(
            `/auth/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(
              otpCode
            )}`
          );
          return;
        }
        throw new Error("Code de réinitialisation invalide.");
      } else {
        // Valide l'inscription
        await confirmEmail(email, otpCode);
        router.push("/explore");
      }
    } catch (err: any) {
      setError(err.message || "Code incorrect ou expiré.");
    } finally {
      setLoading(false);
    }
  };

  // Masked email display like Flutter: "r***@gmail.com"
  const maskEmail = (mail: string) => {
    const parts = mail.split("@");
    if (parts.length !== 2) return mail;
    const name = parts[0];
    const domain = parts[1];
    if (name.length <= 2) return `${name[0]}***@${domain}`;
    return `${name.slice(0, 2)}***@${domain}`;
  };

  if (!email || isAuthenticated) return null;

  return (
    <GlassCard className="relative z-10 w-full max-w-105">
      <div className="text-center mb-6">
        <h2 className="text-[20px] font-semibold text-[#1e293b] mb-2 leading-snug">
          Vérification du code
        </h2>
        <p className="text-[14px] text-gray-600 mb-1">
          Entrez le code envoyé à votre adresse e-mail :
        </p>
        <p className="text-[15px] font-semibold text-blue-600">{maskEmail(email)}</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-600 text-sm font-medium p-3.5 rounded-2xl text-center">
            {error}
          </div>
        )}

        {info && (
          <div className="bg-blue-50 text-blue-600 text-sm font-medium p-3.5 rounded-2xl text-center">
            {info}
          </div>
        )}

        {/* 6 OTP Input Boxes */}
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              autoFocus={index === 0}
              className="w-12 h-13 text-center text-xl font-bold bg-white/80 border border-black/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || otp.join("").length !== 6}
          className="w-full flex justify-center py-3.75 px-4 text-[16px] font-semibold rounded-full text-white bg-linear-to-r from-blue-500 to-blue-700 hover:opacity-95 transition-all shadow-[0_4px_12px_rgba(53,134,197,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Vérifier le code"
          )}
        </button>

        {isResetPassword && (
          <div className="text-center pt-1">
            <p className="text-[14px] text-gray-600">
              Vous n'avez pas reçu le code ?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="font-semibold text-blue-600 hover:underline inline disabled:opacity-50"
              >
                {resending ? "Envoi..." : "Renvoyer"}
              </button>
            </p>
          </div>
        )}

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

export default function OtpPage() {
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
          <OtpForm />
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
