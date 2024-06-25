import { useState, useEffect, useRef } from "react";
import "./App.css";
import "./output.css";
import editImage from "../src/assets/images/edit.svg";
import deleteImage from "../src/assets/images/delete.svg";

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [editIndex, setEditIndex] = useState(null);
  const [editTodos, setEditTodos] = useState("");
  const editWindowRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoInput = e.target.input;
    const todoInputValue = todoInput.value.trim();
    if (todoInputValue) {
      setTodos([...todos, todoInputValue]);
      todoInput.value = "";
    }
  };

  const deleteTodo = (index) => {
    if (window.confirm("Do you want to delete it?")) {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    }
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setEditTodos(todos[index]);
    editWindowRef.current.style.display = "flex";
  };

  const handleEditChange = (e) => {
    setEditTodos(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTodos = [...todos];
    if (editTodos.trim()) {
      updatedTodos[editIndex] = editTodos.trim();
      setTodos(updatedTodos);
      closeEditBox();
    }
  };

  const closeEditBox = () => {
    editWindowRef.current.style.display = "none";
    setEditIndex(null);
    setEditTodos("");
  };

  return (
    <>
      <main className="mx-10 flex flex-col justify-center items-center gap-3 min-h-[100vh] h-[100%]">
        <h1 className="text-center text-4xl font-bold">Todo App</h1>
        <form onSubmit={handleSubmit} className="w-[400px] mt-8 text-2xl">
          <div className="todo_list flex gap-3">
            <input
              type="text"
              placeholder="Add Todo..."
              name="input"
              className="bg-gray-300 p-3 rounded-md w-full focus:ring-2 ring-gray-300 border-none outline-none"
            />
            <input
              type="submit"
              value="Add"
              className="bg-gray-300 p-3  rounded-md active:ring-2 ring-gray-300 ring-offset-2"
            />
          </div>
        </form>
        <div className="todosContainer text-2xl">
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                id="todo_item"
                className="bg-blue-300 p-3 min-w-[400px] my-3 rounded-md flex justify-between"
              >
                <span>{todo}</span>
                <div className="flex">
                  <img
                    src={editImage}
                    alt="Edit"
                    className="w-7 hover:cursor-pointer"
                    onClick={() => editTodo(index)}
                  />
                  <img
                    src={deleteImage}
                    alt="Delete"
                    className="w-7 hover:cursor-pointer"
                    onClick={() => deleteTodo(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="bg-gray-300 w-[500px] h-[45vh] opacity-95 absolute rounded-md flex-col items-center justify-center"
          id="editWindow"
          ref={editWindowRef}
          style={{ display: "none" }}
        >
          <h1 className="text-3xl text-center my-3 font-bold">Edit</h1>
          <form
            onSubmit={handleUpdate}
            className="flex flex-col items-center justify-center"
          >
            <input
              type="text"
              id="editedTodo"
              onChange={handleEditChange}
              value={editTodos}
              className="bg-blue-300 p-3 my-3 rounded-md w-[300px] focus:ring-2 ring-gray-300 border-none outline-none"
            />
            <input
              type="submit"
              id="updateButton"
              className="rounded-md bg-blue-500 text-white p-2 px-5 text-lg my-1 focus:ring-2 ring-blue-600 ring-offset-2 hover:bg-blue-600"
              value="Update"
            />
          </form>
          <span
            id="close"
            className="text-2xl absolute top-5 right-5 hover:cursor-pointer"
            title="Close"
            onClick={closeEditBox}
          >
            X
          </span>
        </div>
      </main>
    </>
  );
}

export default App;
