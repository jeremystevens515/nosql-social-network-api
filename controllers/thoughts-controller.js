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
	Thought.create({ thoughtText: req.body.thoughtText }, { new: true })
		.then((thought) => {
			User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $addToSet: { thoughts: thought } },
				{ runValidators: true, new: true },
				(err, results) => (err ? res.json(err) : res.json(results))
			);
		})
		.then(() =>
			res
				.status(200)
				.json({ message: "Thought created and added to user model" })
		)
		.catch((err) => res.status(500).json(err));
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
	Thought.findOneAndRemove({ _id: req.params.thoughtId })
		.then((thought) => {
			if (!thought) {
				res.status(404).json({ message: "No thought with that ID found" });
			} else {
				User.findOneAndUpdate(
					{ _id: req.body },
					{ $pull: { thoughts: req.params.thoughtId } },
					{ new: true }
				);
				res.status(200).json({ message: "Thought deleted and user updated" });
			}
		})
		.catch((err) => res.status(500).json(err));
};

const createReaction = (req, res) => {};

const deleteReaction = (req, res) => {};

module.exports = {
	getAllThoughts,
	getThoughtById,
	createNewThought,
	updateThoughtById,
	deleteThought,
	createReaction,
	deleteReaction,
};
