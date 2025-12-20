// src/pages/AdminProducts.js

import { useState } from "react";
import { addProductWithImage } from "../services/api";

function AdminProducts() {

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    description: ""
  });

  const [image, setImage] = useState(null);

  // ✅ THIS IS WHERE YOUR CODE GOES
  const handleAddProduct = async () => {
    try {
      if (!image) {
        alert("Please select an image");
        return;
      }

      const formData = new FormData();

      formData.append(
        "product",
        new Blob([JSON.stringify(product)], {
          type: "application/json"
        })
      );

      formData.append("image", image);

      await addProductWithImage(formData);

      alert("Product added successfully");

      // reset form
      setProduct({
        productName: "",
        category: "",
        price: "",
        quantity: "",
        description: ""
      });
      setImage(null);

    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <h2>Product Management (ADMIN)</h2>

      <input
        placeholder="Name"
        value={product.productName}
        onChange={e =>
          setProduct({ ...product, productName: e.target.value })
        }
      />

      <input
        placeholder="Category"
        value={product.category}
        onChange={e =>
          setProduct({ ...product, category: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={e =>
          setProduct({ ...product, price: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Quantity"
        value={product.quantity}
        onChange={e =>
          setProduct({ ...product, quantity: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        value={product.description}
        onChange={e =>
          setProduct({ ...product, description: e.target.value })
        }
      />

      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
      />

      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default AdminProducts;
