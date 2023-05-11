import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  useToast,
  Select,
  RadioGroup,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";

import { errorToast, successToast } from "./Toast";
import { motion } from "framer-motion";
import { setRef } from "@mui/material";

const TodoItems = ({ item }) => {
  const modal = useDisclosure();
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnLoading2, setBtnLoading2] = useState(false);
  const parm = useParams();
  const [todo, setTodo] = useState([]);
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const pars = useParams();
  const id = pars.id;
  const [refreshKey, setRefreshKey] = useState(0);
  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    const getTodo = async () => {
      const request = await fetch("/api/v1/todo/" + item.id);
      const data = await request.json();
      if (request.status === 200) {
        setTodo(data);
        setTitle(data.title);
        setPriority(data.priority);
      }
    };
    getTodo();
  }, []);

  const updateTodo = async () => {
    setBtnLoading(true);
    const request = await fetch("/api/v1/todo/update/" + item.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        priority,
      }),
    });
    if (request.status === 200) {
      setBtnLoading(false);
      toast(successToast("Updated successfully"));
      modal.onClose();
      refreshPage();
    }
    if (request.status === 400) {
      setBtnLoading(false);
      toast(errorToast("Error"));
    }
    setBtnLoading(false);
  };

  const deleteTodo = async () => {
    setBtnLoading2(true);

    const request = await fetch("/api/v1/todo/" + item.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (request.status === 200) {
      setBtnLoading2(false);
      toast(successToast("Deleted successfully"));
      modal.onClose();
      refreshPage();
    }
    if (request.status === 400) {
      setBtnLoading2(false);
      toast(errorToast("Error"));
    }
    setBtnLoading2(false);
  };

  return (
    <>
      <div className="tableContent content">
        <tr>
          <a onClick={modal.onOpen} to={"/todo/" + item.id}>
            <td className="item">{item.title}</td>
          </a>
          <Modal onClose={modal.onClose} isOpen={modal.isOpen} isCentered>
            <ModalOverlay />
            <ModalContent className="ModalContent">
              <ModalHeader>Update Todo</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <input
                  className="todo-title"
                  placeholder="Todo"
                  value={title || ""}
                  onChange={(e) => setTitle(e.target.value)}
                />

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
              </ModalBody>
              <ModalFooter className="modalFooter-btns">
                {btnLoading2 ? (
                  <Button
                    className="main-btn delete"
                    onClick={deleteTodo}
                    isLoading
                  ></Button>
                ) : (
                  <Button className="main-btn delete" onClick={deleteTodo}>
                    DELETE
                  </Button>
                )}
                {btnLoading ? (
                  <Button
                    className="main-btn save"
                    onClick={updateTodo}
                    isLoading
                  ></Button>
                ) : (
                  <Button className="main-btn update" onClick={updateTodo}>
                    UPDATE
                  </Button>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </tr>
        <tr>
          <div>
            <td>
              {item.priority === "High" ? (
                <p className="priority high">h</p>
              ) : item.priority === "Medium" ? (
                <p className="priority medium">m</p>
              ) : (
                <p className="priority low">l</p>
              )}
            </td>
          </div>
        </tr>
      </div>
    </>
  );
};

export default TodoItems;
