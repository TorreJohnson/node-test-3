import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import { getSecret } from "./secrets";

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

// use router configuration when the API is called
app.use("/api", router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
