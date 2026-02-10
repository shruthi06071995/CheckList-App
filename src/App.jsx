import { useEffect, useState } from 'react';
import './App.css'
import logo from "./assets/tiruchendurlogo.png"

function App() {
  const [input, setInput] = useState("");

  // Load from localStorage
  const [list, setList] = useState(() => {
    const data = localStorage.getItem("todoChecklist");
    return data ? JSON.parse(data) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todoChecklist", JSON.stringify(list));
  }, [list]);

  // 1. ADD ITEM
  const addItem = () => {
    if (!input.trim()) return;

    setList([
      ...list,
      {
        id: Date.now(),
        text: input,
        completed: false
      }
    ]);
    setInput("");
  };

  // 2. CHECK / UNCHECK ITEM
  const toggleItem = (id) => {
    setList(
      list.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // 3. REMOVE ITEM
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="container head" >
        <div className='container' style={{padding: "60px 650px"}}>
          <img style={{ width: "200px" }} src={logo} alt="logo" />
        </div>
        <div className="container mt-5" style={{padding: "60px", textAlign: "center"}} >
          <h3 className="text-center" style={{fontSize: "30px",fontStyle: "unset" }}>
            <b><u>Tiruchendur Trip – Packing Todo List</u></b>
          </h3>

          {/* Input */}
          <div className="input-group mb-3">
            <input style={{padding: "9px 55px", borderRadius: "5px" }}
              className="form-control"
              placeholder="Add item to pack"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button style={{padding: "10px 30px", borderRadius: "5px",}} className="btn btn-success" onClick={addItem}>
              Add
            </button>
          </div>

          {/* Todo List */}
          <ul className="list-group">
            {list.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={item.completed}
                    onChange={() => toggleItem(item.id)}
                  />

                  <span
                    style={{
                      textDecoration: item.completed
                        ? "line-through"
                        : "none"
                    }}
                  >
                    {item.text}
                  </span>
                </div>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
