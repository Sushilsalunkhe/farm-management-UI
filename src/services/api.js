// src/services/api.js

const BASE_URL = "http://localhost:8080/api";

/* ================= AUTH HEADERS ================= */

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/* ================= SAFE RESPONSE HANDLER ================= */

const handleResponse = async (response) => {

  // 🔐 Unauthorized / Forbidden → logout
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return [];
  }

  // ✅ No content
  if (response.status === 204) {
    return [];
  }

  // ❌ Other API errors
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "API Error");
  }

  // ✅ Parse JSON only if present
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return [];
};

/* ================= PRODUCTS ================= */

/**
 * 🔹 Backend: @GetMapping("/api/products")
 */
export const getAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

// Alias (for existing imports)
export const getProducts = getAllProducts;

/**
 * 🔹 Backend: @PostMapping("/api/products")
 * 🔹 Multipart upload (ADMIN)
 */
export const addProductWithImage = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}` // ❌ do NOT set Content-Type
    },
    body: formData
  });

  return handleResponse(response);
};

/**
 * 🔹 Backend: @DeleteMapping("/api/products/{id}")
 */
export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

/* ================= EMPLOYEES ================= */

export const getEmployees = async () => {
  const response = await fetch(`${BASE_URL}/employees`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

export const addEmployee = async (employee) => {
  const response = await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(employee)
  });
  return handleResponse(response);
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

/* ================= ORDERS ================= */

export const placeOrder = async (order) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(order)
  });
  return handleResponse(response);
};

export const getMyOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders/my`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

/* ================= USERS ================= */

export const registerUser = async (data) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};

export const loginUser = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};
