import React from "react";

const Counter = (props) => {
  return (
    <div>
      {props.count === 1 ? (
        <p>You have {props.count} thing to do</p>
      ) : (
        <p>You have {props.count} things to do</p>
      )}
    </div>
  );
};

export default Counter;
