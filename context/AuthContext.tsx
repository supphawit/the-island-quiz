"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  AuthContextType,
  AuthProviderProps,
  PlayerProfile,
} from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(
    null
  );
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedPlayer = localStorage.getItem("player");
      if (savedPlayer) {
        setPlayerProfile(JSON.parse(savedPlayer));
      }

      const session = localStorage.getItem("sessionId");
      if (session) {
        setSessionId(session);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const saveSession = (sessionId: string) => {
    setSessionId(sessionId);
    localStorage.setItem("sessionId", sessionId);
  };

  const saveProfile = (player: PlayerProfile) => {
    setPlayerProfile(player);
    localStorage.setItem("player", JSON.stringify(player));
  };

  const startNewQuestion = () => {
    localStorage.removeItem("sessionId");
  };

  const value = {
    playerProfile,
    saveProfile,
    sessionId,
    saveSession,
    startNewQuestion,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
