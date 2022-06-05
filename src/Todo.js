import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import List from "./components/List";
import Item from "./components/Item";
import "./Todo.css";
import Modal from "./components/Modal";


const SAVED_ITEMS = "savedItems";

export default function Todo() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS));
    if (savedItems) {
      setItems(savedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));
  }, [items]);

  function onAddItem(text) {
    let item = new Item(text);
    setItems([...items, item]);
  }

  function onItemDeleted(item) {
    let filteredItems = items.filter((it) => it.id !== item.id);
    setItems(filteredItems);
  }

  function onDone(item) {
    let updatedItems = items.map((it) => {
      if (it.id === item.id) {
        it.done = !it.done;
      }
      return it;
    });
    setItems(updatedItems);
  }

  return (
    <div className="container">
      <header className="header">
      <h1>Todo</h1>
      <button className="addButton">+</button>
      </header>
      <TodoForm onAddItem={onAddItem}></TodoForm>
      <List onDone={onDone} onItemDeleted={onItemDeleted} items={items}></List>
      <Modal></Modal>
    </div>
  );
}
