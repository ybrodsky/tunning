import Tunning from "./Tunning";
import order from "./order.json";

export default function App() {
  return (
    <div className="App">
      <Tunning order={order} />
    </div>
  );
}
