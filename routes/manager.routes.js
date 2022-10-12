const { getManagerJobsById } = require("../controllers/manager.controller");
const authorization = require("../middlewares/authorization");
const verifyJWT = require("../middlewares/verifyJWT");

const router = require("express").Router();

router.get(
  "/jobs",
  verifyJWT,
  authorization("hiring-manager"),
  getManagerJobsById
);

module.exports = router;
