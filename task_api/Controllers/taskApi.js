const express = require("express");
const database = require("../Database/dbConnect");

const task = express.Router();

/* ================= ADD TASK ================= */
task.post("/addtask", (req, res) => {
  const { name } = req.body;

  const checkTask =
    "SELECT * FROM task WHERE name=? AND deleted_at=0";

  database.query(checkTask, [name], (error, results) => {
    if (error) {
      return res.json({ success: false, message: "DB Error", error });
    }

    if (results.length === 0) {
      const addTask = "INSERT INTO task (name) VALUES (?)";
      database.query(addTask, [name], (error) => {
        if (error) {
          return res.json({ success: false, message: "DB Error", error });
        }
        res.json({ success: true, message: "Data Added Successfully" });
      });
    } else {
      res.json({ success: false, message: "Data Already existed" });
    }
  });
});

/* ================= GET TASK ================= */
task.get("/gettask", (req, res) => {
  const getTask = "SELECT * FROM task WHERE deleted_at=0";
  database.query(getTask, (error, results) => {
    if (error) {
      return res.json({ success: false, message: "DB Error", error });
    }
    res.json({ success: true, results });
  });
});

/* ================= UPDATE TASK (FIXED) ================= */
task.put("/taskupdate/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updateTask =
    "UPDATE task SET name=? WHERE id=? AND deleted_at=0";

  database.query(updateTask, [name, id], (error, results) => {
    if (error) {
      return res.json({ success: false, message: "DB Error", error });
    }

    res.json({
      success: true,
      message: "Data updated Success",
    });
  });
});

/* ================= DELETE TASK ================= */
task.delete("/taskdelete/:vid", (req, res) => {
  const vid = req.params.vid;

  const deleteTask =
    "UPDATE task SET deleted_at=1 WHERE id=?";

  database.query(deleteTask, [vid], (error) => {
    if (error) {
      return res.json({ success: false, message: "Db Error", error });
    }
    res.json({ success: true, message: "Data deleted Successfully" });
  });
});

module.exports = task;