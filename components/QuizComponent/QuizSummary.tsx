import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface QuizSummaryProps {
  onPlayAgain: () => void;
}

const getGradeResult = (score: number): { text: string; color: string } => {
  if (score >= 8) {
    return { text: "Excellent", color: "!text-green-400" };
  } else if (score >= 5) {
    return { text: "Pass", color: "!text-yellow-400" };
  } else {
    return { text: "Fail", color: "!text-red-400" };
  }
};

export const QuizSummary: React.FC<QuizSummaryProps> = ({ onPlayAgain }) => {
  const { playerProfile } = useAuth();

  const summaryData = useMemo(() => {
    const currentSession =
      playerProfile?.history[playerProfile.history.length - 1];
    const totalScore = currentSession?.totalScore || 0;
    const totalQuestions = currentSession?.totalQuestions || 0;
    const result = getGradeResult(totalScore);

    return {
      playerName: playerProfile?.name || "Player",
      totalScore,
      totalQuestions,
      result,
    };
  }, [playerProfile]);

  return (
    <div className="flex-grow flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-sm 
                 border border-white/20 shadow-xl"
      >
        <div className="text-center space-y-8">
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl font-bold text-white"
          >
            {/* Game Complete! 🎮 */}
            {/* <p className="text-lg font-medium"> */}
            Player: {summaryData.playerName}
            {/* </p> */}
          </motion.h2>

          <div className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/90"
            >
              <p className="text-lg font-medium">Score is</p>
              <p className="text-5xl font-bold mt-3">
                {summaryData.totalScore}/{summaryData.totalQuestions}
              </p>
              <p className="mt-3">
                <span className="text-lg font-medium">Result: </span>
                <span
                  className={`text-2xl font-bold ${summaryData.result.color}`}
                >
                  {summaryData.result.text}
                </span>
              </p>
            </motion.div>
          </div>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r 
                     from-indigo-500 to-purple-500 hover:from-indigo-600 
                     hover:to-purple-600 text-white font-semibold text-lg uppercase
                     transition-all duration-300 shadow-lg shadow-purple-500/20"
          >
            Continue
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
