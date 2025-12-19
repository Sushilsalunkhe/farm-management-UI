import { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(o => (
        <div key={o.id}>
          <b>Order #{o.id}</b> – ₹{o.totalAmount}
        </div>
      ))}
    </div>
  );
}

export default Orders;
