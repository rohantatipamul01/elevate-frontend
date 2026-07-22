import api from "../api/api";

export const getProfile=()=>{

    return api.get("/user/profile");

};

export const updateProfile=(profile)=>{

    return api.put("/user/profile",profile);

};

export const uploadProfilePicture=(formData)=>{

    return api.post(
        "/user/profile-picture",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );

};