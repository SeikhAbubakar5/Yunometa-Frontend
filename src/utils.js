import axios from "axios";

const BASE_URL= axios.create({
  baseURL: "https://yunometa-backend.onrender.com/api",
  timeout: 5000,
});


export function fetchCategoryDistribution(params) {
  return BASE_URL.get("/categories/distribution", { params });
}

export function fetchStockVsMsl(itemId, params) {
  return BASE_URL.get(`/items/${itemId}/stock-vs-msl`, { params });
}
export function fetchConsumptionMonthly(params) {
  return BASE_URL.get(`/consumption-trend`, { params });
}
export default BASE_URL;
