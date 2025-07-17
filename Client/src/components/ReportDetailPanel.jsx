import { useState } from "react";
import ConfidenceMeter from "./ConfidenceMeter";
import FeedbackForm from "./FeedbackForm";

export default function ReportDetailPanel({ report, onClose }) {
  const [activeTab, setActiveTab] = useState("summary");

  const tabs = [
    { key: "summary", label: "Summary" },
    { key: "trust", label: "Why We Trust This" },
    { key: "feedback", label: "Feedback" },
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/50 z-50 flex justify-end">
      <div
        onClick={onClose}
        className="hidden md:block bg-gray-900/50 w-full h-full"
      ></div>

      <div className="w-full max-w-lg h-full bg-white dark:bg-[#0f0f1a] p-6 overflow-y-auto">
        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-red-400"
        >
          Close ✕
        </button>

        <h2 className="text-xl font-semibold text-primary mt-4">
          {report.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
          {report.industry} • {report.reportType}
        </p>

        {/* Tabs */}
        <div className="flex gap-4 mt-6 border-b border-gray-300 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-3 text-sm font-medium ${
                activeTab === tab.key
                  ? "border-b-2 border-gold text-gold"
                  : "text-gray-500 dark:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "summary" && (
            <>
              <h3 className="font-medium text-lg text-gold">Report Summary</h3>
              <p className="text-sm text-gray-600 dark:text-gray-200 mt-2">
                {report.summary}
              </p>
              <ConfidenceMeter score={report.confidenceScore} />
            </>
          )}

          {activeTab === "trust" && (
            <>
              <h3 className="font-medium text-lg text-gold mb-2">Sources</h3>
              <ul className="space-y-2">
                {report.sources.map((url, i) => (
                  <li
                    key={i}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm text-blue-700 dark:text-blue-300"
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      🔗 {url}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {activeTab === "feedback" && <FeedbackForm reportId={report.id} />}
        </div>
      </div>
    </div>
  );
}
