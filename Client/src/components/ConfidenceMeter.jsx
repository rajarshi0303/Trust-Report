import { motion } from "motion/react";

export default function ConfidenceMeter({ score }) {
  return (
    <div className="relative w-full bg-gray-300 dark:bg-gray-700 h-6 rounded-full overflow-hidden mt-2">
      <motion.div
        key={score}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1 }}
        className="h-full bg-amber-400 rounded-full"
      />
      <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-800 dark:text-white">
        {score}%
      </span>
    </div>
  );
}
