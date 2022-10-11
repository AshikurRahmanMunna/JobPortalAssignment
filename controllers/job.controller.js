const {
  createJobService,
  findJobByIdService,
  updateJobService,
} = require("../services/job.service");
const generateError = require("../utils/generateError");
const generateFullName = require("../utils/generateFullName");

exports.createJob = async (req, res) => {
  try {
    const data = {
      ...req.body,
      hiringManager: {
        name: generateFullName(req.user.firstName, req.user.lastName),
        id: req.user._id,
      },
    };
    const job = await createJobService(data);
    res.status(200).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(400).json({
      error: generateError(error),
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await findJobByIdService(id);
    if (!job) {
      return res.status(400).json({ error: "No Jobs Found to update" });
    }
    if (job?.hiringManager?.id?.toString() !== req?.user?._id) {
      return res.status(400).json({ error: "Job is not created by you" });
    }
    const updatedJob = await updateJobService(id, req.body);
    if (!updatedJob.modifiedCount) {
      return res.status(400).json({ error: "Couldn't Update The Job" });
    }
    res.status(200).json({
      message: "Job Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: generateError(error),
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await findJobByIdService(req.params.id, "", {
      path: "hiringManager.id",
      select: "-password",
    });
    if (!job) {
      return res.status(400).json({ error: "No job found" });
    }
    res.status(200).json({
      job,
    });
  } catch (error) {
    res.status(400).json({
      error: generateError(error),
    });
  }
};
