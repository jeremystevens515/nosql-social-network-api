const { User, Thought, Reaction } = require("../models");

const getAllThoughts = (req, res) => {
	Thought.find({})
		.then((thoughts) => {
			if (!thoughts) {
				res.status(404).json({ message: "No thoughts found" });
			} else {
				res.status(200).json(thoughts);
			}
		})
		.catch((err) => res.status(500).json(err));
};

const getThoughtById = (req, res) => {
	Thought.findOne({ _id: req.params.thoughtId })
		.select("-__v")
		.then((thought) => {
			if (!thought) {
				res.status(404).json({ message: "Thought by that ID not found" });
			} else {
				res.status(200).json(thought);
			}
		})
		.catch((err) => res.status(500).json(err));
};

const createNewThought = (req, res) => {
	Thought.create(req.body)
		.then((thought) => {
			//this works without return statement because CB function was passed
			User.findOneAndUpdate(
				{ username: req.body.username },
				{ $addToSet: { thoughts: thought._id } },
				{ runValidators: true, new: true },
				(err, results) =>
					err ? console.error(err) : console.log("Thought added to user.")
			);
			res.status(200).json(thought);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json(err);
		});
};

const updateThoughtById = (req, res) => {
	Thought.findOneAndUpdate(
		{ _id: req.params.thoughtId },
		{ $set: req.body },
		{ runValidators: true, new: true }
	)
		.then((thought) => {
			if (!thought) {
				res.status(404).json({ message: "No thought found with that ID" });
			} else {
				res.status(200).json(thought);
			}
		})
		.catch((err) => res.status(500).json(err));
};

const deleteThought = (req, res) => {
	Thought.findOneAndDelete({ _id: req.params.thoughtId })
		.then((thought) => {
			// console.log("delete thought:", thought);
			if (!thought) {
				res.status(404).json({ message: "No thought with that ID found" });
			} else {
				return User.findOneAndUpdate(
					{ username: thought.username },
					{ $pull: { thoughts: req.params.thoughtId } },
					{ new: true }
				);
			}
		})
		.then((updateThought) => {
			// console.log("user thoughts update:", updateThought);
			res.status(200).json({ message: "Thought deleted and user updated" });
		})
		.catch((err) => res.status(500).json(err));
};

const createReaction = (req, res) => {
	Thought.findOneAndUpdate(
		{ _id: req.params.thoughtId },
		{ $addToSet: { reactions: req.body } },
		{ runValidators: true, new: true }
	)
		.then((thought) =>
			!thought
				? res.status(404).json({ message: "No thought with that Id" })
				: res.status(200).json(thought)
		)
		.catch((err) => res.status(500).json(err));
};

const deleteReaction = (req, res) => {
	Thought.findOneAndUpdate(
		{ _id: req.params.thoughtId },
		{ $pull: { reactions: req.body } },
		{ runValidators: true, new: true }
	)
		.then((thought) =>
			!thought
				? res.status(404).json({ message: "No thought with that Id" })
				: res.status(200).json(thought)
		)
		.catch((err) => res.status(500).json(err));
};

module.exports = {
	getAllThoughts,
	getThoughtById,
	createNewThought,
	updateThoughtById,
	deleteThought,
	createReaction,
	deleteReaction,
};
