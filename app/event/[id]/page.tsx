import Link from "next/link";
import ShareButton from "./ShareButton";
import { notFound } from "next/navigation";
import { fetchGraphQL } from "@/lib/api";
import { getMediaVariant, formatDate, formatTime } from "@/lib/utils";
import type { Metadata } from "next";
import { excerpt, pageMetadata } from "@/lib/metadata";

const VerifiedBadge = ({ badge, className = "w-5 h-5" }: { badge: string, className?: string }) => {
  if (badge !== 'GOLD' && badge !== 'SILVER') return null;
  const color = badge === 'GOLD' ? 'text-green-500' : 'text-blue-500';
  return (
    <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 11.99l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 11.99l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 11.99zm-13.06 5.1l-3.83-3.83 1.41-1.41 2.42 2.41 5.66-5.65 1.41 1.41-7.07 7.07z" />
    </svg>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const data = await fetchGraphQL(`
      query GetEventMeta($id: ID!) {
        event(id: $id) {
          title
          description
          picture
        }
      }
    `, { id: resolvedParams.id });

    const event = data?.event;
    if (!event) return { title: "Événement introuvable" };

    return {
      ...pageMetadata({
        title: event.title,
        description: excerpt(event.description || "Découvrez cet événement et réservez votre billet sur Autheeka."),
        path: `/event/${resolvedParams.id}`,
        images: [{ url: getMediaVariant(event.picture, "large"), alt: event.title }],
      }),
      twitter: { card: "summary_large_image" },
    };
  } catch (error) {
    return { title: "Événement" };
  }
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const eventId = resolvedParams.id;

  const data = await fetchGraphQL(`
    query GetEvent($id: ID!) {
      event(id: $id) {
        id
        title
        description
        picture
        location
        address
        coordinates {
          latitude
          longitude
        }
        category
        date
        price
        priceCurrency
        createdBy {
          id
          name
          picture
          badge
        }
      }
    }
  `, {
    id: eventId
  });

  const event = data.event || null;

  if (!event) {
    notFound();
  }

  // Google Maps search on the exact position when given, else on the address
  const mapsQuery = event.coordinates
    ? `${event.coordinates.latitude},${event.coordinates.longitude}`
    : event.address;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-12">
      {/* FULL WIDTH BANNER */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-gray-200">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={getMediaVariant(event.picture, 'large')}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/20 to-transparent"></div>

        {/* Floating Buttons (Aligned with content) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="mx-4 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 h-full relative">
            <Link href="/" className="absolute top-6 left-4 sm:left-6 lg:left-8 z-10 w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md text-white rounded-full hover:bg-black/40 transition-colors pointer-events-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </Link>

            <ShareButton title={event.title} text={event.description} />
          </div>
        </div>
      </div>

      <main className="flex-1 mx-4 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 relative z-20 -mt-24">
        {/* Content Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tight mb-2">
            {event.title}
          </h1>

          <p className="text-lg text-gray-600 font-medium leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Category */}
            <div className="bg-blue-600/5 border border-blue-600/10 p-3 rounded-2xl">
              <div className="flex items-center gap-1.5 text-blue-600 mb-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                <span className="text-sm font-semibold opacity-80">Catégorie</span>
              </div>
              <div className="font-bold text-gray-900 truncate">{event.category}</div>
            </div>

            {/* Price */}
            <div className="bg-blue-600/5 border border-blue-600/10 p-3 rounded-2xl">
              <div className="flex items-center gap-1.5 text-blue-600 mb-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                <span className="text-sm font-semibold opacity-80">Prix</span>
              </div>
              <div className="font-bold text-gray-900 truncate">
                {event.price === 0 ? "Gratuit" : `${event.price} ${event.priceCurrency}`}
              </div>
            </div>

            {/* Date */}
            <div className="bg-blue-600/5 border border-blue-600/10 p-3 rounded-2xl">
              <div className="flex items-center gap-1.5 text-blue-600 mb-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span className="text-sm font-semibold opacity-80">Date</span>
              </div>
              <div className="font-bold text-gray-900 truncate capitalize">{formatDate(event.date)}</div>
            </div>

            {/* Time */}
            <div className="bg-blue-600/5 border border-blue-600/10 p-3 rounded-2xl">
              <div className="flex items-center gap-1.5 text-blue-600 mb-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-sm font-semibold opacity-80">Heure</span>
              </div>
              <div className="font-bold text-gray-900 truncate">{formatTime(event.date)}</div>
            </div>
          </div>

          {/* Venue name */}
          <div className="bg-blue-600/5 border border-blue-600/10 p-3 rounded-2xl mb-3">
            <div className="flex items-center gap-1.5 text-blue-600 mb-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span className="text-sm font-semibold opacity-80">Lieu</span>
            </div>
            <div className="font-bold text-gray-900 line-clamp-2">{event.location}</div>
          </div>

          {/* Exact address, opened in Google Maps */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-blue-600/5 border border-blue-600/10 hover:bg-blue-600/10 transition-colors p-3 rounded-2xl mb-8"
          >
            <div className="flex items-center gap-1.5 text-blue-600 mb-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
              <span className="text-sm font-semibold opacity-80">Adresse</span>
              {/* Shows that the card opens the map */}
              <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </div>
            <div className="font-bold text-gray-900 line-clamp-2">{event.address}</div>
          </a>

          {/* Organizer */}
          <h2 className="text-lg font-bold mb-3">Organisé par</h2>
          <Link href={`/user/${event.createdBy.id}`} className="flex items-center gap-3 p-3 rounded-full vborder   shadow-sm bg-blue-100 hover:bg-blue-200 transition-colors group">
            {event.createdBy.picture ? (
              <img
                src={getMediaVariant(event.createdBy.picture, 'thumbnail')}
                alt={event.createdBy.name}
                className="w-12 h-12 rounded-full object-cover bg-gray-100 group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold group-hover:scale-105 transition-transform">
                {event.createdBy.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <div className="font-bold text-gray-900 flex items-center gap-1.5">
                {event.createdBy.name}
                <VerifiedBadge badge={event.createdBy.badge} className="w-5 h-5" />
              </div>
              <div className="text-sm text-blue-600 font-medium">Voir le profil</div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </Link>
        </div>

        {/* Sticky Action Button inside the main container */}
        <div className="sticky bottom-8 z-50 mt-8">
          <Link
            href={`/buy/${resolvedParams.id}`}
            className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-600/30 transition-transform active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
            <span>Réserver un billet</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
