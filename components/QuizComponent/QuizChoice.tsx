import { motion } from "framer-motion";
import { Choice } from "@/types/quiz";

interface QuizChoiceProps {
  choice: Choice;
  index: number;
  isSelected: boolean;
  onSelect: (questionId: string, choiceId: string) => void;
}

export const QuizChoice: React.FC<QuizChoiceProps> = ({
  choice,
  index,
  isSelected,
  onSelect,
}) => (
  <motion.button
    key={choice.choiceId}
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.3 + index * 0.1 }}
    onClick={() => onSelect(choice.questionId, choice.choiceId)}
    className={`w-full p-4 md:p-5 text-left rounded-xl transition-all duration-300 border-2 ${
      isSelected
        ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/30 transform scale-105"
        : "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
    }`}
  >
    <div className="flex items-center">
      <span className="flex justify-center items-center w-8 h-8 mr-3 rounded-full bg-indigo-900/40 text-white text-sm font-medium">
        {index + 1}
      </span>
      <span className="text-lg font-medium">{choice.title}</span>
    </div>
  </motion.button>
);
