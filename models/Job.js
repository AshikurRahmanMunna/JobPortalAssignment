const mongoose = require("mongoose");

const date = new Date();
const { ObjectId } = mongoose.Types;

// only title and description is required
const jobSchema = mongoose.Schema(
  {
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
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: [true, "Location coordinates are required"],
        validate: {
          validator: (value) => value.length === 2,
        },
        message:
          "Must be a latitude and a longitude. First one is longitude and second one is latitude",
      },
    },
    hiringManager: {
      name: {
        required: true,
        type: String,
      },
      id: {
        required: true,
        type: ObjectId,
        ref: "User",
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
    salary: {
      minSalary: {
        type: Number,
        min: [0, "Salary can't be negative"],
      },
      maxSalary: {
        type: Number,
        min: [0, "Salary Can't be negative"],
      },
      currency: {
        type: String,
        enum: {
          values: ["USD", "BDT"],
          message: "We don't accept {VALUE} currency",
        },
        uppercase: true,
      },
      timePeriod: {
        type: String,
        enum: {
          values: ["year", "month", "week", "day", "hour"],
          message: "{VALUE} is not a valid time period for salary",
        },
        lowercase: true,
      },
    },
    age: {
      minAge: {
        type: Number,
        min: [12, "Age can't be at least 12 years"],
      },
      maxAge: {
        type: Number,
      },
    },
    education: [String],
    experience: {
      yearly: {
        minExperience: {
          type: Number,
          min: [0, "Experience can't be negative"],
        },
        maxExperience: {
          type: Number,
        },
      },
      extraExperience: [String],
    },
    workplace: {
      type: String,
      enum: {
        values: ["remote", "on-site"],
        message: "{VALUE} is not a employment type",
      },
      lowercase: true,
      default: "on-site",
    },
    responsibilities: [String],
    employmentStatus: {
      type: [
        {
          type: String,
          enum: {
            values: [
              "full-time",
              "part-time",
              "intern",
              "contract",
              "fixed-Term",
              "independent-contractor",
              "commission",
              "migrant",
              "overseas",
              "seasonal",
              "temporary",
              "on-call",
              "volunteer",
              "emergency",
              "other",
            ],
            message: "{VALUE} is not a employment type",
          },
        },
      ],
      default: ["full-time"],
      lowercase: true,
    },
    additionalRequirements: [String],
    benefits: [String],
    extraSections: {
      type: [
        {
          title: String,
          descriptions: {
            type: [String],
            validate: {
              validator: (value) => value.length <= 10,
              message: "Max 15 descriptions can be added",
            },
          },
        },
      ],
      validate: {
        validator: (value) => value.length <= 2,
        message: "Too many extra sections",
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "transgender"],
    },
    appliedCount: {
      type: Number,
      min: 0,
      default: 0,
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
  },
  { timestamps: true }
);

jobSchema.index({ location: "2dsphere" });

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
