import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/User.mjs";
import Report from "./src/models/Report.mjs";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/perceive-now";

const seedUsers = [
  {
    name: "Alice Admin",
    email: "alice@admin.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Bob Reviewer",
    email: "bob@reviewer.com",
    password: "reviewer123",
    role: "reviewer",
  },
  {
    name: "Charlie Viewer",
    email: "charlie@viewer.com",
    password: "viewer123",
    role: "viewer",
  },
  {
    name: "Diana Viewer",
    email: "diana@viewer.com",
    password: "viewer123",
    role: "viewer",
  },
  {
    name: "Eve Reviewer",
    email: "eve@reviewer.com",
    password: "reviewer123",
    role: "reviewer",
  },
];

const seedReports = [
  {
    title: "Q1 Market Forecast",
    summary: "Predicted growth in Q1 due to seasonal trends.",
    reportType: "forecast",
    industry: "Fintech",
    confidenceScore: 40,
    sources: ["MarketWatch", "Statista"],
  },
  {
    title: "Energy Sector Analysis",
    summary: "A deep dive into current oil price dynamics.",
    reportType: "analysis",
    industry: "Healthcare",
    confidenceScore: 56,
    sources: ["Bloomberg", "IEA"],
  },
  {
    title: "Tech Growth Forecast",
    summary: "AI-driven growth predictions in the tech industry.",
    reportType: "forecast",
    industry: "Fintech",
    confidenceScore: 92,
    sources: ["Gartner", "McKinsey"],
  },
  {
    title: "Financial Services Overview",
    summary: "Banking sector performance in Q2 2024.",
    reportType: "analysis",
    industry: "Fintech",
    confidenceScore: 73,
    sources: ["Forbes", "CNBC"],
  },
  {
    title: "Healthcare Spending Trends",
    summary: "Spending increase projections post-pandemic.",
    reportType: "forecast",
    industry: "Healthcare",
    confidenceScore: 88,
    sources: ["WHO", "Healthline"],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany();
    await Report.deleteMany();

    // Hash passwords manually to trigger pre-save hook
    const hashedUsers = await Promise.all(
      seedUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return user;
      })
    );

    // Insert data
    await User.insertMany(hashedUsers);
    await Report.insertMany(seedReports);

    console.log("🎉 Seeding successful!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
