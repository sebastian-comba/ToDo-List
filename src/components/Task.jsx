import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

function Task(props) {
  return (
    <div className="task">
      <p className="task-text">
        {props.name}
        <IconButton>
          <EditIcon onClick={() => props.onEdit({name: "test"})} />
        </IconButton>
        <IconButton
          onClick={() => props.onDelete(props.name)}
          aria-label="delete"
        >
          <ClearIcon />
        </IconButton>
      </p>
    </div>
  );
}

export default Task;
