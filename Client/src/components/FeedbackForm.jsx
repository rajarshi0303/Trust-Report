import { useState } from "react";
import axios from "@/lib/axios";

export default function FeedbackForm({ reportId }) {
  const [comment, setComment] = useState("");
  const [flaggedSection, setFlaggedSection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send to backend (stubbed for now)
    try {
      await axios.post("http://localhost:3000/feedback", {
        reportId,
        userComment: comment,
        flaggedSection,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Feedback submit error:", err);
    }
  };

  return submitted ? (
    <p className="text-green-600 mt-2">✅ Feedback submitted!</p>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-3 mt-2">
      <textarea
        rows="3"
        placeholder="Suggest improvements..."
        className="w-full border rounded p-2 text-sm"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input
        type="text"
        placeholder="Flagged section (optional)"
        className="w-full border rounded p-2 text-sm"
        value={flaggedSection}
        onChange={(e) => setFlaggedSection(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Submit Feedback
      </button>
    </form>
  );
}
