import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import ReportForm from "@/components/ReportForm";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null);

  const fetchReports = async () => {
    try {
      const res = await axios.get("/api/reports");
      console.log(res.data);
      setReports(res.data);
    } catch (err) {
      console.error("Failed to load reports:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this report?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/api/reports/${id}`);

      fetchReports();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="max-w-6xl mx-auto md:p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Reports</h1>

      <ReportForm
        report={editingReport}
        onSuccess={() => {
          setEditingReport(null);
          fetchReports();
        }}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {reports.length === 0 ? (
          <div className="text-center text-gray-500 col-span-full">
            No reports found.
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report._id}
              className="border rounded-lg shadow-sm p-4 flex flex-col justify-between dark:bg-[#1a1a2e]"
            >
              <div>
                <h2 className="text-lg font-semibold">{report.title}</h2>
                <p className="text-sm text-gray-600">
                  Industry: {report.industry}
                </p>
                <p className="text-sm text-gray-600">
                  Type: {report.reportType}
                </p>
                <p className="text-sm text-gray-600">
                  Confidence Score:{" "}
                  <span className="font-medium">{report.confidenceScore}%</span>
                </p>
              </div>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 170, behavior: "smooth" });
                    setEditingReport(report);
                  }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(report._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
