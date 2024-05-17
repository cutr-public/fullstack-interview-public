import React from "react";
import "./App.css";

function formatEuro(n) {
  return `€ ${n.toFixed(2)}`;
}

function useLineItems() {
  const [items, setItems] = React.useState([]);
  const addItem = (item) => {
    item.id = new Date().getTime();
    setItems([...items, item]);
  };
  const removeItem = (item) => {};
  const editItem = (item) => {
    setItems(items.map((i) => (i.id === item.id ? item : i)));
  };

  return {items, addItem, removeItem, editItem};
}

export default function App() {
  const {items, addItem, removeItem, editItem} = useLineItems();

  return (
    <div className="App">
      <header>Cutr</header>
      <div className="content">
        <Form
          items={items}
          addItem={addItem}
          editItem={editItem}
          removeItem={removeItem}
        />
        <Preview />
      </div>
    </div>
  );
}

function Preview(params) {
  const total = 0;

  return (
    <div>
      <hr />
      <div>
        <h3>Total: {formatEuro(total)}</h3>
      </div>
    </div>
  );
}

function Form(params) {
  const { items, addItem, removeItem, editItem } = params;
  const onAddNew = (e) => {
    e.preventDefault();
    addItem({
      label: "new item",
      value: 0,
      quantity: 1,
    });
  };

  return (
    <div className="form">
      {items.map((i) => (
        <div className="item">
          <div>
            <label>Name</label>
            <input
              type="text"
              value={i.label}
              onChange={(e) => {
                i.label = e.target.value;
                editItem(i);
              }}
            />
          </div>
          <div>
            <label>Value</label>
            <input
              type="text"
              value={i.value}
              onChange={(e) => {
                i.value = e.target.value;
                editItem(i);
              }}
            />
          </div>
          <div>
            <label>Quantity</label>
            {i.quantity}
          </div>
        </div>
      ))}
      <button onClick={onAddNew}>Add new</button>
    </div>
  );
}
