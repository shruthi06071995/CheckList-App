import { useEffect, useState } from "react";

function Lists() {
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
    <div className="container mt-5">
      <h3 className="text-center">
        Tiruchendur Trip – Packing Todo List
      </h3>

      {/* Input */}
      <div className="input-group mb-3">
        <input
          className="form-control"
          placeholder="Add item to pack"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-success" onClick={addItem}>
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
  );

}

export default Lists;