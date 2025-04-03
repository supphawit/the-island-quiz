"use client";

import React, { memo } from "react";

import { useQuizLogic } from "@/hooks/useQuizLogic";
import { QuizActions, QuizState } from "@/types/quiz";

import Quiz from "./QuizComponent/Quiz";
import QuizModal from "./QuizComponent/QuizModal";
import { LoadingOverlay } from "./common/LoadingOverlay";
import { QuizHeader } from "./QuizComponent/QuizHeader";
import { QuizStart } from "./QuizComponent/QuizStart";
import { QuizSummary } from "./QuizComponent/QuizSummary";
import { History } from "./QuizComponent/History";

const QuizContent = memo<{
  state: QuizState;
  actions: QuizActions;
}>(({ state, actions }) => {
  if (state.isGameComplete) {
    return <QuizSummary onPlayAgain={actions.handlerPlayAgain} />;
  }

  if (!state.isStarted) {
    return (
      <QuizStart
        isLoading={state.isLoading}
        startQuiz={actions.handleStartQuiz}
        playerName={state.playerName}
        setPlayerName={actions.setPlayerName}
      />
    );
  }

  return (
    <Quiz
      title={state.currentQuestion?.title || ""}
      choices={state.currentQuestion?.choices || []}
      setShowAnswerModal={actions.setShowAnswerModal}
      onAnswer={actions.handleAnswer}
    />
  );
});

QuizContent.displayName = "QuizContent";

const QuizIsland: React.FC = () => {
  const [state, actions] = useQuizLogic();

  return (
    <>
      <LoadingOverlay isLoading={state.isLoading} />

      <div className="flex flex-col min-h-screen p-4 ">
        <QuizHeader />
        <History />

        <QuizContent state={state} actions={actions} />

        <QuizModal
          showAnswerModal={state.showAnswerModal}
          isCorrect={state.isCorrectAnswer}
          onNext={actions.handleNextQuestion}
        />
      </div>
    </>
  );
};

export default memo(QuizIsland);
