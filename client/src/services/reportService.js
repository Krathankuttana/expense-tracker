import api from "./api";

const reportService = {
  getSummary: () => api.get("/reports/summary").then((res) => res.data),
  getMonthly: (year) => api.get("/reports/monthly", { params: { year } }).then((res) => res.data),
  getByCategory: () => api.get("/reports/by-category").then((res) => res.data),
};

export default reportService;
