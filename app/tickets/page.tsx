"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { fetchGraphQL } from "@/lib/api";
import { GET_MY_TICKETS } from "@/lib/graphql/ticket";
import { getMediaVariant } from "@/lib/utils";
import Link from "next/link";
import Cookies from "js-cookie";

export default function MyTicketsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/main");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const loadTickets = async () => {
      if (!isAuthenticated) return;
      try {
        setLoadingTickets(true);
        const token = Cookies.get("autheeka_token");
        // Fetch only unused tickets (used: false)
        const data = await fetchGraphQL(GET_MY_TICKETS, { fetchAll: true, used: false, page: 0 }, token);
        if (data?.myTickets) {
          setTickets(data.myTickets);
        }
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des tickets");
      } finally {
        setLoadingTickets(false);
      }
    };

    loadTickets();
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex-1 w-full bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="flex-1 w-full bg-[#f3f4f6] min-h-[calc(100vh-64px)] py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Mes Tickets</h1>
          <p className="text-gray-500 mt-2">Retrouvez ici vos tickets valides pour vos prochains événements.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium">
            {error}
          </div>
        )}

        {loadingTickets ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : tickets.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun ticket trouvé</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Vous n'avez pas encore de ticket valide. Parcourez les événements pour trouver votre prochaine expérience !
            </p>
            <Link href="/explore" className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
              Explorer les événements
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/tickets/${ticket.id}`}
                className="block relative transition-transform hover:scale-[1.02] active:scale-[0.98] drop-shadow-sm"
                style={{
                  WebkitMask: 'radial-gradient(circle at 0 6px, transparent 4px, black 4.5px) 0 0 / 51% 12px repeat-y, radial-gradient(circle at 100% 6px, transparent 4px, black 4.5px) 100% 0 / 51% 12px repeat-y',
                  mask: 'radial-gradient(circle at 0 6px, transparent 4px, black 4.5px) 0 0 / 51% 12px repeat-y, radial-gradient(circle at 100% 6px, transparent 4px, black 4.5px) 100% 0 / 51% 12px repeat-y'
                }}
              >
                <div 
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at 0 0, transparent 20px, black 20.5px), radial-gradient(circle at 100% 0, transparent 20px, black 20.5px), radial-gradient(circle at 0 100%, transparent 20px, black 20.5px), radial-gradient(circle at 100% 100%, transparent 20px, black 20.5px)',
                    WebkitMaskComposite: 'destination-in',
                    maskImage: 'radial-gradient(circle at 0 0, transparent 20px, black 20.5px), radial-gradient(circle at 100% 0, transparent 20px, black 20.5px), radial-gradient(circle at 0 100%, transparent 20px, black 20.5px), radial-gradient(circle at 100% 100%, transparent 20px, black 20.5px)',
                    maskComposite: 'intersect'
                  }}
                >
                {/* Background Image Blurred */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={getMediaVariant(ticket.event.picture, 'thumbnail')} 
                    alt="" 
                    className="w-full h-full object-cover blur-md scale-110" 
                  />
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 to-blue-700/90 mix-blend-multiply"></div>
                
                {/* Content Container */}
                <div className="relative z-10 flex flex-col p-5 h-full text-white">
                  {/* Header: Thumbnail + Title */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-[10px] bg-white/50 border border-white/10 shrink-0 overflow-hidden shadow-sm">
                      <img 
                        src={getMediaVariant(ticket.event.picture, 'thumbnail')} 
                        alt={ticket.event.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[17px] font-black uppercase truncate tracking-tight leading-tight drop-shadow-md">
                        {ticket.event.title}
                      </h3>
                      <div className="inline-flex items-center mt-1.5 px-2 py-0.5 bg-white rounded-full shadow-sm w-fit">
                        <span className="text-[11px] font-bold text-green-600 leading-tight">
                          Ticket Valide
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info Cards */}
                  <div className="space-y-2 mb-4">
                    {/* Location */}
                    <div className="flex items-center gap-2.5 p-2.5 rounded-[10px] bg-gradient-to-r from-white/10 to-transparent">
                      <svg className="w-4 h-4 text-white/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm font-semibold truncate">
                        {ticket.event.location}
                      </p>
                    </div>

                    {/* Owner */}
                    <div className="flex items-center gap-2.5 p-2.5 rounded-[10px] bg-gradient-to-r from-white/10 to-transparent">
                      <svg className="w-4 h-4 text-white/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <p className="text-sm font-semibold truncate">
                        {ticket.ownerName}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t-2 border-dashed border-white/40 mt-4 mb-4 w-full"></div>

                  {/* Footer text */}
                  <div className="text-center mt-auto">
                    <p className="text-[13px] font-medium text-white/70 tracking-tight">
                      Cliquez pour voir les détails
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          </div>
        )}

      </div>
    </main>
  );
}
