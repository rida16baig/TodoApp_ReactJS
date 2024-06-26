import { useState, useEffect, useRef } from "react";
import "./App.css";
import "./output.css";
import editImage from "../src/assets/images/edit.svg";
import deleteImage from "../src/assets/images/delete.svg";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [editIndex, setEditIndex] = useState(null);
  const [editTodos, setEditTodos] = useState("");
  const editWindowRef = useRef(null);
  const [completedTodos, setCompletedTodos] = useState(
    JSON.parse(localStorage.getItem("completedTodos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoInput = e.target.input;
    const todoInputValue = todoInput.value.trim();
    if (todoInputValue) {
      setTodos([...todos, todoInputValue]);
      todoInput.value = "";
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
  const handleComplete = (index, event) => {
    const completedTodo = todos[index];
    if (event.target.checked) {
      setCompletedTodos([...completedTodos, completedTodo]);
    } else {
      const updatedCompletedTodos = completedTodos.filter(
        (_, i) => i !== index
      );
      setCompletedTodos(updatedCompletedTodos);
    }
  };
  const deleteTodo = (index) => {
    if (window.confirm("Do you want to delete it?")) {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);

      // Delete the corresponding completed todo if it exists
      const completedTodo = todos[index];
      const updatedCompletedTodos = completedTodos.filter(
        (todo) => todo !== completedTodo
      );
      setCompletedTodos(updatedCompletedTodos);
    }
  };

  const closeEditBox = () => {
    editWindowRef.current.style.display = "none";
    setEditIndex(null);
    setEditTodos("");
  };

  return (
    <>
      <main className="mx-10 flex flex-col justify-center items-center gap-3 min-h-[100vh] h-[100%] box-border ">
        <section
          id="completedTodos"
          className="flex text-3xl justify-between items-center w-[250px] p-5  sm:w-[400px] border-2 rounded-lg"
        >
          <h2>Task Completed</h2>
          <div className="bg-sky-800 text-white p-10 rounded-[50%]">
            {completedTodos.length}/{todos.length}
          </div>
        </section>
        <section className="bg-sky-800 p-3 py-16 rounded-lg backdrop-blur-lg relative w-[250px] sm:w-[400px]">
          <h1 className="text-center text-4xl font-bold text-white">
            Todo App
          </h1>
          <form onSubmit={handleSubmit} className="w-[100%] mt-8 text-2xl">
            <div className="todo_list flex gap-3">
              <input
                type="text"
                placeholder="Write your task here..."
                name="input"
                className="bg-gray-300 p-3 rounded-md w-full focus:ring-2 placeholder:text-gray-600 ring-gray-300 border-none outline-none"
              />
              <input
                type="submit"
                value="+"
                className="bg-gray-300 p-3 text-4xl  rounded-md active:ring-2 ring-gray-300 ring-offset-2"
              />
            </div>
          </form>
          <div className="todosContainer text-2xl">
            <ul>
              {todos.map((todo, index) => (
                <li
                  key={index}
                  id="todo_item"
                  className={`bg-blue-300 p-3 w-[100%] my-3 rounded-md flex justify-between ${
                    completedTodos.includes(todos[index]) ? "completed" : ""
                  } `}
                >
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    checked={completedTodos.includes(todos[index])}
                    onChange={(event) => handleComplete(index, event)}
                  />
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
            className="bg-sky-800 w-[100%] p-3 h-[100%] opacity-[96%] shadow-lg shadow-current absolute top-0 left-0 rounded-md flex-col items-center justify-center"
            id="editWindow"
            ref={editWindowRef}
            style={{ display: "none" }}
          >
            <h1 className="text-3xl text-center my-3 font-bold text-white">
              Edit
            </h1>
            <form
              onSubmit={handleUpdate}
              className="flex flex-col items-center justify-center"
            >
              <input
                type="text"
                id="editedTodo"
                onChange={handleEditChange}
                value={editTodos}
                className="bg-gray-300 p-3 my-3 rounded-md w-[100%] focus:ring-2 text-xl ring-gray-300 border-none outline-none"
              />
              <input
                type="submit"
                id="updateButton"
                className="rounded-md bg-sky-500 text-white p-2 px-5 text-xl my-1 focus:ring-2 ring-sky-600 ring-offset-2 hover:bg-sky-500 shadow-sm shadow-sky-400"
                value="Update"
              />
            </form>
            <span
              id="close"
              className="text-2xl absolute top-5 right-5 hover:cursor-pointer text-white"
              title="Close"
              onClick={closeEditBox}
            >
              X
            </span>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
