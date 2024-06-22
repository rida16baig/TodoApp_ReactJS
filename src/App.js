import { useState } from "react";
import "./App.css";
import "./output.css";

function App() {
  const [todos, setTodos] = useState([]);
  let handleSubmit = (e) => {
    e.preventDefault();
    let todoInput = e.target.input;
    let todoInputValue = e.target.input.value;
    setTodos([...todos, todoInputValue]);
    todoInput.value = "";
    console.log(todos);
  };

  return (
    <>
      <main className="m-10 flex flex-col justify-center items-center gap-3 max-h-[100vh] h-[100vh] ">
        <h1 className="text-center text-4xl font-bold">Todo App</h1>
        <form onSubmit={handleSubmit} className="w-[400px] mt-8 text-2xl" >
          <div className="todo_list flex gap-3">
            <input
              type="text"
              placeholder="Add Todo..."
              name="input"
              className="bg-gray-200 p-3 rounded-md w-full focus:ring-2 ring-gray-300 border-none outline-none"
            />
            <input
              type="submit"
              value="Add"
              className="bg-gray-200 p-3  rounded-md active:ring-2 ring-gray-300 ring-offset-2"
            />
          </div>
        </form>
        <div className="todosConatiner text-2xl">
          <ul>
            {todos.map((todo, index) => (
              <li key={index} className="bg-blue-300 p-3 min-w-[400px] my-3 rounded-md " >{todo}</li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
