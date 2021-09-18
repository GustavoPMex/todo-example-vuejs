import axios from 'axios'

export function interceptorRequest() {
    axios.interceptors.request.use(
        function(config) {
            const authToken = JSON.parse(sessionStorage.getItem('user'))
            if (authToken){
                config.headers.Authorization = `Bearer ${authToken.access}`
            }
            return config;
        },
        function(error) {
            console.log(error)
            return Promise.reject(error);
        })
}