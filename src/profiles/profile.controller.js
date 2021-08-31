import Joi from "joi";
import { v4 as uuid } from "uuid";

exports.createProfile = async (req, res) => {
  const { Profile } = req.context.models;
  console.log("%%%%: ", Profile);
  try {
    const { name, gender } = req.body;
    if (!name) {
      return res.status(400).json({
        error: true,
        message: "Cannot post Profile.",
      });
    }
    const newProfile = new Profile({
      name,
      gender,
    });

    await newProfile.save();

    return res.status(200).json({
      success: true,
      message: "Profile Creation Successful",
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({
      error: true,
      message: "Error creating profile.",
    });
  }
};
