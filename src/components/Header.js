import { Link } from "react-router-dom";
import { getRole, logout } from "../utils/auth";
import "./Header.css";

function Header() {
  const role = getRole();

  return (
    <header className="header">
      {/* LEFT SIDE */}
      <div className="header-left">
        <h2 className="brand">🌾 Farm Store</h2>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          {role === "USER" && (
            <>
              <Link to="/cart">Cart</Link>
              <Link to="/checkout">Checkout</Link>
              <Link to="/orders">My Orders</Link>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <Link to="/employees">Employees</Link>
              <Link to="/admin/products">Manage Products</Link>
            </>
          )}

          {!role && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>

      {/* RIGHT SIDE */}
      {role && (
        <div className="header-right">
          <span className="role-badge">{role}</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
