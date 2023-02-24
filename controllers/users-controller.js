const { User, Thought, Reaction } = require("../models");

const createNewUser = (req, res) => {
	User.create(req.body)
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
};

const getAllUsers = (req, res) => {
	User.find()
		.then((users) => {
			if (!users) {
				res.status(404).json({ message: "No users found" });
			} else {
				res.status(200).json(users);
			}
		})
		.catch((err) => res.status(500).json(err));
};

const getUserById = (req, res) => {
	User.findOne({ _id: req.params.userId })
		.select("-__v")
		.populate("thoughts")
		.populate("friends")
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: "No user with that ID" });
			} else {
				res.status(200).json(user);
			}
		})
		.catch((err) => res.status(500).json(err));
};

const updateUser = (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.params.userId },
		{ $set: req.body },
		{ runValidators: true, new: true }
	)
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: "No user found" });
			} else {
				res.status(200).json(user);
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
};

const deleteUser = (req, res) => {
	User.findOneAndRemove({ _id: req.params.userId })
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: "No user found" });
			} else {
				Thought.deleteMany({ _id: { $in: user.thoughts } });
			}
		})
		.then(() =>
			res
				.status(200)
				.json({ message: "User and associated thoughts successfully deleted" })
		)
		.catch((err) => res.status(500).json(err));
};

const addNewFriend = (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.params.userId },
		{ $addToSet: { friends: req.params.friendId } },
		{ runValidators: true, new: true }
	)
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: "No user found" });
			} else {
				res.status(200).json(user);
			}
		})
		.catch((err) => res.status(500).json(err));
};

const deleteFriend = (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.params.userId },
		{ $pull: { friends: { _id: req.params.friendId } } },
		{ runValidators: true, new: true }
	)
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: "No user found" });
			} else {
				res.status(200).json(user);
			}
		})
		.catch((err) => res.status(500).json(err));
};

module.exports = {
	createNewUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	addNewFriend,
	deleteFriend,
};
