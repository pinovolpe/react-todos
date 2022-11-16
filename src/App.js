import logo from "./logo.png";
import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(null);
  const [show, setShow] = useState(false);

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.floor(100000 + Math.random() * 900000),
      todo: todo,
    };
    setList([...list, newTodo]);
  };

  const deleteTodo = (id) => {
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  };

  const editTodo = (id) => {
    setEdit(id);
  };

  const onEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get("input").trim();
    const id = Number(e.target.id);
    if (!value) {
      alert("Please enter a value");
      return;
    }
    if (id) {
      setList((prev) => [
        ...prev.map((p) => {
          if (p.id === id) {
            return { ...p, todo: value };
          } else return p;
        }),
      ]);
      setEdit(null);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get("input").trim();
    if (!value) {
      alert("Please enter a value");
      return;
    }
    addTodo(value);
    e.target.reset();
  };

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ToDo List</h1>
      </header>
      <main className="App-main">
        <form onSubmit={onSubmit}>
          <input autoFocus type="text" name="input" />
          <button type="submit">Add</button>
        </form>
        <ul className="App-list">
          {list.map((todo) => (
            <li
              key={todo.id}
              className={edit === todo.id ? "App-editing" : "App-element"}
            >
              {edit === todo.id ? (
                <form id={todo.id} onSubmit={onEdit}>
                  <input
                    autoFocus
                    // onFocus={(e) => e.currentTarget.select()}
                    type="text"
                    name="input"
                    defaultValue={todo.todo}
                  />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <div className="App-todo">{todo.todo}</div>
              )}
              <div className={edit === todo.id ? "App-hide" : "App-controls"}>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button onClick={() => editTodo(todo.id)}>Edit</button>
                <button onClick={() => addTodo(todo.todo)}>Duplicate</button>
              </div>
            </li>
          ))}
        </ul>
        <button style={{ background: "#8ba6a9" }} onClick={toggleShow}>
          Toggle Target / Current Target
        </button>
        {show && (
          <div>
            <dl
              style={{
                background: "red",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                position: "relative",
              }}
              onClick={(e) => {
                console.log(
                  "TARGET:",
                  e.target,
                  "CURRENT-TARGET:",
                  e.currentTarget
                );
              }}
            >
              <dt
                style={{
                  background: "white",
                  borderRadius: "50%",
                  width: "70px",
                  height: "70px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></dt>
              <dd
                style={{
                  background: "green",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  transform: "translate(-25%, -50%)",
                }}
              ></dd>
            </dl>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
