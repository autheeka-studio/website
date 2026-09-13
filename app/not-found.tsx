import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 w-full bg-[#f3f4f6] min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-[100px] font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-800 leading-none mb-4 select-none">
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Oups ! Page introuvable
        </h2>
        <p className="text-gray-500 mb-10 text-lg">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors shadow-[0_4px_12px_var(--color-blue-500)] shadow-blue-500/30"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
