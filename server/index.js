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
    id: Number,
    name: String,
    price: Number,
    category: String,
    image: String
});

const UpsetSchema = mongoose.Schema ({
    name: String,
    age: Number
})

const UserModel = mongoose.model("product", UserSchema);

app.get("/getUsers", async (req, res) => {
    console.log(await mongoose.connection.db.listCollections().toArray)
    // UserModel.find({})
    //     .then(function(users) {
    //         console.log("Found users:", users); // Log the users found in the database
    //         // res.json(users);
    //         res.json({mssg: "hello"})
    //     })
    //     .catch(function(err) {
    //         console.log("Error fetching users:", err);
    //         res.status(500).send('Internal Server Error'); // Send a 500 status code in case of error
    //     });
    try {
        const result = await UserModel.find();
        res.json(result);
    } catch (err) {
        console.log("Error fetching", err);
    }
});
