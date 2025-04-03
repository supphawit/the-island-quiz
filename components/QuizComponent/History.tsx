import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, memo } from "react";

const getGradeResult = (score: number): { text: string; color: string } => {
  if (score >= 8) {
    return { text: "Excellent", color: "text-green-400" };
  } else if (score >= 5) {
    return { text: "Pass", color: "text-yellow-400" };
  } else {
    return { text: "Fail", color: "text-red-400" };
  }
};

export const History = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { playerProfile, sessionId } = useAuth(); // Add sessionId from useAuth
  const history = playerProfile?.history || [];

  return (
    <>
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-4 px-4 py-2 
                 bg-white/10 hover:bg-white/20
                 backdrop-blur-sm rounded-lg 
                 border border-white/20
                 text-white font-medium
                 flex items-center gap-2
                 transition-colors duration-200
                 shadow-lg"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        History
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm 
                       flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white/10 backdrop-blur 
                       rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Game History</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-white/70 text-center py-4">
                    No game history yet
                  </p>
                ) : (
                  history.map((session, index) => {
                    const grade = getGradeResult(session.totalScore || 0);
                    return (
                      <motion.div
                        key={session.sessionId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white/5 rounded-xl p-4 space-y-2`}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-white/70">
                                  Game {index + 1}
                                </span>
                                {session.sessionId !== sessionId && (
                                  <span className={`text-sm font-medium ${grade.color}`}>
                                    • {grade.text}
                                  </span>
                                )}
                                {session.sessionId === sessionId && (
                                  <span className="px-2 py-0.5 text-xs font-medium 
                             bg-blue-500 text-white rounded-full">
                                    Current
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-white font-medium">
                              Score: {session.totalScore ?? 0}/{session.totalQuestions ?? 0}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

History.displayName = "History";
