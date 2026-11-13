import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Les données collectées par Autheeka, leur utilisation, leur partage et vos droits.",
  path: "/privacy-policy",
});

export default function PrivacyPolicy() {
  return (
    <main className="flex-1 mx-4 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 py-16">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <h1 className="text-3xl md:text-4xl font-black mb-8">Politique de Confidentialité</h1>

        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p className="italic text-gray-500">Dernière mise à jour : 4 septembre 2026</p>

          <p>Bienvenue sur Autheeka. La protection de vos données personnelles et de votre vie privée est une priorité pour nous. Cette politique de confidentialité explique comment nous collectons, utilisons et partageons vos informations lorsque vous utilisez notre application mobile et nos services de billetterie.</p>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">1. Données que nous collectons</h2>
          <p>Nous collectons les types d'informations suivants :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Informations de compte :</strong> Nom complet, adresse e-mail, et mot de passe (haché) pour l'authentification. Le numéro de téléphone, les liens vers vos réseaux sociaux, et la photo de profil sont optionnels.</li>
            <li><strong>Informations financières :</strong> Historique de vos transactions, solde de votre portefeuille interne. (Les détails de votre carte bancaire sont gérés par nos partenaires de paiement sécurisés et ne transitent jamais sur nos serveurs).</li>
            <li><strong>Activité sur l'application :</strong> Événements créés, suivis, billets achetés, et interactions sociales (j'aime, commentaires).</li>
            <li><strong>Identifiants de l'appareil et techniques :</strong> Adresses IP (pour la sécurité), tokens de notifications push (Firebase Cloud Messaging).</li>
          </ul>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">2. Comment nous utilisons vos données</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Créer et gérer votre compte utilisateur.</li>
            <li>Générer, attribuer et valider vos billets d'événements.</li>
            <li>Gérer votre portefeuille interne (dépôts et achats de billets).</li>
            <li>Vous envoyer des notifications importantes et des e-mails transactionnels (confirmation de commande, mot de passe oublié).</li>
            <li>Assurer la sécurité de la plateforme.</li>
          </ul>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">3. Partage de données avec des tiers</h2>
          <p>Nous partageons certaines informations nécessaires à la prestation de nos services avec des partenaires de confiance :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Services de Paiement :</strong> Stripe et MonCash pour traiter vos dépôts et paiements.</li>
            <li><strong>Services Firebase (Google) :</strong> Pour l'authentification sociale, le stockage d'images, l'envoi de notifications (FCM) et le suivi des plantages (Crashlytics).</li>
            <li><strong>Communications :</strong> Brevo (emails) et WhatsApp Business API (envoi de billets optionnel).</li>
          </ul>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">4. Sécurité de vos données</h2>
          <p>Toutes les communications entre votre application et nos serveurs sont chiffrées (HTTPS/TLS). Les mots de passe sont stockés de manière sécurisée à l'aide d'algorithmes de hachage (bcrypt).</p>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">5. Suppression de votre compte et de vos données</h2>
          <p>Vous avez le droit de demander la suppression de votre compte et de vos données personnelles à tout moment :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Via l'application :</strong> Rendez-vous dans les <em>Paramètres</em> &gt; <em>Compte</em> &gt; <em>Supprimer mon compte</em>.</li>
            <li><strong>Via notre support :</strong> Envoyez-nous un e-mail à l'adresse indiquée ci-dessous.</li>
          </ul>
          <p><strong>Note concernant les organisateurs d'événements :</strong> Si vous avez créé des événements futurs pour lesquels des billets ont déjà été vendus, la suppression de votre compte sera bloquée jusqu'à ce que ces événements soient passés, afin de garantir les droits des acheteurs. Sinon, lorsque vous demandez la suppression, votre compte est immédiatement désactivé (vos événements et votre profil deviennent invisibles). Une période de grâce de 30 jours commence. Pendant cette période, vous pouvez annuler la suppression en vous reconnectant simplement à votre compte. Passé ce délai, toutes vos données (et les événements sans tickets vendus) seront définitivement supprimées. Pour les événements passés avec des tickets vendus, les données de l'événement seront purgées et anonymisées.</p>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">6. Nous contacter</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter : <strong><a href="mailto:support@autheeka.com" className="text-blue-600 font-semibold hover:underline">support@autheeka.com</a></strong>
          </p>
        </div>
      </div>
    </main>
  );
}
