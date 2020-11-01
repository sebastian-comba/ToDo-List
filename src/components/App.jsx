import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import Task from "./Task";
import Input from "./Input";
import { get } from "mongoose";
import Counter from "./Counter";
import { IconButton } from "@material-ui/core";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        url: "http://localhost:2000/api/tasks",
        method: get,
      });

      setTasks(result.data);
    };

    fetchData();
  }, []);

  const addTask = (task) => {
    if (task.name) {
      axios
        .post("http://localhost:2000/api/tasks", task)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      setTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  const deleteTask = (id, name) => {
    axios
      .delete("http://localhost:2000/api/task/" + name)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    setTasks((prevTasks) => prevTasks.filter((task, index) => index !== id));
    console.log("deleted " + name);
  };

  const deleteAll = () => {
    axios
      .delete("http://localhost:2000/api/tasks")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));;
    setTasks([]);
    console.log("deleted ALL");
  };

  // const updateTask = () => {
  //   axios.put();
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
