const {
  createJobService,
  findJobByIdService,
  updateJobService,
  getAllJobsService,
} = require("../services/job.service");
const generateError = require("../utils/generateError");
const generateFullName = require("../utils/generateFullName");

exports.getAllJobs = async (req, res) => {
  try {
    const location = req.query?.location || "";
    const jobTypes = req.query?.jobTypes?.split(",") || [];
    const salaryRange = {
      min: Number(req.query.minSalary) || 0,
      max: Number(req.query.maxSalary) || null,
    };
    const filters = {
      location,
      jobTypes,
      salaryRange,
    };
    const pagination = {
      skip: (Number(req.query.page || 1) - 1) * Number(req.query.limit || 10),
      limit: Number(req.query.limit || 10),
    };
    const fields = req.query?.fields?.split(",").join(" ");
    const sort = req.query?.sort?.split(",").join(" ");
    const jobs = await getAllJobsService({ filters, pagination, sort, fields });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(400).json({
      error: generateError(error, "", true),
    });
  }
};

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
      error: generateError(error, "Can't create the job"),
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
      select:
        "-password -createdAt -updatedAt -passwordResetAt -passwordResetToken -passwordResetExpires -__v",
    });
    if (!job) {
      return res.status(400).json({ error: "No job found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({
      error: generateError(error),
    });
  }
};
