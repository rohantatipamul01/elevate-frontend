import api from "../api/api";

export const getDashboard=()=>{

    return api.get("/dashboard");

};