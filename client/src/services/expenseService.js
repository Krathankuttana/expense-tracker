import api from "./api";

const expenseService = {
  getAll: (params) => api.get("/expenses", { params }).then((res) => res.data),
  create: (payload) => api.post("/expenses", payload).then((res) => res.data),
  update: (id, payload) => api.put(`/expenses/${id}`, payload).then((res) => res.data),
  remove: (id) => api.delete(`/expenses/${id}`).then((res) => res.data),
};

export default expenseService;
