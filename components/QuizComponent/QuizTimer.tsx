import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface QuizTimerProps {
  startTime: number;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({ startTime }) => {
  const [spentTime, setSpentTime] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const calculatedTime = (Date.now() - startTime) / 1000;
      setSpentTime(calculatedTime < 0 ? 0 : calculatedTime);
    }, 100);

    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white text-xl mb-4 text-center font-mono"
    >
      Time: {spentTime.toFixed(1)}s
    </motion.div>
  );
};
