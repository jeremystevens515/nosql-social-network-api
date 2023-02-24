const router = require("express").Router();
const userRoutes = require("./users-routes");
const thoughtsRoutes = require("./thoughts-routes");

router.use("/users");
router.use("/thoughts");

module.exports = router;
