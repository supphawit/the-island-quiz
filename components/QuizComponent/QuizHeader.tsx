import { motion } from "framer-motion";
import { memo } from "react";

export const QuizHeader = memo(() => (
  <motion.h1
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="text-2xl font-bold tracking-wide text-white uppercase p-4"
  >
    Quiz Island
  </motion.h1>
));

QuizHeader.displayName = 'QuizHeader';