import { motion } from "motion/react";

export default function ReportCard({ report, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      className="p-4 rounded-xl bg-white dark:bg-[#1a1a2e] shadow-md cursor-pointer border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-primary">{report.title}</h3>
        <span className="bg-gold text-white px-2 py-1 rounded text-sm">
          {report.confidenceScore}%
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
        {report.industry} • {report.reportType}
      </p>
    </motion.div>
  );
}
