import axios from 'axios';

const api =  axios.create({
    // baseURL: 'http://localhost:2000',
    baseURL: "https://firefy-back.herokuapp.com"
})

export default api