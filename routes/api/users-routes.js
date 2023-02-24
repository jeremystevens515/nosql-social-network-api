const router = require("express").Router();
const {} = require("../../controllers/users-controller");

// /api/users
router.route("/");

// /api/users/:userId
router.route("/:userId");

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId");

module.exports = router;
