const { getManagerJobsByIdService } = require("../services/manager.service");
const generateError = require("../utils/generateError");

exports.getManagerJobsById = async (req, res) => {
  try {
    const { _id } = req.user;
    const fields =
      req.query?.fields?.split(",")?.join(" ") ||
      "-hiringManager -responsibilities -additionalRequirements -benefits -createdAt -updatedAt";
    const pagination = {
      skip: (Number(req.query.page || 1) - 1) * Number(req.query.limit || 10),
      limit: Number(req.query.limit || 10),
    };
    const jobs = await getManagerJobsByIdService({ id: _id, fields, pagination });
    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(400).json({
      error: generateError(error, "Can't get jobs of this manager"),
    });
  }
};
