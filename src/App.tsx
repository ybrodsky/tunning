import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Tunning } from "./Tunning";
import { Order } from "./Tunning/types";
import order from "./Tunning/order.json";

function App() {
  return (
    <div className="App">
      <Tunning order={order as Order} />
    </div>
  );
}

export default App;
