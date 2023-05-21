"use client";

import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewToDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(newTaskValue);
    try {
      const newTask = await addTodo({
        id: uuidv4(),
        text: newTaskValue,
      });
      console.log("New task added:", newTask);

      setNewTaskValue("");
      setModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary">
        Button
        <AiOutlinePlus />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewToDo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default AddTask;
