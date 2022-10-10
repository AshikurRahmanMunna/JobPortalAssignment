const mongoose = require("mongoose");

const date = new Date();
const { ObjectId } = mongoose.Types;

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minLength: [10, "Title must be at least 6 characters long"],
    maxLength: [150, "Title is too large"],
  },
  description: {
    type: String,
    required: [true, "Title is required"],
    minLength: [10, "Description needs to be at least 10 character long"],
  },
  location: String,
  hiringManager: {
    email: {
      required: true,
      type: String,
    },
    id: {
      required: true,
      type: ObjectId,
    },
  },
  vacancy: {
    minVacancy: {
      type: Number,
      min: 1,
    },
    maxVacancy: {
      type: Number,
    },
  },
  experienceRequirements: [
    {
      text: {
        type: String,
        required: true,
      },
    },
  ],
  educationalRequirements: [
    {
      text: {
        type: String,
        required: true,
      },
    },
  ],
  jobResponsibilities: [
    {
      text: {
        type: String,
        required: true,
      },
    },
  ],
  employmentStatus: [
    {
      type: String,
      enum: {
        values: [
          "Full time",
          "Part time",
          "Intern",
          "Contract",
          "Fixed Term",
          "Independent Contractor",
          "Commission",
          "Migrant",
          "Overseas",
          "Seasonal",
          "Temporary",
          "On Call",
          "Volunteer",
          "Emergency",
          "Other",
        ],
        message: "{VALUE} is not a employment type",
      },
      default: "Full time",
    },
  ],
  workplace: {
    type: String,
    enum: {
      values: ["Remote", "On Site"],
      message: "{VALUE} is not a employment type",
    },
    default: "On Site",
  },
  salary: {
    minSalary: Number,
    maxSalary: Number,
    currency: {
      type: String,
      enum: {
        values: ["USD", "BDT"],
        message: "We don't accept {VALUE} currency",
      },
      uppercase: true,
      default: "BDT",
    },
  },
  publishedAt: {
    type: Date,
    default: Date.now(),
  },
  deadline: {
    type: Date,
    default: date.setDate(date.getDate() + 30),
  },
  status: {
    type: String,
    enum: {
      values: ["active", "blocked", "temporarily-blocked"],
      message: "{VALUE} is not a status",
    },
    default: "active",
  },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
