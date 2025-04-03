import { useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { createSession, fetchQuestion } from "@/services/quizService";
import { QuizState, QuizActions } from "@/types/quiz";
import { PlayerProfile } from "@/types/auth";

export const useQuizLogic = (): [QuizState, QuizActions] => {
  const [state, setState] = useState<QuizState>({
    showAnswerModal: false,
    isStarted: false,
    currentQuestion: null,
    isLoading: false,
    isCorrectAnswer: false,
    playerName: "IslandBaby",
    isGameComplete: false,
    showHistory: false,
  });

  const hasInitialFetch = useRef(false);

  const {
    playerProfile,
    saveProfile,
    saveSession,
    sessionId,
    startNewQuestion,
  } = useAuth();

  const handleFetchQuestion = useCallback(
    async (sessionId: string) => {
      try {
        const questionData = await fetchQuestion(sessionId);

        if (!questionData) {
          // Game is complete
          setState((prev) => ({
            ...prev,
            isGameComplete: true,
            isStarted: false,
            isLoading: false, // Make sure to reset loading
          }));
          startNewQuestion();
          return;
        }

        setState((prev) => ({
          ...prev,
          currentQuestion: questionData,
          isLoading: false,
        }));

        const updatedHistory =
          playerProfile?.history?.map((session) => {
            if (session.sessionId === sessionId) {
              const isDuplicateQuestion = session.questions.some(
                (q) => q.questionId === questionData.questionId
              );
              return {
                ...session,
                questions: isDuplicateQuestion
                  ? session.questions
                  : [...session.questions, questionData],
              };
            }
            return session;
          }) || [];

        const sessionExists = updatedHistory.some(
          (session) => session.sessionId === sessionId
        );

        saveProfile({
          ...playerProfile,
          name: playerProfile?.name || state.playerName,
          history: sessionExists
            ? updatedHistory
            : [
                ...updatedHistory,
                {
                  sessionId,
                  questions: [questionData],
                },
              ],
        } as PlayerProfile);
      } catch (error) {
        console.error("Failed to fetch question:", error);
        setState((prev) => ({
          ...prev,
          isLoading: false, // Reset loading on error
          isStarted: false,
        }));
        alert("Failed to load question. Please try again.");
      }
    },
    [playerProfile, saveProfile, state.playerName, startNewQuestion]
  );

  useEffect(() => {
    return () => {
      // Reset loading state when component unmounts
      setState((prev) => ({ ...prev, isLoading: false }));
    };
  }, []);

  const handleStartQuiz = useCallback(async () => {
    if (state.isLoading) return; // Prevent multiple clicks

    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const newSessionId = await createSession();

      if (!newSessionId) {
        throw new Error("Failed to create session");
      }

      saveSession(newSessionId);

      const filteredHistory =
        playerProfile?.history?.filter(
          (session) => session.sessionId !== newSessionId
        ) || [];

      saveProfile({
        ...playerProfile,
        name: state.playerName,
        history: [
          ...filteredHistory,

          {
            sessionId: newSessionId,
            questions: [],
            totalScore: 0,
            totalQuestions: 1,
          },
        ],
      } as PlayerProfile);

      await handleFetchQuestion(newSessionId);
      setState((prev) => ({
        ...prev,
        isStarted: true,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to start quiz:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isStarted: false,
      }));
      alert("Failed to start quiz. Please try again.");
    }
  }, [
    state.playerName,
    playerProfile,
    saveProfile,
    saveSession,
    handleFetchQuestion,
    state.isLoading,
  ]);

  const handleAnswer = useCallback(
    async (answer: boolean) => {
      try {
        setState((prev) => ({ ...prev, isCorrectAnswer: answer }));
        setState((prev) => ({ ...prev, showAnswerModal: true }));

        if (playerProfile && state.currentQuestion) {
          const updatedHistory = playerProfile.history.map((session) => {
            if (session.sessionId === sessionId) {
              const updatedQuestions = session.questions.map((q) => {
                if (q.questionId === state.currentQuestion?.questionId) {
                  return {
                    ...q,
                    score: answer ? 1 : 0,
                  };
                }
                return q;
              });

              const questionExists = session.questions.some(
                (q) => q.questionId === state.currentQuestion?.questionId
              );

              const finalQuestions = questionExists
                ? updatedQuestions
                : [
                    ...updatedQuestions,
                    {
                      questionId: state.currentQuestion!.questionId,
                      title: state.currentQuestion!.title,
                      choices: state.currentQuestion!.choices,
                      score: answer ? 1 : 0,
                    },
                  ];

              return {
                ...session,
                questions: finalQuestions,
                totalQuestions: finalQuestions.length,
                totalScore: finalQuestions.reduce(
                  (sum, q) => sum + (q.score || 0),
                  0
                ),
              };
            }
            return session;
          });

          saveProfile({
            ...playerProfile,
            history: updatedHistory,
          });
        }
      } catch (error) {
        console.error("Failed to save answer:", error);
      }
    },
    [playerProfile, state.currentQuestion, saveProfile, sessionId]
  );

  const handleNextQuestion = useCallback(async () => {
    try {
      if (sessionId) {
        setState((prev) => ({ ...prev, showAnswerModal: false }));
        await handleFetchQuestion(sessionId);
      }
    } catch (error) {
      console.error("Failed to fetch next question:", error);
    }
  }, [sessionId, handleFetchQuestion]);

  const handlerPlayAgain = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isGameComplete: false,
      isStarted: false,
      currentQuestion: null,
    }));
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialQuestion = async () => {
      // Check if we should fetch
      if (!hasInitialFetch.current && sessionId) {
        try {
          setState((prev) => ({ ...prev, isLoading: true }));

          if (isMounted) {
            await handleFetchQuestion(sessionId);
            setState((prev) => ({ ...prev, isStarted: true }));
            hasInitialFetch.current = true; // Mark as fetched
          }
        } catch (error) {
          console.error("Failed to fetch initial question:", error);
        } finally {
          if (isMounted) {
            setState((prev) => ({ ...prev, isLoading: false }));
          }
        }
      }
    };

    fetchInitialQuestion();

    return () => {
      isMounted = false;
    };
  }, [sessionId, handleFetchQuestion]); // Only re-run if these change

  const handleOpenHistory = useCallback(() => {
    setState((prev) => ({ ...prev, showHistory: true }));
  }, []);

  const setShowHistory = useCallback((show: boolean) => {
    setState((prev) => ({ ...prev, showHistory: show }));
  }, []);

  const actions: QuizActions = {
    setShowAnswerModal: (show) =>
      setState((prev) => ({ ...prev, showAnswerModal: show })),
    setIsStarted: (started) =>
      setState((prev) => ({ ...prev, isStarted: started })),
    setCurrentQuestion: (question) =>
      setState((prev) => ({ ...prev, currentQuestion: question })),
    setIsLoading: (loading) =>
      setState((prev) => ({ ...prev, isLoading: loading })),
    setIsCorrectAnswer: (correct) =>
      setState((prev) => ({ ...prev, isCorrectAnswer: correct })),
    setPlayerName: (name) =>
      setState((prev) => ({ ...prev, playerName: name })),
    handleStartQuiz,
    handleAnswer,
    handleNextQuestion,
    handlerPlayAgain,
    handleOpenHistory,
    setShowHistory,
  };

  return [state, actions];
};
