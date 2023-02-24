const router = require("express").Router();
const {
	createNewUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	addNewFriend,
	deleteFriend,
} = require("../../controllers/users-controller");

// /api/users
router.route("/").get(getAllUsers).post(createNewUser);

// /api/users/:userId
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addNewFriend).put(deleteFriend);

module.exports = router;
