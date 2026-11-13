import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/lib/AuthContext";
import { AuthNav } from "@/components/AuthNav";
import { MobileNav } from "@/components/MobileNav";
import { DesktopNav } from "@/components/DesktopNav";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Autheeka - Événements, Billetterie & Accès Sécurisé",
  description: "Découvrez Autheeka, le réseau social événementiel avec billetterie sécurisée et scan ultra-rapide.",
  icons: {
    icon: "/logo_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
        <GoogleOAuthProvider clientId="807727177798-38gu4jfsscdtnh9otl9r7temp9sanq9a.apps.googleusercontent.com">
          <AuthProvider>
            <header className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a href="/" className="flex items-center">
                    <img src="/logo_text.png" alt="Autheeka" className="h-6 w-auto" />
                  </a>
                </div>
                <DesktopNav />
                <div className="flex items-center gap-3">
                  <AuthNav />
                  <MobileNav />
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
                    <p className="mt-4 text-gray-500 text-sm max-w-sm">Des événements authentiques, des billets infalsifiables et une entrée en un scan. L’esprit tranquille, du billet à l’entrée.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Légal</h3>
                    <ul className="space-y-2 text-sm text-gray-500">
                      <li><Link href="/terms" className="hover:text-blue-600">Conditions générales</Link></li>
                      <li><Link href="/privacy-policy" className="hover:text-blue-600">Confidentialité</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm text-gray-500">
                      <li><Link href="/about" className="hover:text-blue-600">À propos</Link></li>
                      <li><a href="mailto:support@autheeka.com" className="hover:text-blue-600">Support</a></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
                  © {new Date().getFullYear()} Autheeka. Tous droits réservés.
                </div>
              </div>
            </footer>
          </AuthProvider>
        </GoogleOAuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
 