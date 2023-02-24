const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
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
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "user",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

userSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
