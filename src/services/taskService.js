import api from "../api/api";

export const getTasks=()=>{

    return api.get("/tasks");

};

export const createTask=(task)=>{

    return api.post("/tasks",task);

};

export const updateTask=(id,task)=>{

    return api.put(`/tasks/${id}`,task);

};

export const deleteTask=(id)=>{

    return api.delete(`/tasks/${id}`);

};

export const completeTask=(id)=>{

    return api.put(`/tasks/${id}/complete`);

};