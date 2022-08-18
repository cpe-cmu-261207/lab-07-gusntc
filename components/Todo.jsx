import React, { useState } from "react";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Todo(props) {
  const [showBtn, setshowBtn] = useState(false);

  return (
    <div
      className="border-bottom p-1 py-2 fs-2 d-flex gap-2"
      onMouseOver={() => setshowBtn(true)}
      onMouseOut={() => setshowBtn(false)}
    >
      {/* Todolist */}
      <span
        className="me-auto"
        style={
          props.complete
            ? { textDecoration: "line-through", color: "black" }
            : null
        }
      >
        {props.title}
      </span>
      {/* control hide and show BTN */}
      {showBtn && (
        <>
          {" "}
          <button className="btn btn-success" onClick={() => props.markBtn()}>
            <IconCheck />
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => props.moveupBtn()}
          >
            <IconArrowUp />
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => props.movedownBtn()}
          >
            <IconArrowDown />
          </button>
          <button className="btn btn-danger" onClick={() => props.deleteBtn()}>
            <IconTrash />
          </button>{" "}
        </>
      )}
    </div>
  );
}

{
  /* summary section */
}
{
  /* <p className="text-center fs-4">
  <span className="text-primary">All (2) </span>
  <span className="text-warning">Pending (2) </span>
  <span className="text-success">Completed (0)</span>
</p>; */
}
