import api from "../api/api";

export const signup = (user)=>{

    return api.post("/auth/signup",user);

};

export const login = (user)=>{

    return api.post("/auth/login",user);

};