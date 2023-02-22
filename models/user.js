const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		trim: true,
		unique: true,
		required: [true, "A username must be provided"],
	},
	email: {
		type: String,
		unique: true,
		required: [true, "An email must be provided"],
		match: /^([a-zA-z0-9._]+)(\@)(([a-z]+)(\.)([a-z]))$/,
	},
	thoughts: {
		type: Array,
		ref: "thought",
	},
	friends: {
		type: Array,
		ref: "user",
	},
});

userSchema.virtual("friendCount").get(() => {
	return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
