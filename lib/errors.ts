export function translateError(errorCode: string): string {
  switch (errorCode) {
    // GENERIC & SYSTEM
    case "server_error":
      return "Erreur serveur inattendue. Veuillez réessayer.";
    case "not_found":
      return "La ressource demandée n'existe pas ou plus.";
    case "duplicate":
      return "Cette ressource existe déjà.";
    case "invalid_input":
      return "Les données fournies sont invalides.";
    case "forbidden":
      return "Accès refusé.";
    case "unauthorized":
      return "Vous n'êtes pas autorisé à effectuer cette action. Veuillez vous connecter.";
    case "invalid_access":
      return "Accès invalide.";

    // AUTHENTICATION & LOGIN
    case "invalid_credentials":
      return "Email ou mot de passe incorrect.";
    case "user_not_found":
      return "Aucun compte n'est associé à cet email.";
    case "account_locked":
      return "Votre compte est bloqué suite à trop de tentatives. Veuillez réessayer plus tard.";
    case "invalid_token":
      return "La session a expiré ou le jeton est invalide. Veuillez vous reconnecter.";
    case "invalid_refresh_token":
      return "Impossible de rafraîchir la session. Veuillez vous reconnecter.";

    // REGISTRATION & PROFILE
    case "user_already_exists":
    case "email_already_in_use":
      return "Cet email est déjà utilisé. Veuillez vous connecter avec cet email.";
    case "invalid_otp":
      return "Le code OTP est incorrect.";
    case "expired_otp":
      return "Le code OTP a expiré.";
    case "weak_password":
      return "Le mot de passe choisi est trop simple (8 caractères minimum).";
    case "invalid_email":
      return "L'adresse email est invalide.";
    case "invalid_name":
      return "Le nom complet est invalide.";
    case "max_otp_attempts":
      return "Nombre maximal de tentatives atteint. Veuillez redemander un code.";
    case "already_verified":
      return "Ce compte est déjà vérifié.";
    case "verification_pending":
      return "Veuillez vérifier votre compte avant de continuer.";
    case "password_reset_failed":
      return "La réinitialisation du mot de passe a échoué. Veuillez réessayer.";

    // TICKETS & EVENTS
    case "event_not_found":
      return "Cet événement n'existe pas ou a été supprimé.";
    case "ticket_not_found":
      return "Ce billet n'existe pas ou a été supprimé.";
    case "duplicate_ticket":
      return "Vous possédez déjà ce billet.";
    case "event_has_tickets":
      return "Cet événement a déjà des billets vendus.";
    case "has_future_events":
      return "Vous avez des événements à venir avec des billets vendus.";
    case "event_passed":
      return "La vente de billets pour cet événement est clôturée.";

    // WALLET & PAYMENT
    case "wallet_not_found":
      return "Portefeuille introuvable.";
    case "insufficient_balance":
      return "Votre portefeuille n'a pas assez de fonds pour cette transaction.";
    case "invalid_amount":
      return "Le montant est invalide.";
    case "payment_error":
      return "Une erreur est survenue lors du paiement.";

    // PROMO CODES
    case "promo_invalid":
      return "Ce code promo est invalide.";
    case "promo_expired":
      return "Ce code promo a expiré.";
    case "promo_duplicate":
      return "Ce code promo a déjà été utilisé.";

    // FEATURES
    case "feature_not_available":
      return "Cette fonctionnalité est temporairement désactivée.";
    case "withdraw_unavailable":
      return "Les retraits sont temporairement désactivés.";
    case "apple_login_unavailable":
      return "La connexion avec Apple n'est pas disponible sur cette plateforme.";

    default:
      return "Une erreur inattendue s'est produite. Veuillez réessayer.";
  }
}
