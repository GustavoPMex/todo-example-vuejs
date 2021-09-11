import { createStore, Vuex } from 'vuex'
import axios from 'axios'
import router from '../router'
import decodeToken from '../assets/decodeJwt'
import swal from 'sweetalert'

export default createStore({
  state: {
    tasks: [],
    userAuth: false
  },
  mutations: {
    setTasks(state, payload){
      state.tasks = payload
    },
    setUserAuth(state, payload){
      state.userAuth = payload
    }
  },
  actions: {
    // USER LOGIN
    async userLogin({commit}, credentials){
        const djangoResponse = 'http://127.0.0.1:8000/api/token/' 
        await axios.post(djangoResponse, {
          username: credentials.username,
          password: credentials.password
        })
        .then((response) =>{
          sessionStorage.setItem('user', JSON.stringify(
                                        { access:response.data.access, 
                                          refresh:response.data.refresh
                                        }
          ))                
          commit('setUserAuth', true)            
          router.push({name: 'Home'})
        })
        .catch((error) => {
          swal({
            icon: 'error',
            title: 'Incorrect user or password',
            text: 'Try again'
          })
        })
    },

    // USER LOGOUT
    userLogout({commit}){
      sessionStorage.removeItem('user')
      commit('setUserAuth', false)
      router.push({name: 'Login'})
    },

    // LOAD SESSION STORAGE
    loadSessionStorage({commit, state}){
        if (sessionStorage.getItem('user')){
          commit('setUserAuth', true)
        } else {
          commit('setUserAuth', false)
        }
    },
    
    // GET
    async getTasks({commit, state}){
      const sessionToken = JSON.parse(sessionStorage.getItem('user'))
      if (sessionToken){
        const djangoResponse = 'http://127.0.0.1:8000/api/v1/tasks/'
        await axios.get(djangoResponse, {
          headers: {
            Authorization: `Bearer ${sessionToken.access}`
          }
        })
        .then((response) => {
          const tasks = response.data
          commit('setTasks', tasks)
        })
        .catch((error) => {
          // This redirects to login when the token expired
          if(error.response && error.response.status === 401){
            sessionStorage.removeItem('user')
            commit('setUserAuth', false)
            router.push({name: 'Login'})
          } else {
            console.log(error)
          }
        })
      } else {
        commit('setUserAuth', false)
        router.push({name: 'Login'})
      }
    },

    // ADD TASK
    async addTask({commit, state}, task){
      const sessionToken = JSON.parse(sessionStorage.getItem('user'))
      
      if (sessionToken){
        const token = decodeToken(sessionToken.access)
        const objTask = {
          description: task.value,
          owner: token.user_id,
          status: true
        }
        const djangoResponse = 'http://127.0.0.1:8000/api/v1/tasks/'
        await axios.post(djangoResponse, objTask, {
          headers: {
            Authorization: `Bearer ${sessionToken.access}`
          }
        })
        .then(() =>{
          router.push('/')
          swal({
            title: 'Added task'
          })
        })
        .catch((error) => {
          // This redirects to login when the token expired
          if(error.response && error.response.status === 401){
            sessionStorage.removeItem('user')
            commit('setUserAuth', false)
            router.push({name: 'Login'})
          } else {
            console.log(error)
          }
        })
      } else {
        commit('setUserAuth', false)
        router.push({name: 'Login'})
      }
    },
  },
  getters: {
    getTasks(state){
      return state.tasks
    },
    loggedIn(state){
      return state.userAuth != false
    }
  }
})
