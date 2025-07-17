import Feedback from "../models/Feedback.mjs";

export const submitFeedback = async (req, res, next) => {
  try {
    const { reportId, userComment, flaggedSection } = req.body;

    const feedback = new Feedback({
      reportId,
      userComment,
      flaggedSection,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted" });
  } catch (err) {
    next(err);
  }
};
