export const MUTATION_LOGIN = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
      user {
        id
        name
        email
        picture
        badge
      }
    }
  }
`;

export const MUTATION_REGISTER = `
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password)
  }
`;

export const MUTATION_SOCIAL_LOGIN = `
  mutation SocialLogin($provider: SocialProvider!, $token: String!, $currency: Currency) {
    socialLogin(provider: $provider, token: $token, currency: $currency) {
      token
      refreshToken
      user {
        id
        name
        email
        picture
        badge
      }
    }
  }
`;

export const QUERY_ME = `
  query Me {
    me {
      id
      name
      email
      picture
      badge
    }
  }
`;

export const MUTATION_REFRESH_TOKEN = `
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
      refreshToken
      user {
        id
        name
        email
        picture
        badge
      }
    }
  }
`;

export const MUTATION_VERIFY_REGISTRATION_OTP = `
  mutation VerifyRegistrationOtp($email: String!, $otp: String!, $currency: Currency) {
    verifyRegistrationOtp(email: $email, otp: $otp, currency: $currency) {
      token
      refreshToken
      user {
        id
        name
        email
        picture
        badge
      }
    }
  }
`;

export const MUTATION_CONFIRM_EMAIL = MUTATION_VERIFY_REGISTRATION_OTP;

export const MUTATION_REQUEST_PASSWORD_RESET = `
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

export const MUTATION_VERIFY_RESET_PASSWORD_OTP = `
  mutation VerifyResetPasswordOtp($email: String!, $otp: String!) {
    verifyResetPasswordOtp(email: $email, otp: $otp)
  }
`;

export const MUTATION_RESET_PASSWORD = `
  mutation ResetPassword($email: String!, $otp: String!, $newPassword: String!) {
    resetPassword(email: $email, otp: $otp, newPassword: $newPassword) {
      token
      refreshToken
      user {
        id
        name
        email
        picture
        badge
      }
    }
  }
`;
 