import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchGraphQL } from "@/lib/api";
import { getMediaVariant, formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const data = await fetchGraphQL(`
      query GetUserMeta($id: ID!) {
        user(id: $id) {
          name
          picture
          bio
        }
      }
    `, { id: resolvedParams.id });

    const user = data?.user;
    if (!user) return {
      title: 'Profil introuvable | Autheeka'
    };

    const imageUrl = user.picture ? getMediaVariant(user.picture, 'medium') : undefined;
    // The bio describes the profile best, when there is one
    const description = user.bio || `Découvrez le profil et les événements de ${user.name} sur Autheeka.`;
    return {
      title: `${user.name} | Autheeka`,
      description,
      openGraph: {
        title: `${user.name} | Autheeka`,
        description,
        images: imageUrl ? [
          {
            url: imageUrl,
            width: 800,
            height: 800,
            alt: user.name,
          },
        ] : [],
      },
      twitter: {
        card: 'summary',
        title: `${user.name} | Autheeka`,
        description: `Découvrez le profil et les événements de ${user.name} sur Autheeka.`,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    return { title: 'Profil | Autheeka' };
  }
}

const VerifiedBadge = ({ badge, className = "w-5 h-5" }: { badge: string, className?: string }) => {
  if (badge !== 'GOLD' && badge !== 'SILVER') return null;
  const color = badge === 'GOLD' ? 'text-green-500' : 'text-blue-500';
  return (
    <svg className={`${className} ${color}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 11.99l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 11.99l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 11.99zm-13.06 5.1l-3.83-3.83 1.41-1.41 2.42 2.41 5.66-5.65 1.41 1.41-7.07 7.07z" />
    </svg>
  );
}

// Simple SVG Icons for Social Media
const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'whatsapp':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;
    case 'facebook':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
    case 'instagram':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
    case 'tiktok':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.96-1.74 5.56-1.67 2.16-4.48 3.32-7.14 2.82-2.85-.53-5.27-2.62-6.04-5.38-.82-2.91.24-6.19 2.65-8.1 2.1-1.67 5.04-2.22 7.57-1.45V13c-1.5-.47-3.25-.13-4.46 1.01-1.27 1.2-1.57 3.2-.67 4.71.93 1.56 3.03 2.14 4.71 1.27 1.35-.7 2.1-2.2 2.1-3.79V.02z" /></svg>;
    case 'x':
      return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
    default:
      return null;
  }
};

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const userId = resolvedParams.id;

  const data = await fetchGraphQL(`
    query GetUserProfile($id: ID!) {
      user(id: $id) {
        id
        name
        picture
        bio
        badge
        whatsapp
        facebook
        instagram
        tiktok
        x
        stats {
          events
          actualities
          followers
        }
      }
      userEvents(userId: $id, page: 0) {
        id
        title
        picture
        category
        location
        date
        price
      }
    }
  `, { id: userId });

  const user = data?.user || null;
  const events = data?.userEvents || [];

  if (!user) {
    notFound();
  }

  const avatarUrl = getMediaVariant(user.picture, 'medium');

  // Same order and colors as the app (dark green: the light one is too pale as text)
  const socialLinks = [
    { type: 'whatsapp', value: user.whatsapp, url: `https://wa.me/${user.whatsapp}`, label: 'WhatsApp', color: '#128C7E' },
    { type: 'instagram', value: user.instagram, url: `https://www.instagram.com/${user.instagram}`, label: 'Instagram', color: '#E4405F' },
    { type: 'facebook', value: user.facebook, url: `https://www.facebook.com/${user.facebook}`, label: 'Facebook', color: '#1877F2' },
    { type: 'tiktok', value: user.tiktok, url: `https://www.tiktok.com/@${user.tiktok}`, label: 'TikTok', color: '#111827' },
    { type: 'x', value: user.x, url: `https://x.com/${user.x}`, label: 'X', color: '#111827' },
  ].filter((link) => link.value);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HERO, same as the app: banner with a curved edge, avatar overlapping it */}
      <div className="relative w-full h-36 sm:h-44 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-600/65">
        {/* App pattern in light white */}
        <img
          src="/images/profile_hero.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover brightness-0 invert opacity-25"
        />
        {/* Curved edge: low on the avatar side, rising to the right.
            1px lower than the banner: no thin line of the gradient left below it */}
        <svg
          className="absolute -bottom-px left-0 block w-full h-[25px] text-gray-50"
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,24 C35,24 65,0 100,0 L100,24 Z" />
        </svg>
      </div>

      <div className="mx-4 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 -mt-12 relative z-10">
        {/* Avatar and, beside it in its part below the banner, the counters */}
        <div className="flex items-end gap-3">
          {/* Avatar, with a ring in the page color */}
          <div className="w-[96px] h-[96px] shrink-0 rounded-full p-1 bg-gray-50">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
              {user.picture ? (
                <img src={avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600 text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {user.stats && (
            <div className="flex-1 flex justify-evenly pb-1">
              {[
                { value: user.stats.events, label: "Événements" },
                { value: user.stats.actualities, label: "Actualités" },
                { value: user.stats.followers, label: "Abonnés" },
              ].map((counter) => (
                <div key={counter.label}>
                  <div className="text-lg font-bold text-gray-900">{counter.value}</div>
                  <div className="text-sm text-gray-500">{counter.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Name and badge */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 truncate">{user.name}</h1>
          <VerifiedBadge badge={user.badge} className="w-5 h-5 shrink-0" />
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="mt-2 max-w-xl text-gray-700 leading-relaxed whitespace-pre-line">{user.bio}</p>
        )}
      </div>

      {/* Social links: pills with the platform name, scrolling sideways */}
      {socialLinks.length > 0 && (
        <div className="mt-3 overflow-x-auto">
          <div className="flex gap-2 w-max px-4 sm:px-12 md:px-24 lg:px-40 xl:px-64">
            {socialLinks.map((link) => (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ color: link.color, backgroundColor: `${link.color}1F` }}
              >
                <SocialIcon type={link.type} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT (CONSTRAINED) */}
      <main className="flex-1 mx-4 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 mt-6 relative z-20 pb-20">

        {/* Events Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-gray-900 pb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <h2 className="text-xl font-bold">Événements créés</h2>
          </div>

          {events && events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((evt: any) => (
                <Link href={`/event/${evt.id}`} key={evt.id} className="block group">
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
                    <img
                      src={getMediaVariant(evt.picture, 'medium')}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay for card text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                    {/* Card Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
                      <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
                        {evt.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/90">
                        <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span className="text-sm font-medium">{formatDate(evt.date)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-gray-500">
              <svg className="w-16 h-16 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <p className="font-medium text-lg">Aucun événement à afficher</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
