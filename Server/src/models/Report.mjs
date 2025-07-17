import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    reportType: {
      type: String,
      enum: ["forecast", "analysis"],
      required: true,
    },
    industry: String,
    confidenceScore: { type: Number, min: 0, max: 100, required: true },
    sources: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
