const { createJobService } = require("../services/job.service");
const generateError = require("../utils/generateError");

exports.createJob = async (req, res) => {
  try {
    const data = {
      ...req.body,
      hiringManager: { email: req.user.email, id: req.user._id },
    };
    const job = await createJobService(data);
    res.status(200).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(400).json({
      error: generateError(error, "", true),
    });
  }
};
