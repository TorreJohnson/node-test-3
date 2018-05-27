import mongoose from "mongoose";
const schema = mongoose.Schema;

// create new instance of mongoose.schema. the schema takes
// an object that shows the shape of your db entries.
const CommentsSchema = new Schema(
	{
		author: String,
		text: String
	},
	{ timestamps: true }
);

// export the module to use in server.js
export default mongoose.model("Comment", CommentsSchema);
