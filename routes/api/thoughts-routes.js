const router = require("express").Router();
const {
	getAllThoughts,
	getThoughtById,
	createNewThought,
	updateThoughtById,
	deleteThought,
	createReaction,
	deleteReaction,
} = require("../../controllers/thoughts-controller");

// /api/thoughts
router.route("/").get(getAllThoughts).post(createNewThought);

// /api/thoughts/:thoughtId
router
	.route("/:thoughtId")
	.get(getThoughtById)
	.put(updateThoughtById)
	.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
	.route("/:thoughtId/reactions")
	.post(createReaction);
	
// /api/thoughts/reactions/:reactionId
router
	.route("/reactions/:reactionId")
	.delete(deleteReaction)
module.exports = router;
