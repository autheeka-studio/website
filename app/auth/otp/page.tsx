"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { AuthBackground } from "@/components/AuthBackground";
import { GlassCard } from "@/components/GlassCard";

function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confirmEmail } = useAuth();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      router.push("/auth/main");
    }
  }, [email, router]);

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
    const nextEmptyIndex = newOtp.findIndex(val => val === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Veuillez entrer le code complet.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await confirmEmail(email, otpCode);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <GlassCard className="relative z-10 w-full max-w-[400px]">
      <div className="text-center mb-8">
        <h2 className="text-[24px] font-bold text-[#1e293b] mb-2 tracking-tight">
          Vérification du code
        </h2>
        <p className="text-sm font-medium text-black/60">
          Entrez le code que nous avons envoyé à votre adresse e-mail.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-2xl text-center">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center gap-2">
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
              className={`w-12 h-14 text-center text-2xl font-bold bg-white/80 rounded-xl border ${error ? 'border-red-500 focus:border-red-500' : 'border-black/5 focus:border-blue-500'} focus:outline-none focus:border-[1.5px] text-gray-900 transition-all`}
            />
          ))}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-[16px] px-4 text-[16px] font-semibold rounded-full text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition-all shadow-[0_4px_12px_var(--color-blue-500)] shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Vérifier le code"
            )}
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-black/60 font-medium">
            Vous n'avez pas reçu de code ?{" "}
            <button type="button" className="text-blue-500 font-semibold hover:text-blue-600 transition-colors">
              Renvoyer
            </button>
          </p>
        </div>

        <div className="mt-4 pt-2">
          <button
            type="button"
            onClick={() => router.push(`/auth/email?isLogin=false&email=${encodeURIComponent(email)}`)}
            className="w-full flex justify-center items-center gap-2 py-2 text-sm text-blue-500 hover:text-blue-600 transition-colors font-semibold"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Annuler
          </button>
        </div>
      </form>
    </GlassCard>
  );
}

export default function OtpPage() {
  return (
    <AuthBackground>
      <div className="w-full flex flex-col items-center justify-center p-6 min-h-[100dvh]">
        {/* <div className="mb-10 w-full max-w-[400px] flex justify-center items-center gap-2">
          <img src="/logo_icon.png" alt="Autheeka Icon" className="h-6" />
          <img src="/logo_text.png" alt="Autheeka Text" className="h-6" />
        </div> */}

        <Suspense fallback={<div className="flex justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
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
