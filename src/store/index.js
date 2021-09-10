import { createStore, Vuex } from 'vuex'
import axios from 'axios'
import router from '../router'
import decodeToken from '../assets/decodeJwt'

export default createStore({
  state: {
    accessToken: null,
    refreshToken: null,
    tasks: []
  },
  mutations: {
    setTasks(state, payload){
      state.tasks = payload
    },
    updateStorage(state, {access, refresh}){
      state.accessToken = access
      state.refreshToken = refresh
    }
  },
  actions: {
    
    // GET
    async getTasks({commit, state}){

      const djangoResponse = 'http://127.0.0.1:8000/api/v1/tasks/'
      await axios.get(djangoResponse, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        }
      })
      .then((response) => {
        const tasks = response.data
        commit('setTasks', tasks)
      })
      .catch((error) => {
        console.log(error)
      })
    },

    // USER LOGIN
    async userLogin({commit}, credentials){

        const djangoResponse = 'http://127.0.0.1:8000/api/token/' 

        await axios.post(djangoResponse, {
          username: credentials.username,
          password: credentials.password
        })
        .then((response) =>{
          commit('updateStorage', {
                                  access:response.data.access, 
                                  refresh:response.data.refresh
          })
          sessionStorage.setItem('user', JSON.stringify(
                                        { access:response.data.access, 
                                          refresh:response.data.refresh
                                        }
          ))                            
          router.push({name: 'Home'})

        })
        .catch((error) => {
          console.log(error)
        })
    },

    // USER LOGOUT
    userLogout({commit}){
      commit('updateStorage', {access: null, refresh: null})
      sessionStorage.removeItem('user')
      router.push({name: 'Login'})
    },

    // LOAD SESSION STORAGE
    loadSessionStorage({commit, state}){
        if (sessionStorage.getItem('user')){
          commit('updateStorage', JSON.parse(sessionStorage.getItem('user')))
        } else {
          commit('updateStorage', {
            access: null,
            refresh: null
          })
        }
      
    },
    
    // ADD TASK
    async addTask({commit, state}, task){

      const token = decodeToken(state.accessToken)

      const objTask = {
        description: task.value,
        owner: token.user_id,
        status: true
      }

      const djangoResponse = 'http://127.0.0.1:8000/api/v1/tasks/'
      await axios.post(djangoResponse, objTask, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        }
      }).catch((error) =>{
        console.log(error)
      })
    },

  },
  getters: {
    getTasks(state){
      return state.tasks
    },
    loggedIn(state){
      return state.accessToken != null
    }
  }
})
