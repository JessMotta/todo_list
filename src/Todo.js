import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import List from "./components/List";
import Item from "./components/Item";
import "./Todo.css";
import Modal from "./components/Modal";

const SAVED_ITEMS = "savedItems";

export default function Todo() {
  const [showModal, setShowModal] = useState(false);

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
    onHideModal();
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

  function onHideModal() {
    setShowModal(false);
  }

  return (
    <div className="container">
      <header className="header">
        <img
          className="imageChecklist"
          alt="imagem de uma menina marcando o checklist"
          src="./assets/checklist.png"
        ></img>
        <div className="checklistInfo">
          <h1>Aqui você conseguirá organizar suas atividades diárias! Vamos lá?!</h1>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="addButton"
          >
            +
          </button>
        </div>
      </header>
      <List onDone={onDone} onItemDeleted={onItemDeleted} items={items}></List>
      <Modal show={showModal} onHideModal={onHideModal}>
        <TodoForm onAddItem={onAddItem}></TodoForm>
      </Modal>
    </div>
  );
}
