import { useEffect, useState } from "react";
import { getProducts, addProduct, deleteProduct } from "../services/api";

function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const load = () => getProducts().then(setProducts);

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    await addProduct({ name, price, category });
    load();
  };

  return (
    <div>
      <h2>Product Management (ADMIN)</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Category" onChange={e => setCategory(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <button onClick={save}>Add</button>

      <hr />

      {products.map(p => (
        <div key={p.id}>
          {p.name} - ₹{p.price}
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ProductAdmin;
