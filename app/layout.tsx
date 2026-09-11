import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Autheeka - Événements, Billetterie & Accès Sécurisé",
  description: "Découvrez Autheeka, le réseau social événementiel avec billetterie sécurisée et scan ultra-rapide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
        <header className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center">
                <img src="/logo_text.png" alt="Autheeka" className="h-6 w-auto" />
              </a>
            </div>
            <nav className="hidden md:flex gap-6 font-semibold text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Explorer</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Créer un événement</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Aide</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="#" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">Connexion</a>
              <a href="#" className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">S'inscrire</a>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col">
          {children}
        </div>

        <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <img src="/logo_text.png" alt="Autheeka" className="h-6 w-auto grayscale opacity-80" />
                <p className="mt-4 text-gray-500 text-sm max-w-sm">Le réseau social événementiel avec billetterie sécurisée et scan ultra-rapide. Vivez l'expérience à fond.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Légal</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-blue-600">Conditions générales</a></li>
                  <li><a href="#" className="hover:text-blue-600">Confidentialité</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-blue-600">Support</a></li>
                  <li><a href="#" className="hover:text-blue-600">Partenariats</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
              © {new Date().getFullYear()} Autheeka. Tous droits réservés.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
