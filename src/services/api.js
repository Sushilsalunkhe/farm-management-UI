const BASE_URL = "http://localhost:8080/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

/* ================= PRODUCTS ================= */

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`, {
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error("Unauthorized or session expired");
  }

  return response.json();
};

export const addProduct = async (product) => {
  const response = await fetch("http://localhost:8080/api/products", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(product)
  });
  return response.json();
};

export const deleteProduct = async (id) => {
  await fetch(`http://localhost:8080/api/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
};

/* ================= EMPLOYEES ================= */

export const getEmployees = async () => {
  const response = await fetch(`${BASE_URL}/employees`, {
    headers: getAuthHeaders()
  });

  return response.json();
};

export const addEmployee = async (employee) => {
  const response = await fetch("http://localhost:8080/api/employees", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(employee)
  });
  return response.json();
};

export const deleteEmployee = async (id) => {
  await fetch(`http://localhost:8080/api/employees/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
};

/* ================= ORDERS ================= */

export const placeOrder = async (order) => {
  const response = await fetch("http://localhost:8080/api/orders", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(order)
  });

  return response.json();
};
