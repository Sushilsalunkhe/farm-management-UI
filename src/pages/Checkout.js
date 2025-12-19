import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { placeOrder } from "../services/api";

function Checkout() {
  const { cart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, p) => sum + p.price * p.qty, 0
  );

  const checkout = async () => {
    const order = {
      totalAmount: total,
      items: cart.map(p => ({
        productId: p.id,
        productName: p.name,
        price: p.price,
        quantity: p.qty
      }))
    };

    await placeOrder(order);
    alert("Order placed successfully");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: ₹{total}</p>
      <button onClick={checkout}>Place Order</button>
    </div>
  );
}

export default Checkout;
