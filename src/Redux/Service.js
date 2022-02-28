import axios from 'axios'

const Axios = axios.create({
    baseURL: 'https://accounts.spotify.com/api/',
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null
    },
    auth: {
        username: '3a5f48d1050a4afe89875b1d1ad9d793',
        password: '81597203681743aa84ba208515b2084a',
    }
});  

Axios.interceptors.request.use((config)=>{
    console.log(4444, config)
    config.headers.common.Authorization = localStorage.getItem('authToken')
    return config;
})

export default Axios;

// axios.defaults.headers.common['Authorization'] = 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))