import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { CheckIcon, ScanIcon, ShieldCheckIcon, TicketIcon, UsersIcon } from "@/components/icons";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Autheeka | Billetterie et événements en toute confiance",
    description:
      "Découvrez des événements, achetez des billets infalsifiables et entrez en un scan. Organisateurs vérifiés, paiement MonCash, carte, Apple Pay ou Google Pay.",
    path: "/",
  }),
  // Same segment as the layout: its title template does not apply here
  title: { absolute: "Autheeka | Billetterie et événements en toute confiance" },
};

const PLAY_STORE_URL = "https://play.google.com/apps/testing/com.autheeka.ticketing";

const PILLARS = [
  {
    icon: ShieldCheckIcon,
    title: "Confiance",
    text: "Chaque organisateur vérifie son identité avant de vendre. Chaque billet est unique et ne passe qu’une seule fois à l’entrée : impossible de le copier ou de le revendre deux fois.",
  },
  {
    icon: TicketIcon,
    title: "Simplicité",
    text: "Payez en gourdes, en dollars US ou canadiens, par MonCash, carte, Apple Pay ou Google Pay. Offrez un billet par WhatsApp ou e-mail, même à quelqu’un sans compte.",
  },
  {
    icon: UsersIcon,
    title: "Communauté",
    text: "Suivez vos organisateurs préférés, découvrez les événements près de chez vous et ne ratez aucune annonce, des coulisses jusqu’au jour J.",
  },
];

const AUDIENCES = [
  {
    icon: TicketIcon,
    title: "Pour les participants",
    points: [
      "Des événements près de chez vous : populaires, gratuits, aujourd’hui.",
      "Un billet toujours dans votre poche, protégé par votre empreinte ou votre code.",
      "Achetez pour vous ou pour un proche, il reçoit son billet instantanément.",
      "Le prix affiché est le prix payé, sans frais cachés.",
      "Disponible en français, en anglais et en créole.",
    ],
  },
  {
    icon: ScanIcon,
    title: "Pour les organisateurs",
    points: [
      "Publiez un événement en quelques minutes, depuis votre téléphone.",
      "Contrôlez l’entrée par QR code ou bracelet sans contact (NFC).",
      "Formez votre équipe : chaque manager n’a que les accès que vous lui donnez.",
      "Codes promo, annonces aux détenteurs de billets et statistiques en temps réel.",
      "Aucun abonnement : 10 % uniquement sur les billets vendus.",
    ],
  },
];

const PlayStoreBadge = () => (
  <a href={PLAY_STORE_URL} className="hover:-translate-y-1 transition-transform">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
      alt="Disponible sur Google Play"
      className="h-[52px] rounded-lg"
    />
  </a>
);

export default function Home() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 lg:pt-40 pb-20 min-h-screen flex items-center overflow-x-hidden">
          <div className="mx-6 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 grid lg:grid-cols-2 gap-12 gap-y-24  items-center">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6">
                ✨ Nouveau sur les stores
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                Vos événements, <br />
                <span className="bg-gradient-to-br from-blue-600 to-[#00C6FF] bg-clip-text text-transparent">
                  simplifiés.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-lg">
                Découvrez des événements, achetez des billets infalsifiables et entrez en un scan.
                Des organisateurs vérifiés, des paiements simples, l’esprit tranquille du billet à l’entrée.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <PlayStoreBadge />
                <Link href="/about" className="font-semibold text-blue-600 hover:underline">
                  Comment ça marche →
                </Link>
              </div>
            </div>

            {/* Mockup decoration */}
            <div className="relative mx-auto flex justify-center w-full max-w-sm">
              <div
                className="relative bg-white rounded-[40px] overflow-hidden flex flex-col animate-[float_6s_ease-in-out_infinite]"
                style={{ width: '280px', height: '580px', boxShadow: '0 0 0 10px #F0F4F8, 0 20px 25px -5px rgba(0, 86, 255, 0.1)' }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-[#F0F4F8] rounded-b-[16px] z-10"></div>

                {/* Screen */}
                <div className="flex-1 bg-slate-50 pt-[60px] px-5 pb-5 flex flex-col gap-4">
                  <div className="flex justify-center mb-4">
                    <img src="/logo_text.png" alt="Autheeka" className="h-3.5 w-auto" />
                  </div>


                  <div className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-slate-200 rounded w-[120px] mb-1.5"></div>
                      <div className="h-2 bg-slate-200 rounded w-[80px]"></div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-slate-200 rounded w-[120px] mb-1.5"></div>
                      <div className="h-2 bg-slate-200 rounded w-[80px]"></div>
                    </div>
                  </div>

                  <div className="mt-auto bg-blue-600 text-white text-center p-4 rounded-full font-semibold text-[0.9rem]">
                    Scan Rapide
                  </div>
                </div>
              </div>

              {/* Decorative circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-600/10 to-[#00C6FF]/10 rounded-full blur-[40px] -z-10"></div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section id="features" className="py-20 bg-white">
          <div className="mx-6 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
              Pourquoi Autheeka ?
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
              Un billet n’a de valeur que si on peut lui faire confiance. Autheeka garantit chaque étape, de l’achat à l’entrée.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {PILLARS.map(({ icon: PillarIcon, title, text }) => (
                <div
                  key={title}
                  className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5">
                    <PillarIcon />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{title}</h3>
                  <p className="text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audiences */}
        <section className="py-20 bg-gray-50">
          <div className="mx-6 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 grid lg:grid-cols-2 gap-8">
            {AUDIENCES.map(({ icon: AudienceIcon, title, points }) => (
              <div key={title} className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <AudienceIcon />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                </div>
                <ul className="space-y-4">
                  {points.map((point) => (
                    <li key={point} className="flex gap-3 text-gray-700">
                      <CheckIcon width={20} height={20} className="shrink-0 mt-0.5 text-blue-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <section className="py-20 bg-white">
          <div className="mx-6 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Prêt pour votre prochain événement ?</h2>
            <p className="text-lg text-gray-600 max-w-xl mb-10">
              Téléchargez l’application gratuitement, ou découvrez en détail comment fonctionne Autheeka.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <PlayStoreBadge />
              <Link href="/about" className="font-semibold text-blue-600 hover:underline">
                En savoir plus sur Autheeka →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
