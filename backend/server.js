import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import { getSecret } from "./secrets";
import Comment from "./models/comment";

const app = express();
const router = express.Router();

// set port to either a predetermined number or 3001
const API_PORT = process.env.API_PORT || 3001;

// db config -- set your URI form mLab in secrets.js
mongoose.connect(getSecret("dbUri"));
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// configure API to use bodyParser and look for JSON data in the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// set the route path & initialize the API
router.get("/", (req, res) => {
	res.json({ message: "Hello, World!" });
});

router.get("/comments", (req, res) => {
	Comment.find((err, comments) => {
		if (err) {
			return res.json({
				success: false,
				error: err
			});
		}
		return res.json({
			success: true,
			data: comments
		});
	});
});

router.post("/comments", (req, res) => {
	const comment = new Comment();
	// body parser allows the use of the req.body
	const { author, text } = req.body;
	if (!author || !text) {
		// throw an error. this will be checked on the front end
		return res.json({
			success: false,
			error: "You must provide an author and comment"
		});
	}
	comment.author = author;
	comment.text = text;
	comment.save(err => {
		if (err) {
			return res.json({
				success: false,
				error: err
			});
		}
		return res.json({
			success: true
		});
	});
});

// use router configuration when the API is called
app.use("/api", router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
