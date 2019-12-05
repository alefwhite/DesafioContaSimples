import Axios from "axios";

const api = Axios.create({
    baseURL : "http://localhost:3333/api",
    headers : {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"*"
    }
});

export default api;