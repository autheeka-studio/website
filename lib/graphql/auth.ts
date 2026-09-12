export const MUTATION_LOGIN = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
      user {
        id
        name
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
  mutation SocialLogin($provider: SocialProvider!, $token: String!) {
    socialLogin(provider: $provider, token: $token) {
      token
      refreshToken
      user {
        id
        name
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

export const MUTATION_CONFIRM_EMAIL = `
  mutation ConfirmEmail($email: String!, $otp: String!) {
    confirmEmail(email: $email, otp: $otp) {
      token
      refreshToken
      user {
        id
        name
        picture
        badge
      }
    }
  }
`;
