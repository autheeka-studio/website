import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-3xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="font-bold text-blue-600 text-xl">
            Autheeka
          </Link>
          <div className="flex items-center gap-6 font-medium">
             <Link href="/" className="hover:text-blue-600 transition-colors">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6 bg-white min-h-screen">
        <h1 className="text-4xl font-extrabold mb-8">Politique de Confidentialité</h1>
        
        <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
          <p>
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">1. Introduction</h2>
          <p>
            Bienvenue sur Autheeka. La protection de vos données personnelles est notre priorité. 
            Cette politique de confidentialité vous explique quelles informations nous collectons, 
            comment nous les utilisons et quels sont vos droits.
          </p>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">2. Données collectées</h2>
          <p>
            Nous collectons les données suivantes :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Informations d'inscription :</strong> nom, adresse e-mail, numéro de téléphone, mot de passe.</li>
            <li><strong>Données de transaction :</strong> historique d'achats de billets (le paiement est géré de manière sécurisée par Stripe ou Moncash).</li>
            <li><strong>Informations de profil :</strong> photo de profil, réseaux sociaux liés.</li>
            <li><strong>Données d'utilisation :</strong> interactions avec l'application, événements consultés.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">3. Utilisation des données</h2>
          <p>
            Les données que nous collectons servent à :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Créer et gérer votre compte Autheeka.</li>
            <li>Générer et valider vos billets d'événement.</li>
            <li>Améliorer l'expérience utilisateur et personnaliser les recommandations.</li>
            <li>Vous envoyer des notifications importantes concernant vos événements.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">4. Partage des données</h2>
          <p>
            Nous ne vendons jamais vos données personnelles. Elles peuvent être partagées uniquement dans les cas suivants :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Avec les organisateurs d'événements (nom et prénom pour la validation des billets).</li>
            <li>Avec nos prestataires de paiement (Stripe, Moncash) pour le traitement sécurisé des transactions.</li>
            <li>Si la loi l'exige.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">5. Vos droits</h2>
          <p>
            Vous avez le droit de demander l'accès, la modification ou la suppression de vos données personnelles à tout moment en nous contactant à <strong>support@autheeka.com</strong>.
          </p>
        </div>
      </main>
    </>
  );
}
