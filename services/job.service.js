const Job = require("../models/Job");

exports.createJobService = async (data) => {
  const job = await Job.create(data);
  return job;
};

exports.findJobByIdService = async (id, fields = "", populate = "") => {
  const job = await Job.findById(id).select(fields).populate(populate);
  return job;
};

exports.updateJobService = async (id, data) => {
  const job = await Job.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return job;
};
