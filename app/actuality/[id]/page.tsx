"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function ActualityRedirectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ userId?: string }>;
}) {
  const resolvedParams = use(params);
  const { userId } = use(searchParams);
  const [redirectFailed, setRedirectFailed] = useState(false);

  useEffect(() => {
    // L'app charge les actualités par auteur : userId est requis
    const deepLink = `autheeka://actuality/${resolvedParams.id}?userId=${userId ?? ""}`;
    
    // Attempt to redirect to the app
    window.location.href = deepLink;

    // Set a timeout to show the fallback UI if the app doesn't open
    const timeout = setTimeout(() => {
      setRedirectFailed(true);
    }, 2500);

    // If the user navigates away (e.g. app opens), clear timeout
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timeout);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [resolvedParams.id, userId]);

  return (
    <main className="flex-1 w-full bg-gray-50 min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
        {!redirectFailed ? (
          <>
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Ouverture de l'application...</h1>
            <p className="text-gray-500">Découvrez cette actualité en vidéo directement dans l'application mobile Autheeka.</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Application introuvable</h1>
            <p className="text-gray-500 mb-8">Il semble que vous n'ayez pas encore l'application Autheeka. Téléchargez-la pour visionner toutes les actualités !</p>
            
            <div className="flex justify-center mt-6">
              <a 
                href="https://play.google.com/store/apps/details?id=com.autheeka.ticketing"
                className="hover:-translate-y-1 transition-transform inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Disponible sur Google Play"
                  className="h-[52px] rounded-lg"
                />
              </a>
            </div>

            <div className="mt-8">
              <Link href="/explore" className="text-blue-600 font-semibold hover:underline">
                Retour à l'accueil
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
