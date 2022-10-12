const Job = require("../models/Job");

exports.getManagerJobsByIdService = async ({ id, fields, pagination }) => {
  const job = await Job.find({ "hiringManager.id": id })
    .skip(pagination.skip)
    .limit(pagination.limit)
    .select(fields);
  return job;
};
