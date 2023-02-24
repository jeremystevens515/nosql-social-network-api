const router = require("express").Router();
const {} = require("../../controllers/thoughts-controller");

// /api/thoughts
router.route("/");

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions");

module.exports = router;
