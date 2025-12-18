import { Link } from "react-router-dom";
import { getRole } from "../utils/auth";

function Header() {
  const role = getRole();

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/products">Products</Link> |{" "}

      {role === "USER" && (
        <>
          <Link to="/cart">Cart</Link> |{" "}
        </>
      )}

      {role === "ADMIN" && (
        <>
          <Link to="/employees">Employees</Link> |{" "}
        </>
      )}
      {role === "ADMIN" && <Link to="/admin/products">Manage Products</Link>}

      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Header;
