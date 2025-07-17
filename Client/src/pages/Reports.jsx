import ReportCard from "../components/ReportCard";
import { useReportFilter } from "../store/reportFilter";
import { useState, useEffect } from "react";
import ReportDetailPanel from "../components/ReportDetailPanel";
import axios from "@/lib/axios";

export default function ReportsPage() {
  const { reportType, industry, minConfidence, setFilters } = useReportFilter();
  const [reports, setReports] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true); // set loading true at start
      const res = await axios.get("/api/reports");
      setReports(res.data);
      setError("");
    } catch (err) {
      console.error("Failed to load reports:", err);
      setError("Failed to load reports");
    } finally {
      setLoading(false); // always set loading false at end
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Apply filters
  const filtered = reports.filter((r) => {
    return (
      (reportType ? r.reportType === reportType : true) &&
      (industry ? r.industry === industry : true) &&
      r.confidenceScore >= minConfidence
    );
  });

  const selectedReport = reports.find((r) => r.id === selectedId);

  console.log("Axios instance:", axios.defaults.baseURL);

  if (loading)
    return <h1 className="p-4 text-center text-gray-500">Loading...</h1>;

  if (error) return <h1 className="p-4 text-center text-red-500">{error}</h1>;
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Filters */}
      <div className="flex gap-4 items-center flex-wrap">
        <select
          onChange={(e) => setFilters({ reportType: e.target.value })}
          className="p-2 border rounded dark:bg-[#0d0d17]"
        >
          <option value="">All Types</option>
          <option value="forecast">Forecast</option>
          <option value="analysis">Analysis</option>
        </select>

        <select
          onChange={(e) => setFilters({ industry: e.target.value })}
          className="p-2 border rounded dark:bg-[#0d0d17]"
        >
          <option value="">All Industries</option>
          <option value="Fintech">Fintech</option>
          <option value="Healthcare">Healthcare</option>
        </select>

        <input
          type="range"
          min={0}
          max={100}
          step={5}
          onChange={(e) =>
            setFilters({ minConfidence: Number(e.target.value) })
          }
        />
        <span className="text-sm text-gray-500 dark:text-gray-300">
          Min Confidence: {minConfidence}%
        </span>
      </div>

      {reports.length === 0 && (
        <h1 className="p-4 text-center text-gray-500">No Reports found.</h1>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {/* Reports */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onClick={() => setSelectedId(report.id)}
          />
        ))}
      </div>

      {/* Slide-out Detail Panel */}
      {selectedReport && (
        <ReportDetailPanel
          report={selectedReport}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
