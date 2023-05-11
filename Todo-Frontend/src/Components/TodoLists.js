import React from "react";
import TodoItems from "./TodoItems";

const TodoLists = ({ todoLists }) => {
  return (
    <>
      {todoLists
        .sort((a, b) => {
          if (a.priority === "High") {
            return -1;
          } else if (a.priority === "Medium" && b.priority === "Low") {
            return -1;
          } else {
            return 1;
          }
        })
         .map((item, index) => (
          <TodoItems item={item} key={index} />
        ))}
    </>
  );
};

export default TodoLists;
