import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/products">Products</Link> |{" "}
      <Link to="/cart">Cart</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Header;
