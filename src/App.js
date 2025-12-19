import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AdminProducts from "./pages/AdminProducts";

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* ADMIN Routes */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
