import { createStore, Vuex } from 'vuex'
import axios from 'axios'
import router from '../router'
import swal from 'sweetalert'


// The header is configurate in assets/jwtInterceptor.js. It is called in main.js

export default createStore({
  state: {
    tasks: [],
    completedTasks: [],
    userAuth: false
  },
  mutations: {
    setTasks(state, payload){
      state.tasks = payload
    },
    setCompletedTasks(state, payload){
      state.completedTasks = payload
    },
    setTaskDone(state, payload){
      state.tasks = state.tasks.filter(item => item.id !== payload.id)
      state.completedTasks.push(payload)
    },
    removeTask(state, idtask){
      const taskInProgress = state.tasks.find(item => item.id === idtask)
      if (taskInProgress) {
        state.tasks = state.tasks.filter(item => item.id !== idtask)
      }
      state.completedTasks = state.completedTasks.filter(item => item.id !== idtask)
    },
    setUserAuth(state, payload){
      state.userAuth = payload
    }
  },
  actions: {
    // USER LOGIN
    async userLogin({commit}, credentials){
        const djangoResponse = 'http://127.0.0.1:8000/auth/token/' 
        await axios.post(djangoResponse, {
          username: credentials.username,
          password: credentials.password
        })
        .then((response) =>{
          sessionStorage.setItem('user', JSON.stringify(
            {
              access:response.data.access, 
              refresh:response.data.refresh
            }
          ))                
          commit('setUserAuth', true)            
          router.push({name: 'Home'})
        })
        .catch((error) => {
          swal(
            {
              icon: 'error',
              title: 'Incorrect user or password',
              text: 'Try again'
            }
          )
        })
    },

    async userRegistration({commit}, credentials){
      const djangoResponse = 'http://127.0.0.1:8000/auth/register/' 
      await axios.post(djangoResponse, {
        username: credentials.username,
        password: credentials.password,
        email: credentials.email,
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        password: credentials.password,
        password2: credentials.password2,
      })
      .then(() =>{         
        router.push({name: 'Login'})
        swal({
          title: 'SUCCESS',
          text: 'Registered User'
        })
      })
      
  },

    // USER LOGOUT
    userLogout({commit}){
      sessionStorage.clear()
      localStorage.clear()
      commit('setUserAuth', false)
      // Router.go wihout arguments reloads the page
      router.push({name: 'Login'})
      router.go()
    },

    // LOAD SESSION STORAGE
    loadSessionStorage({commit, state}){
        if (sessionStorage.getItem('user')) {
          commit('setUserAuth', true)
        } else {
          commit('setUserAuth', false)
        }
    },
    
    // GET TASKS
    async getTasks({commit, state}){
      const sessionToken = JSON.parse(sessionStorage.getItem('user'))
      if (sessionToken){
        const djangoResponse = 'http://127.0.0.1:8000/api/v1/tasks/'
        // Get API
        await axios.get(djangoResponse)
        .then((response) => {
          const tasks = response.data
          // Tasks in progress
          const inProgress = tasks.filter(item => item.status === true)
          // Completed Tasks
          const completed = tasks.filter(item => item.status === false)
          // Assign to list
          commit('setTasks', inProgress)
          commit('setCompletedTasks', completed)
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
      if (sessionToken) {
        const objTask = {
          description: task.value,
          status: true
        }
        // Post
        const djangoResponse = 'http://127.0.0.1:8000/api/v1/tasks/'
        await axios.post(djangoResponse, objTask)
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
    // Complete task
    async completeTask({commit}, task){
      const sessionToken = JSON.parse(sessionStorage.getItem('user'))
      if(sessionToken){
        const djangoResponse = `http://127.0.0.1:8000/api/v1/tasks/edit/${task.id}/`
        // Change status field
        axios.put(djangoResponse,
          {
            description: task.description,
            status: task.status
          }
        )
        .then(() => {
          commit('setTaskDone', task)
          router.push({name: 'Home'})
          swal({
            title: 'Task done!'
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
    // Delete
    async deleteTask({commit}, idtask){
      const sessionToken = JSON.parse(sessionStorage.getItem('user'))

      if(sessionToken){
        const djangoResponse = `http://127.0.0.1:8000/api/v1/tasks/delete/${idtask}/`

        axios.delete(djangoResponse)
        .then(() => {
          commit('removeTask', idtask)
          router.push({name: 'Home'})
          swal(
            {
              icon: 'error',
              title: 'Deleted',
              text: 'Task deleted'
            }
          )
          
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
    // STORE TASK
    async setUpdateTask({commit}, task){
      sessionStorage.setItem('task', JSON.stringify(task))
      router.push({name: 'Update'})
    }
    ,
    // UPDATE TASK
    async updateTask({commit, state}, task){
      const sessionToken = JSON.parse(sessionStorage.getItem('user'))
      if(sessionToken){
        const djangoResponse = `http://127.0.0.1:8000/api/v1/tasks/edit/${task.id}/`
        // Update task
        axios.put(djangoResponse, task)
        .then(() => {
          router.push('/')
          swal({
            title: 'Updated task'
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
    getCompletedTasks(state){
      return state.completedTasks
    },
    loggedIn(state){
      return state.userAuth != false
    }
  }
})
