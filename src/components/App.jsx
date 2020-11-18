import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import Task from "./Task";
import Input from "./Input";
import Counter from "./Counter";
import { IconButton } from "@material-ui/core";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:2000/api/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = (task) => {
    if (task.name) {
      axios
        .post("http://localhost:2000/api/tasks", task)
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log("added " + task.name);
      fetchData();
    }
  };

  const deleteTask = (name) => {
    axios
      .delete("http://localhost:2000/api/task/" + name)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    fetchData();
    console.log("deleted " + name);
  };

  const deleteAll = () => {
    axios
      .delete("http://localhost:2000/api/tasks")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    fetchData();
    console.log("deleted ALL");
  };

  // const updateTask = (task) => {
  //   axios
  //     .put("http://localhost:2000/api/tasks/" + task.name)
  //     .then((response) => console.log(response))
  //     .catch((err) => console.log(err));
  //   fetchData();
  //   console.log("updated " + task.name);
  // };

  return (
    <div className="app">
      <Header />
      <Input onAdd={addTask} />
      {tasks.length !== 0 && (
        <div>
          <Counter count={tasks.length} />
          <IconButton onClick={deleteAll} aria-label="delete">
            Delete ALL
          </IconButton>
        </div>
      )}
      {tasks.map((item, index) => (
        <Task
          key={index}
          index={index}
          name={item.name}
          onDelete={deleteTask}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
