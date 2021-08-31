import Joi from "joi";
import { v4 as uuid } from "uuid";

exports.createNewJob = async (req, res) => {
  const { Job } = req.context.models;
  console.log("%%%%: ", Job);
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        error: true,
        message: "Cannot post job.",
      });
    }
    const newJob = new Job({
      title,
      description,
    });

    await newJob.save();

    return res.status(200).json({
      success: true,
      message: "Job Successful",
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({
      error: true,
      message: "Error posting job.",
    });
  }
};

exports.getAllJobs = async (req, res) => {
  const { Job } = req.context.models;
  const jobs = await Job.find();
  return res.status(200).json({
    success: true,
    jobs,
  });
};
