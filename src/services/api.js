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

/* ================= EMPLOYEES ================= */

export const getEmployees = async () => {
  const response = await fetch(`${BASE_URL}/employees`, {
    headers: getAuthHeaders()
  });

  return response.json();
};
