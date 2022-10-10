const { createJob } = require("../controllers/job.controller");
const authorization = require("../middlewares/authorization");
const getUserInfos = require("../middlewares/getUserInfos");
const verifyJWT = require("../middlewares/verifyJWT");

const router = require("express").Router();

router.post(
  "/",
  verifyJWT,
  authorization("hiring-manager"),
  getUserInfos("firstName", "lastName", "-_id"),
  createJob
);
module.exports = router;
