"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";

import type { JWToken, JWTokenPayload } from "@/lib/interfaces/JWToken";
import type { User } from "@/lib/interfaces/User";
import { getUserById } from "@/lib/api/users.service";

interface AuthContextProps {
  token: JWToken | null;
  user: User | null;
  loadingUser: boolean;
  login: (token: JWToken, user: User) => void;
  logout: () => void;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<JWToken | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    async function getUserFromtoken(accessToken: string, refreshToken: string) {
      setLoadingUser(true);
      const parsedToken: JWToken = {
        accessToken,
        refreshToken,
      };
      setToken(parsedToken);
      const decodedToken = jwtDecode<JWTokenPayload>(parsedToken.accessToken);
      const user = await getUserById(decodedToken.userId);

      setUser(user);
      setLoadingUser(false);
    }

    if (storedAccessToken && storedRefreshToken) {
      getUserFromtoken(storedAccessToken, storedRefreshToken);
    } else {
      setLoadingUser(false);
    }
  }, []);

  function login(token: JWToken, user: User) {
    localStorage.setItem("accessToken", token.accessToken);
    localStorage.setItem("refreshToken", token.refreshToken);
    setToken(token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, loadingUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
