import React, { useState, useRef } from "react";

const Todo = (props) => {
  const [todos, setTodos] = useState([
    { id: 1, item: "Fix bugs" },
    { id: 2, item: "Take out the trash" },
  ]);

  const [password, setPassword] = useState("");

  const todoRef = useRef();

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (data) => {
    let id = todos.length + 1;
    setTodos([
      ...todos,
      {
        id,
        item: data,
      },
    ]);
  };

  const handlePasswordChange = (evt) => {
    const passwordValue = evt.target.value.trim();
    setPassword(passwordValue);
  };

  const handleNewTodo = (e) => {
    e.preventDefault();
    const item = todoRef.current;
    addTodo(item.value);
    item.value = "";
  };

  return (
    <div className="container">
      <div className="row">
        <h2>{props.title || "Add Todo"}</h2>
      </div>
      <form>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              autoFocus
              ref={todoRef}
              placeholder="Enter a task"
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <input
              type="password"
              className="my-2"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <div className="col-md-6">
            <input
              type="button"
              className="btn btn-primary"
              onClick={() => false}
              disabled
              value="Submit"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button
              type="submit"
              onClick={handleNewTodo}
              className="btn btn-primary"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
      <div className="row todo-list">
        <div className="col-md-6">
          <h3>Lists</h3>
          {!todos.length ? (
            <div className="no-task">No task!</div>
          ) : (
            <ul>
              {todos.map((todo) => {
                return (
                  <li key={todo.id}>
                    <div>
                      <span>{todo.item}</span>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeTodo(todo.id)}
                      >
                        X
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
