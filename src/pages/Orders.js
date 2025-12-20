import { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);   // always array
  const [error, setError] = useState("");

  useEffect(() => {
    getMyOrders()
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load orders");
        setOrders([]);
      });
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(order => (
        <div
          key={order.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <p><b>Order Id:</b> {order.id}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
