"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Choice } from "@/types/quiz";
import { submitAnswer } from "@/services/quizService";
import { useAuth } from "@/context/AuthContext";
import { QuizChoice } from "./QuizChoice";
import { QuizTimer } from "./QuizTimer";
// import { PlayerProfile } from "@/types/auth";

interface QuestionsProps {
  title: string;
  choices: Choice[];
  setShowAnswerModal: (show: boolean) => void;
  // setIsCorrectAnswer: (isCorrect: boolean) => void;
  onAnswer: (answer: boolean) => void;
}

const Quiz: React.FC<QuestionsProps> = ({
  title,
  choices,
  setShowAnswerModal,
  onAnswer,
}) => {
  const { sessionId } = useAuth();
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
  }, [title]); 

  const handleSelectChoice = useCallback(
    async (questionId: string, choiceId: string) => {
      try {
        setSelectedChoice(choiceId);
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);

        const { data } = await submitAnswer({
          sessionId: sessionId || "",
          questionId,
          choiceId,
          timeSpent,
        });

        if (data) {
          onAnswer(data.isCorrect);
        }

        setShowAnswerModal(true);
      } catch (error) {
        console.error("Failed to handle answer:", error);
      }
    },
    [startTime, setShowAnswerModal, sessionId, onAnswer]
  );

  return (
    <div className="flex justify-center items-center flex-grow">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md lg:max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20"
      >
        <div className="p-6 md:p-8">
          <QuizTimer startTime={startTime} />

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-white mb-8"
          >
            {title}
          </motion.h2>

          <div className="space-y-4">
            {choices.map((choice, index) => (
              <QuizChoice
                key={choice.choiceId}
                choice={choice}
                index={index}
                isSelected={selectedChoice === choice.choiceId}
                onSelect={handleSelectChoice}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;
