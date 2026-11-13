import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos | Autheeka",
  description:
    "Pourquoi Autheeka existe, comment fonctionnent les billets, la vérification des organisateurs, les paiements et le contrôle d’accès.",
};

const PARTICIPANT_STEPS = [
  {
    title: "Découvrez",
    text: "Parcourez les événements de votre région : les plus populaires, les gratuits, ceux d’aujourd’hui. Suivez les organisateurs qui vous plaisent pour voir leurs actualités et être prévenu de leurs prochains rendez-vous.",
  },
  {
    title: "Achetez",
    text: "Payez par MonCash, carte bancaire, Apple Pay, Google Pay ou avec le solde de votre portefeuille Autheeka. Le prix affiché est exactement le prix payé. Un code promo ? Saisissez-le au moment de l’achat.",
  },
  {
    title: "Offrez",
    text: "Achetez un billet pour un proche : il le reçoit directement par WhatsApp ou par e-mail, sans avoir besoin de créer un compte.",
  },
  {
    title: "Entrez",
    text: "Présentez le QR code de votre billet, ou votre bracelet sans contact. Le scan prend une seconde, et votre billet est marqué comme utilisé pour que personne d’autre ne puisse s’en servir.",
  },
];

const ORGANIZER_STEPS = [
  {
    title: "Faites-vous vérifier",
    text: "Une pièce d’identité et un selfie suffisent. Une fois vérifié, vous recevez le badge Émeraude et pouvez publier vos événements. Les créateurs les plus actifs et fidèles obtiennent le badge Saphir.",
  },
  {
    title: "Publiez",
    text: "Nom, date, lieu sur la carte, photos, prix et devise : votre événement est en ligne en quelques minutes. Pour un événement gratuit, vous pouvez exiger une réservation pour connaître votre affluence.",
  },
  {
    title: "Faites connaître",
    text: "Partagez le lien de votre événement, créez des codes promo à durée ou à nombre d’utilisations limité, publiez des actualités et envoyez des annonces à vos abonnés ou uniquement aux détenteurs de billets.",
  },
  {
    title: "Gérez votre équipe",
    text: "Ajoutez des managers et choisissez précisément ce que chacun peut faire : scanner les billets, modifier l’événement, changer les prix, voir les statistiques ou envoyer des annonces.",
  },
  {
    title: "Contrôlez l’entrée",
    text: "Scannez les QR codes avec n’importe quel téléphone, ou enregistrez les billets sur des bracelets NFC pour un passage sans contact. Un billet déjà utilisé, annulé ou destiné à un autre événement est refusé immédiatement.",
  },
  {
    title: "Suivez vos ventes",
    text: "Consultez vos ventes et vos entrées en temps réel. Vos revenus arrivent sur votre portefeuille Autheeka, que vous pouvez retirer.",
  },
];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-14">
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{title}</h2>
    {children}
  </section>
);

const Steps = ({ steps }: { steps: { title: string; text: string }[] }) => (
  <ol className="space-y-6">
    {steps.map(({ title, text }, index) => (
      <li key={title} className="flex gap-4">
        <span className="shrink-0 w-9 h-9 rounded-full bg-blue-600/10 text-blue-600 font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <div>
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-gray-600">{text}</p>
        </div>
      </li>
    ))}
  </ol>
);

export default function AboutPage() {
  return (
    <main className="flex-1 mx-4 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 py-16">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          À propos d’<span className="bg-gradient-to-br from-blue-600 to-[#00C6FF] bg-clip-text text-transparent">Autheeka</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Autheeka vient d’« authentique ». Notre conviction est simple : aller à un événement devrait être un plaisir,
          pas un pari. Ni faux billet, ni organisateur introuvable, ni file d’attente interminable.
        </p>

        <Section title="Pourquoi Autheeka existe">
          <div className="space-y-4 text-gray-700">
            <p>
              Billets photocopiés, revendus plusieurs fois, organisateurs anonymes qui disparaissent avec l’argent,
              paiements compliqués quand on n’a pas de carte bancaire, contrôles à l’entrée lents et faciles à
              contourner : ces problèmes découragent le public et pénalisent les organisateurs honnêtes.
            </p>
            <p>
              Autheeka réunit en une seule application tout ce qu’il faut pour vivre un événement en confiance : la
              découverte, l’achat, le billet et le contrôle d’accès. Chaque étape est conçue pour que le
              participant soit sûr de ce qu’il achète, et que l’organisateur soit sûr de qui entre.
            </p>
          </div>
        </Section>

        <Section title="Pour les participants">
          <Steps steps={PARTICIPANT_STEPS} />
        </Section>

        <Section title="Pour les organisateurs">
          <Steps steps={ORGANIZER_STEPS} />
        </Section>

        <Section title="Un billet infalsifiable">
          <div className="space-y-4 text-gray-700">
            <p>
              Chaque billet porte un code unique, lié à son détenteur et à un seul événement. Au moment du scan, Autheeka
              vérifie le billet en direct : il n’est accepté qu’une seule fois. Une capture d’écran partagée
              ou une copie imprimée ne permet donc pas à une deuxième personne d’entrer.
            </p>
            <p>
              Dans l’application, l’affichage de vos billets peut être protégé par votre empreinte, votre visage ou
              votre code. Même si quelqu’un emprunte votre téléphone, vos billets restent à vous.
            </p>
          </div>
        </Section>

        <Section title="Des organisateurs vérifiés">
          <p className="text-gray-700">
            Personne ne peut vendre de billets sans avoir fait vérifier son identité par notre équipe. Le badge affiché sur
            le profil vous indique que l’organisateur est bien celui qu’il prétend être. Si un organisateur
            vérifié change son nom, son badge est retiré le temps que nous validions ce changement. Tout événement
            frauduleux ou dangereux peut être signalé et supprimé.
          </p>
        </Section>

        <Section title="Paiements et frais">
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Devises :</strong> gourde haïtienne (HTG), dollar américain (USD) et dollar canadien (CAD).
            </li>
            <li>
              <strong>Moyens de paiement :</strong> MonCash, carte bancaire, Apple Pay, Google Pay et portefeuille Autheeka.
              Les données de carte sont traitées par nos partenaires de paiement et ne passent jamais par nos serveurs.
            </li>
            <li>
              <strong>Pour les participants :</strong> aucun frais ajouté, vous payez le prix fixé par l’organisateur.
            </li>
            <li>
              <strong>Pour les organisateurs :</strong> ni abonnement ni frais de publication. Une commission de 10 % est
              prélevée uniquement sur les billets vendus. Les événements gratuits restent gratuits. Pour les événements à
              fort volume, la commission peut être révisée sur demande.
            </li>
          </ul>
        </Section>

        <Section title="Pensé pour chez nous">
          <p className="text-gray-700">
            Autheeka est né pour la communauté haïtienne, en Haïti comme dans la diaspora au Canada et aux États-Unis.
            L’application est disponible en français, en anglais et en créole, affiche les événements de votre région
            et accepte les moyens de paiement que vous utilisez réellement.
          </p>
        </Section>

        <Section title="Vos données">
          <p className="text-gray-700">
            Nous ne collectons que ce qui est nécessaire au fonctionnement du service. Les détails sont dans notre{" "}
            <Link href="/privacy-policy" className="text-blue-600 font-semibold hover:underline">
              politique de confidentialité
            </Link>{" "}
            et nos{" "}
            <Link href="/terms" className="text-blue-600 font-semibold hover:underline">
              conditions générales
            </Link>
            .
          </p>
        </Section>

        <Section title="Nous contacter">
          <p className="text-gray-700">
            Une question, une suggestion ou un événement particulier à organiser ? Écrivez-nous à{" "}
            <a href="mailto:support@autheeka.com" className="text-blue-600 font-semibold hover:underline">
              support@autheeka.com
            </a>
            .
          </p>
        </Section>
      </div>
    </main>
  );
}
