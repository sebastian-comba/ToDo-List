const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 2000;
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/tasksDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  }
});

const Task = mongoose.model("Task", taskSchema);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app
  .route("/api/tasks")

  //get all the tasks
  .get((req, res) => {
    Task.find((err, results) => {
      if (!err) {
        res.setHeader("Content-Type", "application/json");
        res.json(results);
      } else {
        res.send(err);
      }
    });
  })

  //create a new task
  .post((req, res) => {
    var newTask = new Task({
      name: req.body.name
    });
    newTask.save();
    console.log("added");
  })

  // delete ALL the tasks
  .delete((req, res) => {
    Task.deleteMany((err) => {
      if (!err) {
        console.log("Deleted all");
      } else {
        console.log(err);
      }
    });
  });

app
  .route("/api/task/:name")

  //returns the selected task
  .get((req, res) => {
    Task.findOne({ name: req.params.name }, (err, result) => {
      if (!err) {
        res.json(result);
      } else {
        res.send(err);
      }
    });
  })

  //update the selected task
  .put((req, res) => {
    Task.replaceOne(
      { name: req.params.name },
      { name: req.body.name },
      { overwrite: true },
      (err) => {
        if (!err) {
          console.log("updated");
        } else {
          console.log(err);
        }
      }
    );
  })
  
  //delete the selected task
  .delete((req, res) => {
    Task.deleteOne({ name: req.params.name }, (err) => {
      if (!err) {
        console.log("deleted " + req.params.name);
      } else {
        console.log(err);
      }
    });
  });

app.listen(port, () => console.log("Running on port " + port));
