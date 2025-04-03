import { motion } from "framer-motion";

interface QuizStartButtonProps {
  isLoading: boolean;
  startQuiz: () => void;
  playerName: string;
  setPlayerName: (name: string) => void;
}

export const QuizStartButton: React.FC<QuizStartButtonProps> = ({
  isLoading,
  startQuiz,
  playerName,
  setPlayerName,
}) => (
  <div className="flex-grow flex items-center justify-center -top-10">
    <div className="flex flex-col relative -top-10 items-center gap-2 w-full max-w-sm">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="text-white text-xl font-medium">Hi,</span>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          maxLength={20}
          className="w-32 px-3  bg-transparent
                   border-b-2 border-white/20 focus:border-white/40
                   !text-white text-xl placeholder:text-white/50
                   outline-none transition-all duration-300"
        />
      </motion.div>

      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startQuiz}
        disabled={isLoading}
        className="w-full px-8 py-4 bg-white/20 rounded-xl 
                  border border-white/30 shadow-xl hover:bg-white/30 
                  transition-all duration-300 text-white font-bold text-xl uppercase
                  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : "Start"}
      </motion.button>
    </div>
  </div>
);
