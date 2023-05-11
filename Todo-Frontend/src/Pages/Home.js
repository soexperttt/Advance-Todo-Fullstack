import React, { useEffect, useState } from "react";
import TodoLists from "../Components/TodoLists";
import { motion } from "framer-motion";
import Nav from "../Components/Nav";
import { errorToast, successToast } from "../Components/Toast";
import {
  Button,
  RadioGroup,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const Home = () => {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [todoLists, setTodoLists] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const toast = useToast();
  const [characterLimit] = useState(30);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      const request = await fetch("/api/v1/todo");
      const data = await request.json();
      if (request.status === 200) {
        setTodoLists(data);
        setTodo(data);
      }
    };

    fetchTodo();
  }, [refreshKey]);

  const post = async () => {
    setBtnLoading(true);
    if (!title || !priority) {
      toast(errorToast("Please fill in all fields"));
      setBtnLoading(false);

      return;
    }
    const bodyValue = JSON.stringify({
      title,
      priority,
    });
    const request = await fetch("/api/v1/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyValue,
    });
    if (request.status === 201) {
      setBtnLoading(false);
      toast(successToast("Added successfully"));
      setTitle("");
      setPriority("");
      setRefreshKey(refreshKey + 1);
    }

    setBtnLoading(false);
  };
  const counting = (e) => {
    if (e.target.value.length > characterLimit) {
      return;
    }
    setTitle(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="Home_Comp">
        <Nav />
        {todo.length >= 10 ? (
          <p className="limit">
            Reached limit, Max Todo is 10 <br /> To add more please delete some
            Todo
          </p>
        ) : (
          <>
            <div className="todoPost">
              <InputGroup className="postInputs">
                <input
                  value={title}
                  className="todo-title login"
                  placeholder="Todo something..."
                  type="text"
                  onChange={counting}
                />

                <InputRightElement>
                  {title.length <= 0 ? (
                    <p className="counting"></p>
                  ) : (
                    <>
                      {title.length === characterLimit ? (
                        <p className="counting" style={{ color: "red" }}>
                          MAX
                        </p>
                      ) : (
                        <p className="counting">{`${title.length}/${characterLimit}`}</p>
                      )}
                    </>
                  )}
                </InputRightElement>
              </InputGroup>

              {title.length > 0 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <span className="limit">How important?</span>

                    <div className="RadioGroup-form">
                      {["Low", "Medium", "High"].map((value) => (
                        <RadioGroup
                          onClick={() => setPriority(value)}
                          value={value}
                          className="hover-underline-animation"
                        >
                          {priority === value ? (
                            <Button className="btn selected">{value}</Button>
                          ) : (
                            <Button className="btn unSelected">{value}</Button>
                          )}
                        </RadioGroup>
                      ))}
                    </div>
                    <>
                      {btnLoading ? (
                        <Button
                          className="main-btn add"
                          onClick={() => {
                            post(title, priority);
                          }}
                          isLoading
                        ></Button>
                      ) : (
                        <Button
                          className="main-btn add"
                          onClick={() => {
                            post(title, priority);
                          }}
                        >
                          Add Todo
                        </Button>
                      )}
                    </>
                  </motion.div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}

        <>
          {todo.length === 0 ? (
            <div className="noTodo">
              <p className="noData">No data to display, please add todo</p>
            </div>
          ) : (
            <>
              <div className="todoList">
                <table className="tableContent">
                  <tr>
                    <div className="tableContent head">
                      <th>Todo</th>
                      <th>Priority</th>
                    </div>
                    <hr className="hl-top" />
                  </tr>
                  <p className="myText">Select Todo to update or delete</p>
                  <TodoLists todoLists={todoLists} />
                </table>
              </div>
            </>
          )}
        </>
      </div>
    </motion.div>
  );
};

export default Home;
