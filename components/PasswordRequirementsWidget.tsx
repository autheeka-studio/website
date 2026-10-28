"use client";

import React, { useMemo } from "react";

interface PasswordRequirementsWidgetProps {
  password: string;
  confirmPassword?: string;
  showSuggestion?: boolean;
  onSuggest?: (suggested: string) => void;
}

export function hasMinLength(password: string): boolean {
  return password.length >= 8;
}

export function hasUppercase(password: string): boolean {
  return /[A-Z]/.test(password);
}

export function hasLowercase(password: string): boolean {
  return /[a-z]/.test(password);
}

export function hasDigits(password: string): boolean {
  return /[0-9]/.test(password);
}

export function matches(password: string, confirmPassword?: string): boolean {
  return (
    !!confirmPassword &&
    confirmPassword.length > 0 &&
    password === confirmPassword
  );
}

export function isStrong(password: string): boolean {
  return (
    hasMinLength(password) &&
    hasUppercase(password) &&
    hasLowercase(password) &&
    hasDigits(password)
  );
}

export function isPasswordValid(password: string, confirmPassword?: string): boolean {
  const strong = isStrong(password);
  if (confirmPassword === undefined) return strong;
  return strong && matches(password, confirmPassword);
}

export function generateStrongPassword(length = 12): string {
  const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijkmnopqrstuvwxyz";
  const numberChars = "23456789";
  const allChars = `${uppercaseChars}${lowercaseChars}${numberChars}`;

  const getRandomInt = (max: number) => {
    if (typeof window !== "undefined" && window.crypto) {
      const arr = new Uint32Array(1);
      window.crypto.getRandomValues(arr);
      return arr[0] % max;
    }
    return Math.floor(Math.random() * max);
  };

  const chars: string[] = [
    uppercaseChars[getRandomInt(uppercaseChars.length)],
    lowercaseChars[getRandomInt(lowercaseChars.length)],
    numberChars[getRandomInt(numberChars.length)],
  ];

  for (let i = 3; i < length; i++) {
    chars.push(allChars[getRandomInt(allChars.length)]);
  }

  // Shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  const pwd = chars.join("");
  if (isStrong(pwd)) return pwd;
  return generateStrongPassword(length);
}

export function PasswordRequirementsWidget({
  password,
  confirmPassword,
  showSuggestion = true,
  onSuggest,
}: PasswordRequirementsWidgetProps) {
  const minLengthValid = useMemo(() => hasMinLength(password), [password]);
  const uppercaseValid = useMemo(() => hasUppercase(password), [password]);
  const lowercaseValid = useMemo(() => hasLowercase(password), [password]);
  const digitsValid = useMemo(() => hasDigits(password), [password]);
  const matchValid = useMemo(
    () => (confirmPassword !== undefined ? matches(password, confirmPassword) : true),
    [password, confirmPassword]
  );

  const handleSuggest = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSuggest) {
      const suggested = generateStrongPassword();
      onSuggest(suggested);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-black/5 p-4 space-y-2 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
          Exigences de sécurité
        </span>
        {showSuggestion && onSuggest && (
          <button
            type="button"
            onClick={handleSuggest}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
            </svg>
            Suggérer un mot de passe
          </button>
        )}
      </div>

      <div className="space-y-1.5 pt-1">
        <RequirementItem label="Au moins 8 caractères" isValid={minLengthValid} />
        <RequirementItem label="Au moins une lettre majuscule (A-Z)" isValid={uppercaseValid} />
        <RequirementItem label="Au moins une lettre minuscule (a-z)" isValid={lowercaseValid} />
        <RequirementItem label="Au moins un chiffre (0-9)" isValid={digitsValid} />
        {confirmPassword !== undefined && (
          <RequirementItem label="Les mots de passe correspondent" isValid={matchValid} />
        )}
      </div>
    </div>
  );
}

function RequirementItem({ label, isValid }: { label: string; isValid: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
          isValid ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"
        }`}
      >
        <svg
          className="w-2.5 h-2.5 stroke-[3]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span
        className={`text-[13px] font-medium transition-colors ${
          isValid ? "text-emerald-700" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
