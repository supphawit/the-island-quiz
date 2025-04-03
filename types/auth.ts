import { ReactNode } from "react";
import { QuestionType } from "./quiz";

export interface PlayerProfile {
  name: string;
  history: History[];
}

export interface History {
  sessionId: string;
  totalScore: number;
  totalQuestions: number;
  questions: QuestionType[];
}

export interface AuthContextType {
  playerProfile: PlayerProfile | null;
  saveProfile: (player: PlayerProfile) => void;
  sessionId: string | null;
  saveSession: (sessionId: string) => void;
  startNewQuestion: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
