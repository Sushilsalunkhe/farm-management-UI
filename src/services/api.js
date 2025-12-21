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

  if (response.status === 401 || response.status === 403) {
    localStorage.clear();
    window.location.href = "/login";
    return [];
  }

  if (response.status === 204) {
    return [];
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "API Error");
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return [];
};

/* ================= AUTH ================= */

/**
 * 🔹 REGISTER
 * Backend: POST /api/users/register
 * Should return: { token, username, role }
 */
export const registerUser = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const authData = await handleResponse(response);

  // ✅ Auto-login after register
  if (authData?.token) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("username", authData.username);
    localStorage.setItem("role", authData.role);
  }

  return authData;
};

/**
 * 🔹 LOGIN
 * Backend: POST /api/auth/login
 */
export const loginUser = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const authData = await handleResponse(response);

  if (authData?.token) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("username", authData.username);
    localStorage.setItem("role", authData.role);
  }

  return authData;
};

/* ================= PRODUCTS ================= */

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

export const addProductWithImage = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  return handleResponse(response);
};

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
