const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const taskLists = require("./Controllers/taskApi");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/task", taskLists);

app.get("/", (req, res) => {
  res.json({
    name: "Teja",
    siteTest: "Working",
  });
});

app.listen(3065, () => {
  console.log("Working at 3065");
});