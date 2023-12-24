import axios from 'axios'

export const BASE_URL = 'http://localhost:8000/api'

export const userApi = {
    register: async(userData)=>{
        const response = await axios.post(`${BASE_URL}/users/user-register/`,userData);
        console.log("The data from the first to the response",response.data)
        console.log(response)
        return response.data;
    },
    login: async(userData)=>{
        const response = await axios.post(`${BASE_URL}/users/t  en/`,userData);
        console.log(response.data)
        return response.data;
    }
}
