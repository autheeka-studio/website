import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Les données collectées par Autheeka, leur utilisation, leur partage, leur conservation et vos droits.",
  path: "/privacy-policy",
});

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">{children}</h2>
);

const SupportEmail = () => (
  <a href="mailto:support@autheeka.com" className="text-blue-600 font-semibold hover:underline">
    support@autheeka.com
  </a>
);

export default function PrivacyPolicy() {
  return (
    <main className="flex-1 mx-4 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 py-16">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <h1 className="text-3xl md:text-4xl font-black mb-8">Politique de confidentialité</h1>

        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p className="italic text-gray-500">Dernière mise à jour : 13 novembre 2026</p>

          <p>
            Cette politique explique quelles informations Autheeka collecte lorsque vous utilisez l’application mobile et le
            site autheeka.com, pourquoi, avec qui elles sont partagées, combien de temps elles sont conservées et comment
            exercer vos droits.
          </p>

          <H2>1. Responsable du traitement</H2>
          <p>
            Autheeka est exploité par un entrepreneur individuel établi au Nouveau-Brunswick (Canada), qui est responsable de
            vos renseignements personnels et fait office de responsable de la protection des renseignements personnels. Pour
            toute question ou demande : <SupportEmail />.
          </p>

          <H2>2. Informations que nous collectons</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Compte :</strong> nom, adresse e-mail et mot de passe (stocké uniquement sous forme chiffrée), ou les
              informations transmises par Google ou Apple si vous vous connectez avec eux. Facultatif : photo de profil, bio,
              numéro WhatsApp et liens vers vos réseaux sociaux.
            </li>
            <li>
              <strong>Vérification d’identité (organisateurs) :</strong> une photo de votre pièce d’identité et un selfie avec
              celle-ci. Voir la section 4.
            </li>
            <li>
              <strong>Billets :</strong> les billets achetés ou réservés, leur statut et la date à laquelle ils ont été scannés.
              Lorsque vous offrez un billet, nous enregistrons le nom du bénéficiaire et son numéro de téléphone ou son
              adresse e-mail afin de le lui envoyer.
            </li>
            <li>
              <strong>Paiements et portefeuille :</strong> historique des transactions, solde et devise de votre portefeuille.
              Les données de carte bancaire sont saisies directement chez nos prestataires de paiement et ne passent jamais par
              nos serveurs.
            </li>
            <li>
              <strong>Activité :</strong> événements créés, actualités publiées, comptes suivis, mentions j’aime, signalements et
              blocages.
            </li>
            <li>
              <strong>Préférences :</strong> langue, région et devise choisies.
            </li>
            <li>
              <strong>Messages :</strong> les messages que vous envoyez au compte WhatsApp ou à l’adresse e-mail d’Autheeka.
            </li>
            <li>
              <strong>Données techniques :</strong> identifiant de notifications de votre appareil, rapports de plantage de
              l’application, adresse IP et statistiques de visite anonymes du site.
            </li>
          </ul>

          <H2>3. Autorisations de l’application</H2>
          <p>L’application ne demande ces autorisations qu’au moment où vous utilisez la fonctionnalité concernée :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Localisation :</strong> pour placer un événement sur la carte lors de sa création. Votre position n’est ni suivie ni enregistrée.</li>
            <li><strong>Caméra :</strong> pour scanner les billets à l’entrée.</li>
            <li><strong>Photos :</strong> pour choisir une photo de profil, d’événement ou d’actualité, et vos documents de vérification.</li>
            <li><strong>NFC :</strong> pour enregistrer ou lire un billet sur un bracelet sans contact.</li>
            <li>
              <strong>Empreinte, visage ou code :</strong> pour protéger l’accès à vos billets et à votre portefeuille. Cette
              vérification se fait entièrement sur votre appareil : nous ne recevons aucune donnée biométrique.
            </li>
          </ul>

          <H2>4. Documents d’identité</H2>
          <p>
            Les documents de vérification sont stockés dans un espace privé, jamais public, et ne sont consultés que par
            l’équipe Autheeka pour valider votre identité. Ils sont <strong>supprimés dès que votre demande est approuvée ou
            refusée</strong>. Seul le résultat (votre badge) est conservé.
          </p>

          <H2>5. Comment nous utilisons vos informations</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Créer et gérer votre compte, et vérifier l’identité des organisateurs.</li>
            <li>Émettre, envoyer et valider les billets, et gérer le portefeuille.</li>
            <li>Vous envoyer des e-mails et notifications liés à votre compte, à vos billets et aux événements que vous suivez.</li>
            <li>Afficher les événements de votre région, dans votre langue et votre devise.</li>
            <li>Prévenir la fraude, modérer les contenus signalés et assurer la sécurité de la plateforme.</li>
            <li>Corriger les plantages et améliorer le service.</li>
          </ul>
          <p>Nous ne vendons pas vos informations personnelles et ne les utilisons pas à des fins publicitaires.</p>

          <H2>6. Ce que voient les autres utilisateurs</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Tout le monde :</strong> votre profil public (nom, photo, bio, liens, badge), vos événements et vos actualités.</li>
            <li>
              <strong>Les organisateurs et leurs managers :</strong> pour les billets de leurs événements, le nom et, s’ils ont
              été indiqués, le téléphone ou l’e-mail du détenteur, ainsi que le résultat des scans. Ils peuvent aussi envoyer
              des annonces aux détenteurs de billets via les notifications d’Autheeka.
            </li>
          </ul>

          <H2>7. Prestataires</H2>
          <p>Nous faisons appel aux prestataires suivants, qui ne traitent vos informations que pour fournir leur service :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Paiements :</strong> Stripe (carte bancaire, Apple Pay, Google Pay) et MonCash.</li>
            <li><strong>Connexion :</strong> Google et Apple, si vous choisissez de vous connecter avec eux.</li>
            <li><strong>Hébergement et stockage :</strong> Oracle Cloud (serveurs et base de données), Cloudflare (stockage des images et documents, e-mails) et Vercel (site web et statistiques de visite anonymes).</li>
            <li><strong>Application :</strong> Firebase de Google (notifications push et rapports de plantage).</li>
            <li><strong>Communications :</strong> Brevo (e-mails) et Meta (WhatsApp Business, pour l’envoi de billets et de messages).</li>
            <li><strong>Cartes :</strong> OpenStreetMap, pour l’affichage des cartes.</li>
          </ul>
          <p>
            Ces prestataires peuvent traiter vos informations hors de votre pays, notamment aux États-Unis, où elles peuvent
            être soumises aux lois locales. Nous pouvons aussi communiquer des informations lorsque la loi l’exige.
          </p>

          <H2>8. Conservation</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Les informations de votre compte sont conservées tant que celui-ci est actif.</li>
            <li>Les documents d’identité sont supprimés dès la décision de vérification.</li>
            <li>
              Les transactions et paiements sont conservés après la suppression du compte, le temps exigé par nos obligations
              comptables et fiscales.
            </li>
          </ul>

          <H2>9. Suppression de votre compte</H2>
          <p>Vous pouvez supprimer votre compte à tout moment :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dans l’application :</strong> <em>Paramètres</em> &gt; <em>Compte</em> &gt; <em>Supprimer mon compte</em>.</li>
            <li><strong>Par e-mail :</strong> en écrivant à <SupportEmail />.</li>
          </ul>
          <p>
            Votre compte est immédiatement désactivé : votre profil et vos événements deviennent invisibles. Pendant 30 jours,
            vous pouvez annuler la suppression en vous reconnectant. Passé ce délai, votre compte, vos événements sans billets
            vendus et vos documents restants sont définitivement supprimés. Les événements passés ayant vendu des billets sont
            anonymisés.
          </p>
          <p>
            Si vous organisez un événement à venir pour lequel des billets ont été vendus, la suppression est bloquée jusqu’à ce
            qu’il soit passé, afin de protéger les acheteurs.
          </p>

          <H2>10. Vos droits</H2>
          <p>
            Vous pouvez demander l’accès aux informations que nous détenons sur vous, leur correction, leur suppression ou une
            copie dans un format courant, et retirer votre consentement aux notifications. La plupart des informations du
            profil sont modifiables directement dans l’application. Pour les autres demandes, écrivez à <SupportEmail />. Nous
            répondons dans un délai de 30 jours. Si vous n’êtes pas satisfait de notre réponse, vous pouvez vous adresser au
            Commissariat à la protection de la vie privée du Canada.
          </p>

          <H2>11. Sécurité</H2>
          <p>
            Les échanges entre l’application, le site et nos serveurs sont chiffrés (HTTPS). Les mots de passe sont hachés avec
            bcrypt, les documents d’identité sont stockés dans un espace privé, et l’accès à l’administration est réservé à
            l’équipe Autheeka. Aucun système n’étant infaillible, nous vous informerons sans délai de toute atteinte à vos
            informations présentant un risque pour vous.
          </p>

          <H2>12. Mineurs</H2>
          <p>
            Autheeka est accessible à partir de 13 ans. Les utilisateurs mineurs doivent avoir l’accord d’un parent ou tuteur
            pour effectuer des paiements. Si vous pensez qu’un enfant de moins de 13 ans a créé un compte, contactez-nous pour
            que nous le supprimions.
          </p>

          <H2>13. Modifications</H2>
          <p>
            Nous pouvons modifier cette politique. En cas de changement important, nous vous en informerons dans
            l’application ou par e-mail avant son entrée en vigueur. La date de mise à jour figure en haut de cette page.
          </p>

          <H2>14. Nous contacter</H2>
          <p>
            Pour toute question sur cette politique ou pour exercer vos droits : <SupportEmail />.
          </p>
        </div>
      </div>
    </main>
  );
}
