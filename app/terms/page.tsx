import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Conditions générales",
  description: "Conditions générales d’utilisation et de vente de la plateforme Autheeka.",
  path: "/terms",
});

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">{children}</h2>
);

const SupportEmail = () => (
  <a href="mailto:support@autheeka.com" className="text-blue-600 font-semibold hover:underline">
    support@autheeka.com
  </a>
);

export default function TermsPage() {
  return (
    <main className="flex-1 mx-4 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 py-16">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <h1 className="text-3xl md:text-4xl font-black mb-8">Conditions générales d’utilisation et de vente</h1>

        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p className="italic text-gray-500">Dernière mise à jour : 13 novembre 2026</p>

          <p>
            Les présentes conditions régissent l’utilisation de l’application mobile et du site autheeka.com
            (« Autheeka »). En créant un compte ou en achetant un billet, vous les acceptez.
          </p>

          <H2>1. Qui exploite Autheeka</H2>
          <p>
            Autheeka est exploité par un entrepreneur individuel établi au Nouveau-Brunswick (Canada). Contact :{" "}
            <SupportEmail />.
          </p>

          <H2>2. Rôle d’Autheeka</H2>
          <p>
            Autheeka est un intermédiaire technologique qui permet aux organisateurs de publier des événements et de vendre
            des billets, et aux participants de les découvrir et de les acheter. Autheeka n’est ni l’organisateur ni le
            producteur des événements : chaque organisateur est seul responsable de son événement.
          </p>

          <H2>3. Compte</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Un compte est nécessaire pour acheter un billet ou créer un événement. Vous devez avoir au moins 13 ans ; les mineurs doivent avoir l’accord d’un parent ou tuteur pour effectuer des paiements.</li>
            <li>Les informations de votre compte doivent être exactes. Vous êtes responsable de la confidentialité de vos identifiants et de l’activité de votre compte.</li>
            <li>La suppression du compte suit les modalités décrites dans notre <Link href="/privacy-policy" className="text-blue-600 font-semibold hover:underline">politique de confidentialité</Link>.</li>
          </ul>

          <H2>4. Billets</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Prix :</strong> le prix est fixé par l’organisateur. L’acheteur paie le prix affiché, sans frais ajoutés
              par Autheeka. Un code promo valide réduit ce prix.
            </li>
            <li>
              <strong>Billet unique :</strong> chaque billet porte un code unique, valable pour un seul événement et une
              seule entrée. Une fois scanné, il ne peut plus être utilisé.
            </li>
            <li>
              <strong>Billet offert :</strong> vous pouvez acheter un billet pour une autre personne en indiquant son nom et son
              téléphone ou son e-mail. Vous confirmez avoir son accord pour lui envoyer le billet par WhatsApp ou par e-mail.
            </li>
            <li>
              <strong>Événements gratuits :</strong> lorsqu’une réservation est demandée, le nombre de billets est limité à 5
              par compte.
            </li>
            <li>
              <strong>Date limite :</strong> les achats sont possibles jusqu’à 2 heures après le début de l’événement.
            </li>
            <li>
              <strong>Revente :</strong> la revente d’un billet à un prix supérieur à son prix d’achat, ou à des fins
              commerciales, est interdite. Un billet obtenu frauduleusement peut être annulé.
            </li>
          </ul>

          <H2>5. Paiement</H2>
          <p>
            Les paiements s’effectuent par MonCash, carte bancaire, Apple Pay, Google Pay ou avec le solde du portefeuille
            Autheeka, selon les moyens disponibles dans votre région. Les paiements par carte sont traités par Stripe et ceux
            par MonCash par Digicel : leurs propres conditions s’appliquent. Toute contestation de paiement abusive (par
            exemple pour un billet utilisé) peut entraîner l’annulation des billets concernés et la suspension du compte.
          </p>

          <H2>6. Portefeuille</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Chaque compte dispose d’un portefeuille en gourde haïtienne (HTG), dollar américain (USD) ou dollar canadien (CAD). La devise ne peut être changée que tant que le solde est à zéro et n’a jamais été utilisé.</li>
            <li>Le portefeuille peut être rechargé pour acheter des billets. Les revenus des organisateurs y sont crédités après chaque vente.</li>
            <li>Lorsqu’un paiement est fait dans une autre devise que celle du portefeuille, le montant est converti au taux en vigueur au moment de l’opération.</li>
            <li>Le solde n’est pas un compte bancaire et ne produit pas d’intérêts. Les retraits s’effectuent selon les modalités proposées dans l’application ou, à défaut, sur demande à <SupportEmail />, après vérification de votre identité.</li>
          </ul>

          <H2>7. Annulation et remboursement</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Un billet pour un événement à une date déterminée n’est ni repris ni échangé, sauf annulation ou report par l’organisateur.</li>
            <li>En cas d’annulation ou de report, l’organisateur est responsable du remboursement des participants. Autheeka facilite ce processus dans la mesure du possible, notamment en contactant les détenteurs de billets.</li>
            <li>Les présentes conditions ne limitent pas les droits que vous accorde la loi sur la protection du consommateur applicable dans votre province ou votre pays.</li>
          </ul>

          <H2>8. Organisateurs</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Vérification :</strong> la création d’événements est réservée aux comptes dont l’identité a été vérifiée.
              Un changement de nom après vérification retire le badge jusqu’à une nouvelle validation.
            </li>
            <li>
              <strong>Frais :</strong> la publication est gratuite. Autheeka prélève une commission de 10 % sur chaque billet
              vendu, déduite de la part de l’organisateur. Ce taux peut être révisé pour certains événements, par accord
              écrit. Les événements gratuits ne sont soumis à aucune commission.
            </li>
            <li>
              <strong>Codes promo :</strong> la réduction d’un code créé par l’organisateur est déduite de ses revenus.
            </li>
            <li>
              <strong>Équipe :</strong> l’organisateur choisit les permissions de ses managers et reste responsable de leurs
              actions sur ses événements.
            </li>
            <li>
              <strong>Engagements :</strong> l’organisateur fournit des informations exactes, dispose des autorisations,
              licences et assurances nécessaires, respecte la capacité du lieu et honore les billets vendus. Il n’utilise les
              coordonnées des participants que pour l’événement concerné.
            </li>
            <li>
              Il ne peut pas supprimer son compte tant qu’un de ses événements à venir a des billets vendus.
            </li>
          </ul>

          <H2>9. Contrôle d’accès</H2>
          <p>
            L’accès à l’événement est soumis à la validation du billet, par QR code ou bracelet sans contact. Un billet déjà
            utilisé, annulé ou destiné à un autre événement est refusé. L’organisateur peut aussi refuser l’accès à toute
            personne ne respectant pas le règlement du lieu.
          </p>

          <H2>10. Contenus et comportement</H2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vous restez propriétaire des photos, textes et vidéos que vous publiez. Vous accordez à Autheeka le droit gratuit de les afficher et de les diffuser sur la plateforme, et de les utiliser pour promouvoir vos événements.</li>
            <li>Il est interdit de publier un contenu haineux, violent, diffamatoire, trompeur, illégal ou portant atteinte aux droits d’autrui, et d’usurper l’identité d’une personne ou d’un organisateur.</li>
            <li>Tout utilisateur peut signaler un contenu ou bloquer un compte. Autheeka peut retirer un contenu, supprimer un événement frauduleux ou dangereux, et suspendre ou fermer un compte qui enfreint ces règles.</li>
          </ul>

          <H2>11. Propriété intellectuelle</H2>
          <p>
            Le nom Autheeka, son logo, l’application et le site sont protégés. Ils ne peuvent être copiés ou réutilisés sans
            autorisation.
          </p>

          <H2>12. Limitation de responsabilité</H2>
          <p>
            Autheeka fournit le service de billetterie et de mise en relation et met tout en œuvre pour qu’il soit disponible
            et fiable, sans pouvoir garantir l’absence d’interruption. Dans les limites permises par la loi, Autheeka n’est pas
            responsable du déroulement d’un événement, des dommages, vols ou accidents qui y surviennent, ni de son annulation
            par l’organisateur. Sa responsabilité est limitée au montant des frais perçus sur la transaction concernée.
          </p>

          <H2>13. Modification des conditions</H2>
          <p>
            Nous pouvons modifier ces conditions. En cas de changement important, vous en serez informé dans l’application ou
            par e-mail avant son entrée en vigueur. Continuer à utiliser Autheeka après cette date vaut acceptation.
          </p>

          <H2>14. Droit applicable</H2>
          <p>
            Ces conditions sont régies par les lois du Nouveau-Brunswick et les lois fédérales du Canada qui s’y appliquent.
            En cas de différend, contactez-nous d’abord pour chercher une solution amiable. À défaut, les tribunaux du
            Nouveau-Brunswick sont compétents, sous réserve des droits des consommateurs de saisir les tribunaux de leur lieu
            de résidence.
          </p>

          <H2>15. Nous contacter</H2>
          <p>
            Pour toute question sur ces conditions : <SupportEmail />.
          </p>
        </div>
      </div>
    </main>
  );
}
