
const makeServerServices = (api) => ({
  getDevelopers: () => api.get(`/developers`),
  getAllStatus: () => api.get(`/task-status`),
  getAllTypes: () => api.get(`/task-types`),
  getAllTasks: () => api.get(`/tasks`),
  createTask: (task) => api.post(`/tasks`,task),
  moveTask: (id,action) => api.patch(`/tasks/${id}`,action),

});


export {
  makeServerServices
};
