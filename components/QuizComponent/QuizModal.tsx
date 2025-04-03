import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface ModalProps {
  showAnswerModal: boolean;
  isCorrect: boolean;
  onNext: () => void;
}

const QuizModal: React.FC<ModalProps> = ({
  showAnswerModal,
  isCorrect,
  onNext,
}) => {
  return (
    <AnimatePresence>
      {showAnswerModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl max-w-sm w-full mx-4"
          >
            <div className="flex flex-col gap-4 py-8 items-center">
              {/* Icon Container */}
              <div
                className={`w-20 h-20 rounded-full ${
                  isCorrect ? "bg-green-500/30" : "bg-red-500/30"
                } flex items-center justify-center`}
              >
                {isCorrect ? (
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L20 7"
                      stroke="#4ADE80"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="#F87171"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              {/* Text Content */}
              <div className="text-center space-y-2">
                <p className="text-base text-white/80">Your Answer is</p>
                <h2
                  className={`text-4xl font-bold ${
                    isCorrect ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isCorrect ? "Correct!" : "Incorrect"}
                </h2>
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNext}
                className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 
                         hover:from-indigo-600 hover:to-purple-600 rounded-xl uppercase
                         text-white text-lg font-semibold tracking-wide
                         transition-all duration-300 shadow-lg shadow-purple-500/20"
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
