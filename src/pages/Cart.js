import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <div key={item.id}>
          {item.name} × {item.qty}
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
