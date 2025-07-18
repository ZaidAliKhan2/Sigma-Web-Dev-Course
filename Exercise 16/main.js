import express from "express";
import mongoose from "mongoose";
import { User } from "./mongodbFiles/employeeDB.js";
const app = express()
const port = 3000

app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

let conn = mongoose.connect("mongodb://127.0.0.1:27017/company");


app.get('/', (req, res) => {
  res.render("express")
})

app.post('/save-data', async (req, res) => {
  const clientData = req.body;

  try {
    const currentCount = await User.countDocuments();

    if (currentCount >= 10) {
      await User.deleteMany(); // Clear all documents
      console.log("Collection cleared");
    }

    // Save new documents
    for (const element of clientData) {
      const userData = new User({
        name: element.name,
        salary: element.salary,
        language: element.language,
        city: element.city,
        isManager: element.isManager
      });
      await userData.save();
      console.log("User saved:", userData.name);
    }

    res.status(200).send("Data received and saved");
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Failed to process data");
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})