import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import axios from "@/lib/axios";

export default function ReportForm({ report, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    reportType: "",
    confidenceScore: 0,
    industry: "",
    sources: [""], // Add sources as an array of strings
  });

  useEffect(() => {
    if (report) {
      setFormData({
        ...report,
        sources:
          report.sources && report.sources.length > 0 ? report.sources : [""],
      });
    }
  }, [report]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (report?._id) {
      await axios.put(`/api/reports/${report._id}`, formData);
    } else {
      await axios.post("/api/reports", formData);
    }

    setFormData({
      title: "",
      summary: "",
      reportType: "",
      confidenceScore: 0,
      industry: "",
      sources: [""],
    });

    onSuccess();
  };

  const handleSourceChange = (index, value) => {
    const updatedSources = [...formData.sources];
    updatedSources[index] = value;
    setFormData((prev) => ({ ...prev, sources: updatedSources }));
  };

  const addSourceField = () => {
    setFormData((prev) => ({ ...prev, sources: [...prev.sources, ""] }));
  };

  const removeSourceField = (index) => {
    const updatedSources = [...formData.sources];
    updatedSources.splice(index, 1);
    setFormData((prev) => ({ ...prev, sources: updatedSources }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-4 rounded bg-white dark:bg-gray-900"
    >
      <h2 className="font-semibold">
        {report ? "Edit Report" : "Create New Report"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full p-2 border dark:bg-gray-800"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="summary"
        placeholder="Summary"
        className="w-full p-2 border dark:bg-gray-800"
        value={formData.summary}
        onChange={handleChange}
        required
      />

      <div className="flex gap-4">
        <Select
          value={formData.reportType}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, reportType: value }))
          }
        >
          <SelectTrigger className=" text-sm px-3 py-1.5  dark:bg-gray-800 dark:text-white">
            <SelectValue className="text-sm" placeholder="Report" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-900">
            <SelectItem value="forecast">Forecast</SelectItem>
            <SelectItem value="analysis">Analysis</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={formData.industry}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, industry: value }))
          }
        >
          <SelectTrigger className=" text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white">
            <SelectValue className="text-sm" placeholder="Industry" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-900">
            <SelectItem value="Fintech">Fintech</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
          </SelectContent>
        </Select>

        <input
          type="number"
          name="confidenceScore"
          placeholder="Score"
          min={0}
          max={100}
          value={formData.confidenceScore}
          onChange={handleChange}
          className=" text-sm px-3 py-1.5 border rounded-sm w-24 dark:bg-gray-800"
        />
      </div>

      <div>
        <label className="font-medium">Sources</label>
        {formData.sources.map((source, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="text"
              value={source}
              onChange={(e) => handleSourceChange(index, e.target.value)}
              placeholder={`Source URL ${index + 1}`}
              className="w-full p-2 border dark:bg-gray-800"
              required
            />
            {formData.sources.length > 1 && (
              <button
                type="button"
                onClick={() => removeSourceField(index)}
                className="text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addSourceField}
          className="mt-2 text-amber-600"
        >
          + Add Source
        </button>
      </div>

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded dark:bg-gray-700"
      >
        {report ? "Update" : "Create"}
      </button>
    </form>
  );
}
