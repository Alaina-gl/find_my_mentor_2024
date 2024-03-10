const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const app = express();


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server started on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });

const UserSchema = mongoose.Schema ({
    name: {first: String, last: String},
    gender: String,
    intro: String,
    expertise: [],
    languages: [],
    date: String,
    timeStart: {hour: Number, min: Number},
    timeEnd: {hour: Number, min: Number},
    meetingLink: String,
    id: Number
});

const UserModel = mongoose.model("mentors", UserSchema);

app.get("/getUsers", async (req, res) => {
    try {
        const result = await UserModel.find();
        res.json(result);
    } catch (err) {
        console.log("Error fetching", err); 
    }
});

app.use(express.json());
app.post("/postUsers", async (req, res) => {
    try {
        console.log(req.body)
        const { name: { first, last }, gender, intro, expertise, languages, date, timeStart: { hour, min }, timeEnd: { hour2, min2 }, meetingLink, id } = req.body;
        const newUser = new UserModel({ name: { first, last }, gender, intro, expertise, languages, date, timeStart: { hour, min }, timeEnd: { hour: hour2, min: min2 }, meetingLink, id });
        await newUser.save();
        res.status(201).json(newUser); 
    } catch (err) {
        console.log("Error creating user", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/deleteUser/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await UserModel.findOneAndDelete({ id: userId }); 
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully", deletedUser });
    } catch (err) {
        console.log("Error deleting user", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


