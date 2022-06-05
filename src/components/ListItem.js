import React from "react";
import Card from "./Card";

export default function ListItem(props) {
  function DoneImg(props) {
    if (props.done) {
      return <img alt="feito" src="./assets/on.png"></img>;
    } else {
      return <img alt="pendente" src="./assets/off.png"></img>;
    }
  }

  return (
         <li>
          <Card className={props.item.done ? "done item" : "item"}>
            {props.item.text}
            <div>
              <button className="cardButton"  
                onClick={() => {
                  props.onDone(props.item);
                }}
              >
                <DoneImg done={props.item.done}></DoneImg>
              </button>
              <button className="cardButton"
                onClick={() => {
                  props.onItemDeleted(props.item);
                }}
              >
                <img alt="deletar item" src="./assets/bin.png"></img>
              </button>
            </div>
          </Card>
        </li>

  );
}
