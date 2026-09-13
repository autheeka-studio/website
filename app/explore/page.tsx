import type { Metadata } from "next";
import { fetchGraphQL } from "@/lib/api";
import { getMediaVariant } from "@/lib/utils";
import Link from "next/link";
import { GET_HOME_FEED, GET_LAST_ACTUALITIES_COVERS } from "@/lib/graphql/event";

export const metadata: Metadata = {
  title: "Explorer les événements | Autheeka",
  description: "Découvrez les meilleurs événements à venir avec Autheeka.",
};

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const VerifiedBadge = ({ badge, className = "w-4 h-4" }: { badge: string, className?: string }) => {
  if (badge !== 'GOLD' && badge !== 'SILVER') return null;
  const color = badge === 'GOLD' ? 'text-green-500' : 'text-blue-500';
  return (
    <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 11.99l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 11.99l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 11.99zm-13.06 5.1l-3.83-3.83 1.41-1.41 2.42 2.41 5.66-5.65 1.41 1.41-7.07 7.07z" />
    </svg>
  );
}

export default async function ExplorePage() {
  // Fetch the first page of the home feed and the top actualities concurrently
  const [feedData, actuData] = await Promise.all([
    fetchGraphQL(GET_HOME_FEED, { page: 0 }),
    fetchGraphQL(GET_LAST_ACTUALITIES_COVERS, { page: 0 })
  ]);

  const feedBlocks = feedData?.getHomeFeed || [];
  const topActualities = actuData?.lastActualitiesCovers || [];

  return (
    <main className="flex-1 w-full bg-gray-50 min-h-screen pb-20 pt-0">
      <div className="mx-4 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64">


        {/* Top Actualities Row (Like Flutter App Sliver) */}
        {topActualities.length > 0 && (
          <div className="-mx-4 sm:-mx-12 md:-mx-24 lg:-mx-40 xl:-mx-64 bg-gradient-to-br from-blue-600/30 to-indigo-600/15 py-8">
            <div className="flex overflow-x-auto pb-4 px-4 sm:px-12 md:px-24 lg:px-40 xl:px-64 gap-3 hide-scrollbar after:content-[''] after:w-px after:shrink-0">
              {topActualities.map((actuality: any) => {
                const isViewed = actuality.isViewed;
                return (
                  <Link
                    key={actuality.id}
                    href={`/actuality/${actuality.id}`}
                    className={`shrink-0 w-[100px] h-[140px] group flex flex-col rounded-[25px] overflow-hidden relative cursor-pointer border-[2px] p-[1.5px] transition-transform hover:scale-100 ${isViewed ? 'border-gray-600' : 'border-blue-600'}`}
                    title="Voir cette actualité dans l'application"
                  >
                    <div className="w-full h-full rounded-[23px] overflow-hidden relative bg-gray-800">
                      {actuality.picture ? (
                        <img
                          src={getMediaVariant(actuality.picture, 'medium')}
                          alt={actuality.user?.name || "Actualité"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 8" />
                          </svg>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>

                      {actuality.user?.picture && (
                        <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-[#242424] overflow-hidden bg-gray-800 z-10">
                          <img
                            src={getMediaVariant(actuality.user.picture, 'thumbnail')}
                            alt={actuality.user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="absolute bottom-2 left-1 right-1 z-10 px-0.5">
                        <p className="text-[11.5px] font-bold text-white drop-shadow-md line-clamp-2 leading-tight text-center">
                          {actuality.user?.name}
                          {actuality.user?.badge && (
                            <span className="inline-block align-middle ml-0.5 relative -top-[1px]">
                              <VerifiedBadge badge={actuality.user.badge} className="w-3 h-3" />
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-10 mt-12">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Explorez</h1>
          <p className="text-gray-500 mt-2">Découvrez les meilleurs événements du moment.</p>
        </div>

        <div className="space-y-12">
          {feedBlocks.map((block: any, index: number) => {
            const typename = block.__typename;

            if (typename === "BigEventCardBlock") {
              const event = block.event;
              return (
                <div key={`big-${block.id || index}`} className="w-full pb-6">
                  <Link href={`/event/${event.id}`} className="block group">
                    <div className="relative w-full aspect-[4/5] md:aspect-[2/1] rounded-[24px] overflow-hidden shadow-md">
                      <img
                        src={getMediaVariant(event.picture, 'large')}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Top Left: Date Badge */}
                      <div className="absolute top-4 md:top-6 left-4 md:left-6 min-w-[60px] md:min-w-[70px] px-2 py-2.5 md:py-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col items-center justify-center z-10">
                        <span className="text-[10px] md:text-xs font-semibold text-white/70 tracking-[0.1em] uppercase">
                          {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}
                        </span>
                        <span className="text-xl md:text-[28px] font-black text-white leading-[1.1] mt-0.5">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>

                      {/* Top Right: Time Badge */}
                      <div className="absolute top-4 md:top-6 right-4 md:right-6 min-w-[60px] md:min-w-[70px] px-2 py-2.5 md:py-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col items-center justify-center z-10">
                        <span className="text-[10px] md:text-xs font-semibold text-white/70 tracking-[0.1em] uppercase">
                          HEURE
                        </span>
                        <span className="text-lg md:text-xl font-black text-white leading-[1.1] mt-1">
                          {new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')}
                        </span>
                      </div>

                      {/* Gradient matching EventCard2 (transparent to #242424) */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#242424] opacity-90"></div>

                      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wider">
                            {event.category}
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-white text-shadow-2xl leading-tight mb-4 transition-colors">
                          {event.title}
                        </h3>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-200">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-blue-400" />
                            <span className="font-medium text-base">
                              {new Date(event.date).toLocaleDateString("fr-FR", {
                                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-5 h-5 text-blue-400" />
                            <span className="font-medium text-base truncate max-w-[200px]">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }

            if (typename === "HorizontalEventListBlock") {
              if (!block.events || block.events.length === 0) return null;

              const useAppCloneDesign = Math.random() > 0.5;

              return (
                <div key={`horizontal-container-${block.index || index}`} className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{block.title}</h2>
                  </div>

                  {useAppCloneDesign ? (
                    <div className="flex overflow-x-auto pb-6 -mx-4 sm:-mx-12 md:-mx-24 lg:-mx-40 xl:-mx-64 px-4 sm:px-12 md:px-24 lg:px-40 xl:px-64 gap-3 hide-scrollbar">
                      {/* Horizontal scroll container (App Clone) */}
                      {block.events.map((event: any) => (
                        <Link
                          href={`/event/${event.id}`}
                          key={event.id}
                          className="shrink-0 w-[140px] md:w-[170px] lg:w-[200px] aspect-[0.75] group relative bg-gray-100 rounded-[16px] overflow-hidden shadow-sm"
                        >
                          {/* Background Image */}
                          <img
                            src={getMediaVariant(event.picture, 'medium')}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Gradient Overlay (matching MinimalEventCard) */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90"></div>

                          {/* Content at Bottom */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 flex flex-col justify-end">
                            <h3 className="text-sm md:text-base lg:text-lg font-bold text-white leading-[1.2] mb-1 line-clamp-2">
                              {event.title}
                            </h3>
                            <div className="flex items-center text-white/70 text-xs md:text-sm">
                              <CalendarIcon className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 shrink-0" />
                              <span className="truncate">
                                {new Date(event.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex overflow-x-auto pb-6 -mx-4 sm:-mx-12 md:-mx-24 lg:-mx-40 xl:-mx-64 px-4 sm:px-12 md:px-24 lg:px-40 xl:px-64 gap-6 hide-scrollbar">
                      {/* Horizontal scroll container (Old Web Design) */}
                      {block.events.map((event: any) => (
                        <Link
                          href={`/event/${event.id}`}
                          key={`old-${event.id}`}
                          className="shrink-0 w-[280px] md:w-[320px] group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <img
                              src={getMediaVariant(event.picture, 'large')}
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                              <div className="text-center">
                                <div className="text-xs font-bold text-blue-600 uppercase leading-none mb-1">
                                  {new Date(event.date).toLocaleDateString("fr-FR", { month: "short" })}
                                </div>
                                <div className="text-xl font-black text-gray-900 leading-none">
                                  {new Date(event.date).getDate()}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {event.title}
                            </h3>
                            <div className="mt-auto space-y-2">
                              <div className="flex items-center text-gray-500 text-sm">
                                <MapPinIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0 mr-1" />
                                <span className="truncate max-w-[200px] md:max-w-none">{event.location}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Optional: Handle EventActualitiesBlock if needed on the web

            return null;
          })}

          {feedBlocks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Aucun événement à afficher pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
