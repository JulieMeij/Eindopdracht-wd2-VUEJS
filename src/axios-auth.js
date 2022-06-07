import axios from 'axios';

const instance = axios.create( { 
    baseURL: "https://cardgames-php.herokuapp.com/",
});

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token;

    return config;
});

export default instance;