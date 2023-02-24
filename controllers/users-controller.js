const { User, Thought, Reaction } = require("../models");

const getAllUsers = () => {
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

const getUserById = () => {
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
