export const AuthBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden flex items-center justify-center font-poppins">
      {/* Primary Circle */}
      <div className="absolute -top-[50px] -right-[100px] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,_rgba(53,134,197,0.3)_0%,_rgba(53,134,197,0)_70%)] animate-[breath_6s_ease-in-out_infinite_alternate]" />
      
      {/* Secondary Circle */}
      <div className="absolute -bottom-[100px] -left-[150px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(53,134,197,0.2)_0%,_rgba(53,134,197,0)_70%)] animate-[breath-reverse_6s_ease-in-out_infinite_alternate]" />
      
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
