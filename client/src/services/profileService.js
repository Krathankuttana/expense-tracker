import api from "./api";

const profileService = {
  get: () => api.get("/profile").then((res) => res.data),
  update: (payload) => api.put("/profile", payload).then((res) => res.data),
};

export default profileService;
