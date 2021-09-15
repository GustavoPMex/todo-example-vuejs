import axios from 'axios'
import router from '../router';


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
            console.log('no')
            return Promise.reject(error);
        })
}


// export function interceptorResponse() {
//     axios.interceptors.response.use(
//         function(response) {
//             const authToken = JSON.parse(sessionStorage.getItem('user'))
//             if (authToken){
//                 response.headers.Authorization = `Bearer ${authToken.access}`
//             }
//             console.log('si')
//             return response;
//         },
//         function(error) {
//             console.log('no')
//             if(error.response && error.response.status === 401){
//                 sessionStorage.removeItem('user')
//                 router.push({name: 'Login'})
//             }

//             return Promise.reject(error);
//         })
// }