const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const mongodb = `mongodb+srv://douzo_se:${process.env.MG_PASSWORD}@se.iqrfat1.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "authentication";

mongoose.connect(mongodb);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
});

// Define Mongoose Model Defined Event
const eventSchema = new mongoose.Schema({
  eventId: Number,
  date: Date,
  location: String,
  description: String,
  title: String,
  image: String,
  area_size: String,
  rent_by: String,
});

const BM_userModel = mongoose.model("authentication", userSchema);
const eventModel = mongoose.model("event", eventSchema);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/api/users/register", async (req, res) => {
  const { email, name, password } = req.body;
  // check if email exists it's will not accept
  const emailExist = await BM_userModel.findOne({ email: email });
  if (emailExist)
    return res.json({ success: false, message: "Email already exists" });
  const user = new BM_userModel({ email, name, password });
  user
    .save()
    .then(() => {
      console.log("user created");
      return res.status(200).json({ success: true });
    })
    .catch((err) => console.log(err));
});

app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await BM_userModel.findOne({
      email: email,
      password: password,
    }).exec();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging in. Please try again later.",
    });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const BM_users = await BM_userModel.find({}).exec();
    return res.status(200).json({ success: true, users: BM_users });
  } catch (err) {
    return res.json({ success: false, err });
  }
});

// get all events
app.get("/api/events", async (req, res) => {
  try {
    const events = await eventModel.find({}).exec();
    return res.status(200).json({ success: true, events });
  } catch (err) {
    return res.json({ success: false, err });
  }
});

app.post("/api/events/create", async (req, res) => {
  try {
    const latestEvent = await eventModel.findOne(
      {},
      {},
      { sort: { eventId: -1 } }
    );

    let newEventId;
    if (latestEvent) {
      newEventId = parseInt(latestEvent.eventId) + 1;
    } else {
      newEventId = 1;
    }

    const { date, location, description, title, image, area_size, rent_by } =
      req.body;
    const event = new eventModel({
      eventId: newEventId,
      date,
      location,
      description,
      title,
      image,
      area_size,
      rent_by,
    });
    // if event exists it's will not accept
    const eventExist = await eventModel.findOne({ title: title });

    if (eventExist) {
      // Event already exists
      return res.json({ success: false, message: "Event already exists" });
    }

    event
      .save()
      .then(() => {
        console.log("event created");
        return res.status(200).json({ success: true });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
});

app.get("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  const event = await eventModel
    .findOne({ eventId: id })
    .exec()
    .then((event) => {
      return res.status(200).json({ success: true, event });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
