export const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`rounded-3xl shadow-[0_16px_32px_rgba(0,0,0,0.15)] bg-white/65 backdrop-blur-[24px] border border-white/30 p-8 sm:p-10 max-w-md w-full mx-auto ${className}`}>
      {children}
    </div>
  );
};
