import api from "./api";

const incomeService = {
  getAll: (params) => api.get("/income", { params }).then((res) => res.data),
  create: (payload) => api.post("/income", payload).then((res) => res.data),
  update: (id, payload) => api.put(`/income/${id}`, payload).then((res) => res.data),
  remove: (id) => api.delete(`/income/${id}`).then((res) => res.data),
};

export default incomeService;
