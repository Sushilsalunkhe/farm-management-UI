import { Link } from "react-router-dom";
import { getRole, logout } from "../utils/auth";

function Header() {
  const role = getRole();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/products">Products</Link> |{" "}

      {role === "USER" && (
        <>
          <Link to="/cart">Cart</Link> |{" "}
          <Link to="/checkout">Checkout</Link> |{" "}
          <Link to="/orders">My Orders</Link> |{" "}
        </>
      )}

      {role === "ADMIN" && (
        <>
          <Link to="/employees">Employees</Link> |{" "}
          <Link to="/admin/products">Manage Products</Link> |{" "}
        </>
      )}

      {!role && (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </>
      )}

      {role && (
        <>
          | <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Header;
