"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { fetchGraphQL } from "./api";
import {
  MUTATION_LOGIN,
  MUTATION_REGISTER,
  QUERY_ME,
  MUTATION_SOCIAL_LOGIN,
  MUTATION_CONFIRM_EMAIL,
  MUTATION_REFRESH_TOKEN,
} from "./graphql/auth";

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  badge?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  socialLogin: (token: string, provider: string) => Promise<void>;
  confirmEmail: (email: string, otp: string) => Promise<void>;
  setSession: (token: string, refreshToken: string | undefined, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => { },
  register: async () => { },
  socialLogin: async () => { },
  confirmEmail: async () => { },
  setSession: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveTokensAndUser = (token: string, refreshToken?: string, userObj?: User) => {
    Cookies.set("autheeka_token", token, { expires: 7, sameSite: "lax" });
    if (refreshToken) {
      Cookies.set("autheeka_refresh_token", refreshToken, { expires: 30, sameSite: "lax" });
    }
    if (userObj) {
      setUser(userObj);
    }
  };

  const clearSession = useCallback(() => {
    Cookies.remove("autheeka_token");
    Cookies.remove("autheeka_refresh_token");
    setUser(null);
  }, []);

  const refreshSession = useCallback(async (rToken: string): Promise<boolean> => {
    try {
      const data = await fetchGraphQL(MUTATION_REFRESH_TOKEN, { token: rToken });
      if (data?.refreshToken?.token) {
        saveTokensAndUser(
          data.refreshToken.token,
          data.refreshToken.refreshToken,
          data.refreshToken.user
        );
        return true;
      }
    } catch {
      // Refresh token failed or expired
    }
    return false;
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const data = await fetchGraphQL(MUTATION_LOGIN, { email, password });
    if (data?.login?.token) {
      saveTokensAndUser(data.login.token, data.login.refreshToken, data.login.user);
      return;
    }
    throw new Error("Identifiants invalides");
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    const data = await fetchGraphQL(MUTATION_REGISTER, { name, email, password });
    if (data?.register === true) {
      return;
    }
    throw new Error("Erreur d'inscription");
  };

  const socialLogin = async (token: string, provider: string = "GOOGLE"): Promise<void> => {
    const data = await fetchGraphQL(MUTATION_SOCIAL_LOGIN, { provider, token });
    if (data?.socialLogin?.token) {
      saveTokensAndUser(data.socialLogin.token, data.socialLogin.refreshToken, data.socialLogin.user);
      return;
    }
    throw new Error("Erreur serveur lors de la connexion Google.");
  };

  const confirmEmail = async (email: string, otp: string): Promise<void> => {
    const data = await fetchGraphQL(MUTATION_CONFIRM_EMAIL, { email, otp });
    const payload = data?.verifyRegistrationOtp || data?.confirmEmail;
    if (payload?.token) {
      saveTokensAndUser(payload.token, payload.refreshToken, payload.user);
      return;
    }
    throw new Error("Code OTP incorrect ou expiré.");
  };

  const setSession = (token: string, refreshToken?: string, userObj?: User) => {
    saveTokensAndUser(token, refreshToken, userObj);
  };
  
  const logout = () => {
    clearSession();
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = Cookies.get("autheeka_token");
      const refreshToken = Cookies.get("autheeka_refresh_token");

      if (token) {
        try {
          const data = await fetchGraphQL(QUERY_ME, {}, token);
          if (data?.me) {
            setUser(data.me);
            setIsLoading(false);
            return;
          }
        } catch {
          // Token might have expired, try refresh below
        }
      }

      if (refreshToken) {
        const refreshed = await refreshSession(refreshToken);
        if (refreshed) {
          setIsLoading(false);
          return;
        }
      }

      clearSession();
      setIsLoading(false);
    };

    loadUser();
  }, [clearSession, refreshSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        socialLogin,
        confirmEmail,
        setSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
