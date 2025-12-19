import axios from "axios";   // ✅ ADD THIS LINE

const BASE_URL = "http://localhost:8080/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }
  return response.json();
};

/* ================= PRODUCTS ================= */

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

export const addProduct = async (product) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(product)
  });
  return handleResponse(response);
};

export const deleteProduct = async (id) => {
  await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
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
  await fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
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
  const response = await fetch(`${BASE_URL}/orders`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

/* ================= USERS ================= */

export const registerUser = (data) => {
  return axios.post(`${BASE_URL}/users/register`, data);
};

export const loginUser = (data) => {
  return axios.post(`${BASE_URL}/auth/login`, data);
};
