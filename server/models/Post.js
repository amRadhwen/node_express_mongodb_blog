const { Schema, model } = require("mongoose");


const postSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});
module.exports = model("Post", postSchema);