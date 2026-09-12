"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchGraphQL } from "./api";
import { MUTATION_LOGIN, MUTATION_REGISTER, QUERY_ME, MUTATION_SOCIAL_LOGIN, MUTATION_CONFIRM_EMAIL } from "./graphql/auth";

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
  setSession: (token: string, user: User) => void;
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

  useEffect(() => {
    const loadUser = async () => {
      const token = Cookies.get("autheeka_token");
      if (token) {
        try {
          const data = await fetchGraphQL(QUERY_ME, {}, token);
          if (data?.me) {
            setUser(data.me);
          } else {
            Cookies.remove("autheeka_token");
          }
        } catch (e) {
          console.error("Failed to fetch user");
          Cookies.remove("autheeka_token");
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const data = await fetchGraphQL(MUTATION_LOGIN, { email, password });
    if (data?.login?.token) {
      Cookies.set("autheeka_token", data.login.token, { expires: 7 }); // 7 days
      setUser(data.login.user);
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
      Cookies.set("autheeka_token", data.socialLogin.token, { expires: 7 });
      setUser(data.socialLogin.user);
      return;
    }
    throw new Error("Erreur serveur lors de la connexion Google.");
  };

  const confirmEmail = async (email: string, otp: string): Promise<void> => {
    const data = await fetchGraphQL(MUTATION_CONFIRM_EMAIL, { email, otp });
    if (data?.confirmEmail?.token) {
      Cookies.set("autheeka_token", data.confirmEmail.token, { expires: 7 });
      setUser(data.confirmEmail.user);
      return;
    }
    throw new Error("Code OTP incorrect ou expiré.");
  };

  const logout = () => {
    Cookies.remove("autheeka_token");
    setUser(null);
  };

  const setSession = (token: string, userObj: User) => {
    Cookies.set("autheeka_token", token, { expires: 7 });
    setUser(userObj);
  };

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
