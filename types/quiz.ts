export interface QuestionType {
  questionId: string;
  title: string;
  score: number;
  choices: Choice[];
}

export interface Choice {
  choiceId: string;
  title: string;
  questionId: string;
  question: [];
}

export interface QuizState {
  showAnswerModal: boolean;
  isStarted: boolean;
  currentQuestion: QuestionType | null;
  isLoading: boolean;
  isCorrectAnswer: boolean;
  playerName: string;
  isGameComplete: boolean;
  showHistory: boolean;
}

export interface QuizActions {
  setShowAnswerModal: (show: boolean) => void;
  setIsStarted: (started: boolean) => void;
  setCurrentQuestion: (question: QuestionType | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsCorrectAnswer: (correct: boolean) => void;
  setPlayerName: (name: string) => void;
  handleStartQuiz: () => Promise<void>;
  handleAnswer: (answer: boolean) => Promise<void>;
  handleNextQuestion: () => Promise<void>;
  handlerPlayAgain: () => void;
  handleOpenHistory: () => void;
  setShowHistory: (show: boolean) => void;
}

export interface AnswerRequest {
  sessionId: string;
  questionId: string;
  choiceId: string;
  timeSpent: number;
}

export interface AnswerResponse {
  data: {
    isCorrect: boolean;
    score: number;
  };
}
