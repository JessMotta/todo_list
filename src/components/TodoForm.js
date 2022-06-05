import React, {useState} from "react";

export default function TodoForm(props) {
  const [text, setText] = useState("");

  function handleChange(event) {
    let t = event.target.value;
    setText(t);
  }
  function addItem(event) {
    event.preventDefault();
    if (text) {
      // setItems([...items, text]);
      props.onAddItem(text)
      setText("");
    }
  }
  return (
    <form>
      <input className="activityInput" onChange={handleChange} type="text" value={text}></input>
      <button className="activityButton" onClick={addItem}>Adicionar</button>

      
    </form>
  );
}
