const {
  createJob,
  updateJob,
  getJobById,
} = require("../controllers/job.controller");
const authorization = require("../middlewares/authorization");
const getUserInfos = require("../middlewares/getUserInfos");
const verifyJWT = require("../middlewares/verifyJWT");

const router = require("express").Router();

router
  .route("/")
  // .get("/", getAllJobs)
  .post(
    verifyJWT,
    authorization("hiring-manager"),
    getUserInfos("firstName", "lastName", "-_id"),
    createJob
  );

router
  .route("/:id")
  .get(getJobById)
  .patch(verifyJWT, authorization("hiring-manager"), updateJob);

module.exports = router;
