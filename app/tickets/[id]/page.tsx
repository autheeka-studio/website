"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { fetchGraphQL } from "@/lib/api";
import {
  GET_TICKET_DETAILS,
  GET_TICKET_CODE,
  CANCEL_TICKET,
} from "@/lib/graphql/ticket";
import { getMediaVariant } from "@/lib/utils";
import Link from "next/link";
import Cookies from "js-cookie";
import { QRCode } from "react-qrcode-logo";

export default function TicketDetailsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const ticketId = params.id as string;

  const [ticket, setTicket] = useState<any>(null);
  const [ticketCode, setTicketCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/main");
    }
  }, [isLoading, isAuthenticated, router]);

  const loadTicketDetails = async () => {
    if (!isAuthenticated || !ticketId) return;
    try {
      setLoading(true);
      const token = Cookies.get("autheeka_token");

      // 1. Fetch ticket details first
      const detailsData = await fetchGraphQL(GET_TICKET_DETAILS, { id: ticketId }, token);

      if (detailsData?.ticket) {
        setTicket(detailsData.ticket);

        // 2. Fetch ticket code only if the ticket is paid and selfPurchase is true
        if (detailsData.ticket.payment?.paid !== false && detailsData.ticket.selfPurchase !== false) {
          try {
            const codeData = await fetchGraphQL(GET_TICKET_CODE, { id: ticketId }, token);
            if (codeData?.ticketCode) {
              setTicketCode(codeData.ticketCode);
            }
          } catch {
            // Non-blocking code fetch error
          }
        }
      } else {
        setError("Billet introuvable.");
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des détails du billet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicketDetails();
  }, [isAuthenticated, ticketId]);

  const handleCancelTicket = async () => {
    if (!confirm("Êtes-vous sûr de vouloir annuler ce billet impayé ?")) return;
    try {
      setActionLoading(true);
      const token = Cookies.get("autheeka_token");
      const res = await fetchGraphQL(CANCEL_TICKET, { ticketId }, token);
      if (res?.cancelTicket) {
        router.push("/tickets");
      } else {
        alert("Impossible d'annuler le billet.");
      }
    } catch (err: any) {
      alert(err.message || "Erreur lors de l'annulation du billet");
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex-1 w-full bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="flex-1 w-full bg-gray-50 min-h-[calc(100vh-64px)] py-8 md:py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6">

        <div className="mb-6">
          <Link href="/tickets" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à mes tickets
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : ticket ? (
          <div className="space-y-6">

            {/* Ticket Payment Status / QR Code Section */}
            {ticket.payment?.paid === false ? (
              <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-900">Paiement en attente</h3>
                  <p className="text-amber-700 text-sm mt-1">
                    Finalisez votre paiement dans l'application Autheeka pour valider ce billet et obtenir votre code d'accès.
                  </p>
                  <p className="text-xl font-black text-amber-900 mt-2">
                    {ticket.payment.price} {ticket.payment.currency}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                  {/* The payment is only made in the app, like the purchase */}
                  <Link
                    href={`/buy/${ticket.event.id}`}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Payer dans l'application
                  </Link>
                  <button
                    onClick={handleCancelTicket}
                    disabled={actionLoading}
                    className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-50 text-red-600 border border-red-200 font-bold rounded-xl transition-colors disabled:opacity-50"
                  >
                    Annuler la réservation
                  </button>
                </div>
              </div>
            ) : ticket.selfPurchase !== false ? (
              <div className="bg-white rounded-xl px-6 py-4 shadow-xs border border-gray-100 flex flex-col items-center mx-auto w-min">
                <div className="rounded-3xl mb-2">
                  {ticketCode ? (
                    <QRCode
                      value={ticketCode}
                      size={220}
                      qrStyle="dots"
                      fgColor="#1e3a8a"
                      eyeRadius={200}
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] bg-red-50 flex flex-col items-center justify-center text-red-500 rounded-xl">
                      <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-sm font-semibold">Erreur !</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-500 font-bold text-sm">À présenter à l'entrée</p>
              </div>
            ) : (
              <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-blue-900 font-bold text-lg mb-2">Code Caché</h3>
                <p className="text-blue-700/80 text-sm">Le code QR est masqué car ce billet a été acheté pour vous par une autre personne.</p>
              </div>
            )}

            <hr className="border-gray-200" />

            {/* Event Details */}
            <h2 className="text-lg font-bold text-gray-900 px-2">Détails de l'événement</h2>
            <Link href={`/event/${ticket.event.id}`} className="block bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 shrink-0 overflow-hidden">
                  <img
                    src={getMediaVariant(ticket.event.picture, 'thumbnail')}
                    alt={ticket.event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate mb-1">{ticket.event.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <svg className="w-4 h-4 mr-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{ticket.event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(ticket.event.date).toLocaleDateString("fr-FR", { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Beneficiary Info */}
            <h2 className="text-lg font-bold text-gray-900 px-2 mt-2">Bénéficiaire & Achat</h2>
            <div className="space-y-3">
              {ticket.ownerName && (
                <div className="bg-blue-100/30 p-4 rounded-2xl border border-blue-100/50">
                  <div className="flex items-center text-blue-700 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">Nom du bénéficiaire</span>
                  </div>
                  <p className="font-bold text-gray-900">{ticket.ownerName}</p>
                </div>
              )}

              {ticket.ownerPhone && (
                <div className="bg-blue-100/30 p-4 rounded-2xl border border-blue-100/50">
                  <div className="flex items-center text-blue-700 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">Téléphone</span>
                  </div>
                  <p className="font-bold text-gray-900">{ticket.ownerPhone}</p>
                </div>
              )}

              {ticket.ownerEmail && (
                <div className="bg-blue-100/30 p-4 rounded-2xl border border-blue-100/50">
                  <div className="flex items-center text-blue-700 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">Email</span>
                  </div>
                  <p className="font-bold text-gray-900 truncate">{ticket.ownerEmail}</p>
                </div>
              )}

              <div className="bg-blue-100/30 p-4 rounded-2xl border border-blue-100/50 mt-4">
                <div className="flex items-center text-blue-700 mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">Date d'achat</span>
                </div>
                <p className="font-bold text-gray-900">
                  {new Date(ticket.createdAt).toLocaleDateString("fr-FR", { day: '2-digit', month: 'short', year: 'numeric' })} à {new Date(ticket.createdAt).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 mb-4">
              <Link
                href={`/buy/${ticket.event.id}`}
                className="w-full flex items-center justify-center gap-2 bg-blue-200/80 text-blue-900 font-bold py-3.5 px-6 rounded-full hover:bg-blue-200 transition-colors"
              >
                <svg className="w-5 h-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M224,96a8,8,0,0,1-8,8,24,24,0,0,0,0,48,8,8,0,0,1,8,8v32a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V160a8,8,0,0,1,8-8,24,24,0,0,0,0-48,8,8,0,0,1-8-8V64A16,16,0,0,1,48,48H208a16,16,0,0,1,16,16Zm-16-32H48V82a40,40,0,0,1,0,92v18H208V174a40,40,0,0,1,0-92ZM96,160a8,8,0,0,1-8-8V104a8,8,0,0,1,16,0v48A8,8,0,0,1,96,160Zm32,0a8,8,0,0,1-8-8V104a8,8,0,0,1,16,0v48A8,8,0,0,1,128,160Zm32,0a8,8,0,0,1-8-8V104a8,8,0,0,1,16,0v48A8,8,0,0,1,160,160Z" />
                </svg>
                Réserver un autre billet
              </Link>
            </div>

          </div>
        ) : null}

      </div>
    </main>
  );
}
