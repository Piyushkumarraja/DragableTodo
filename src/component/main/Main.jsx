import React, { useState } from "react";
import "./Main.scss";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";
import TodoCard from "../todoCard/TodoCard";

const options = [
  { id: "1", name: "Grocery" },
  { id: "2", name: "Goods" },
  { id: "3", name: "Hardware" },
];

const SortableItem = SortableElement(({ item, index, handleDelete }) => (
  <TodoCard data={item} handleDelete={handleDelete} />
));

const SortableList = SortableContainer(({ items, handleDelete }) => (
  <div className="todo-list">
    {items.map((item, index) => (
      <SortableItem
        key={`item-${item.id}`}
        index={index}
        item={item}
        handleDelete={handleDelete}
      />
    ))}
  </div>
));

function Main() {
  const [currentTodo, setCurrentTodo] = useState({
    name: "",
    type: options[0].name,
    id: "",
  });
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentTodo({
      ...currentTodo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTodo.name && currentTodo.type) {
      const newTodo = {
        ...currentTodo,
        id: Date.now() + Math.random().toString(36).substring(7),
        quantity: 1,
      };
      setTodos([...todos, newTodo]);
      setCurrentTodo({ name: "", type: options[0].name, id: "" });
    }
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setTodos(arrayMove(todos, oldIndex, newIndex));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="main-cont">
      <h3>My Shopping List</h3>
      <div className="body">
        <form className="form" onSubmit={handleSubmit}>
          <div className="header">
            <div className="header-item">
              <label htmlFor="name">List Name</label>
              <input
                type="text"
                name="name"
                value={currentTodo.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="header-item">
              <label htmlFor="type">List Type</label>
              <select
                name="type"
                value={currentTodo.type}
                onChange={handleChange}
              >
                {options.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="button primary">
            + Add An Item
          </button>
        </form>
        <div className="todo-header">
          <div>Item Name</div>
          <div>Quantity</div>
        </div>
        <div className="todo-cont">
          {todos.length > 0 ? (
            <SortableList
              items={todos}
              onSortEnd={onSortEnd}
              handleDelete={handleDelete}
            />
          ) : (
            <div className="no-item">No Items</div>
          )}
        </div>
      </div>
      <div className="footer">
        <button className="button secondary" onClick={() => setTodos([])}>Cancle</button>
        <button
          className="button primary"
          onClick={() => alert("Shopping List Saved!")}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Main;
