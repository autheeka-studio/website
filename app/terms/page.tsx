import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales | Autheeka",
  description: "Conditions Générales d'Utilisation et de Vente de la plateforme Autheeka.",
};

export default function TermsPage() {
  return (
    <main className="flex-1 mx-4 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 py-16">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <h1 className="text-3xl md:text-4xl font-black mb-8">Conditions Générales d'Utilisation et de Vente</h1>

        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p className="italic text-gray-500">Dernière mise à jour : 12 septembre 2026</p>

          <p>
            Les présentes Conditions Générales (CGU/CGV) régissent l'utilisation de l'application et du site web Autheeka.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">1. Objet et Rôle d'Autheeka</h2>
          <p>
            Autheeka agit exclusivement en tant qu'<strong>intermédiaire technologique</strong> permettant la mise en relation entre des organisateurs d'événements et des participants.
            Autheeka n'est ni l'organisateur, ni le producteur des événements proposés sur la plateforme.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">2. Inscription et Compte Utilisateur</h2>
          <p>
            Pour utiliser nos services (création d'événements ou achat de billets), vous devez créer un compte.
            Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte.
            Les utilisateurs doivent avoir au moins 13 ans pour créer un compte.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">3. Achat de Billets et Paiement</h2>
          <p>
            L'achat de billets s'effectue directement via notre application ou site web. Le prix des billets est fixé par l'organisateur de l'événement.
            Des frais de service liés à la plateforme peuvent s'appliquer et seront clairement indiqués avant la validation du paiement.
            Les billets générés sont nominatifs, uniques et infalsifiables.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">4. Annulation et Remboursement</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Absence de droit de rétractation :</strong> Conformément à la législation sur les services de loisirs fournis à une date déterminée, l'achat de billets d'événements ne fait pas l'objet d'un droit de rétractation. Les billets ne sont ni repris, ni échangés.</li>
            <li><strong>Annulation par l'organisateur :</strong> En cas d'annulation ou de report de l'événement, seul l'organisateur est responsable des remboursements envers les participants. Autheeka facilitera ce processus dans la mesure du possible, mais ne peut être tenue financièrement responsable.</li>
          </ul>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">5. Contrôle d'Accès</h2>
          <p>
            L'accès à l'événement est soumis au contrôle de validité de votre billet (QR code généré sur l'application Autheeka).
            L'organisateur se réserve le droit de refuser l'accès à toute personne présentant un billet falsifié, dupliqué, ou ne respectant pas le règlement intérieur du lieu de l'événement.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">6. Responsabilités des Organisateurs</h2>
          <p>
            Tout utilisateur créant un événement s'engage à fournir des informations véridiques, claires et précises.
            L'organisateur déclare disposer de toutes les autorisations, licences et assurances nécessaires pour la tenue de son événement.
            Autheeka se réserve le droit de suspendre ou supprimer tout événement jugé frauduleux, dangereux ou contraire aux bonnes mœurs.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">7. Comportement sur le Réseau Social</h2>
          <p>
            Autheeka intégrant des fonctionnalités sociales, les utilisateurs s'engagent à ne publier aucun contenu haineux, diffamatoire, violent ou illégal.
            Toute violation de cette règle entraînera la suspension immédiate du compte de l'utilisateur.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">8. Limitation de Responsabilité</h2>
          <p>
            La responsabilité d'Autheeka se limite à la fourniture du service de billetterie et de mise en relation.
            Autheeka ne pourra en aucun cas être tenue responsable des dommages directs ou indirects survenus lors d'un événement, de vols, d'accidents ou de l'annulation d'un événement par un organisateur.
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">9. Nous contacter</h2>
          <p>
            Pour toute question relative aux présentes conditions générales, vous pouvez nous contacter : <strong><a href="mailto:support@autheeka.com" className="text-blue-600 font-semibold hover:underline">support@autheeka.com</a></strong>
          </p>
        </div>
      </div>
    </main>
  );
}
