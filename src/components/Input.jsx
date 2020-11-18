import React, { useState } from "react";
import { TextField } from "@material-ui/core";

function Input(props) {
  const [task, setTask] = useState({
    name: "",
  });

  function submitTask(event) {
    props.onAdd(task);
    setTask({
      name: "",
    });
    event.preventDefault();
  }

  function handleChange(event) {
    const value = event.target.value;
    setTask((prevValue) => ({
      ...prevValue,
      name: value,
    }));
  }

  return (
    <div className="input">
      <form onSubmit={submitTask}>
        <TextField
          onChange={handleChange}
          value={task.name}
          id="standard-basic"
          label="What needs to be done?"
        />
      </form>
    </div>
  );
}

export default Input;
