const Job = require("../models/Job");

exports.getAllJobsService = async ({
  filters = {},
  pagination = {},
  sort = "",
  fields = "",
}) => {
  let filtersObj = {
    location: { $regex: filters.location, $options: "i" },
  };
  if (!(filters.jobTypes.length === 0)) {
    filtersObj.jobTypes = { $in: filters.jobTypes };
  }
  if (filters.salaryRange.min) {
    filtersObj["salary.minSalary"] = { $gte: filters.salaryRange.min };
  }
  if (filters.salaryRange.max) {
    filtersObj["salary.maxSalary"] = { $lte: filters.salaryRange.max };
  }
  const jobs = await Job.find(filtersObj)
    .skip(pagination.skip)
    .limit(pagination.limit)
    .select(fields)
    .sort(sort);
  return jobs;
};

exports.createJobService = async (data) => {
  const job = await Job.create(data);
  return job;
};

exports.findJobByIdService = async (id, fields = "", populate) => {
  const job = await Job.findById(id).select(fields).populate(populate);
  return job;
};

exports.updateJobService = async (id, data) => {
  const job = await Job.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return job;
};
