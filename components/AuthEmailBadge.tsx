"use client";

interface AuthEmailBadgeProps {
  email: string;
  onEdit?: () => void;
}

export function AuthEmailBadge({ email, onEdit }: AuthEmailBadgeProps) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="w-full flex items-center justify-center gap-3 py-3.5 px-5 bg-blue-500/15 text-[#1e293b] rounded-full hover:bg-blue-500/25 transition-colors group"
    >
      <span className="font-semibold text-[15px] truncate max-w-[85%]">{email}</span>
      <svg
        className="w-4 h-4 text-blue-700 shrink-0 group-hover:scale-110 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </button>
  );
}
