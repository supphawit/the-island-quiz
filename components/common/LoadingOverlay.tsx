import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
}) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm 
                 flex items-center justify-center z-50"
      >
        <div
          className="bg-white/10 backdrop-blur p-8 rounded-2xl 
                    flex flex-col items-center gap-4"
        >
          <div
            className="w-12 h-12 border-4 border-white/30 border-t-white 
                       rounded-full animate-spin"
          />
          <p className="text-white text-lg font-medium">Loading...</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
