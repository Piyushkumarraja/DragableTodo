import React from "react";
import "./TodoCard.scss";
const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function TodoCard({ data, handleDelete }) {
  console.log(data);
  return (
    <div className="todo">
      <div>{data.name}</div>
      <div className="last-item">
        <select name="type">
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={() => handleDelete(data.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TodoCard;
