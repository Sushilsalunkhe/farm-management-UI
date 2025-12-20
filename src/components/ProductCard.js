import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        width: 220,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      {/* Product Image */}
      <img
        src={
          product.imageUrl
            ? `http://localhost:8080${product.imageUrl}`
            : "/no-image.png"
        }
        alt={product.productName}
        style={{
          width: "100%",
          height: 150,        // ✅ fixed height
          objectFit: "cover", // ✅ handles ANY image size
          borderRadius: 6
        }}
      />

      <h3 style={{ margin: "10px 0 5px" }}>{product.productName}</h3>

      <p style={{ color: "#555", margin: 0 }}>{product.category}</p>

      <p style={{ fontWeight: "bold", margin: "5px 0" }}>
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        style={{
          width: "100%",
          padding: "6px 0",
          backgroundColor: "#2e7d32",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
