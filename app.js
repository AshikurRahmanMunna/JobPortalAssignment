const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("colors");

// routes
const userRoutes = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@jobportalassignment.eriushz.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => console.log(`Database Connected`.magenta))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Job Portal Assignment server is running");
});

// routes
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan.bold);
});
