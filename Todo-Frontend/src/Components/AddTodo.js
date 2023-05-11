import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");

  return (
    <div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        type="text"
      />

      <Input
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        placeholder="Priority"
        type="text"
      />
      <Button
        onClick={() => {
          addTodo(title, priority);
        }}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default AddTodo;
