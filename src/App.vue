<template>
  <h1 class="mt-4">ToDO example</h1>

  <div id="nav">
    <router-link 
      class="mx-4" to="/"
      v-if="userAuth"
    >
      Home
    </router-link> 

    <router-link
      class="mx-4" to="/add"
      v-if="userAuth"
    >
      Add
    </router-link>

    <router-link 
      class="mx-4"
      to="/login"
      v-if="!userAuth"
    >
      Login
    </router-link> 
    <router-link 
      class="mx-4"
      to="/register"
      v-if="!userAuth"
    >
      Register
    </router-link> 
    <BtnLogout />
  </div>
  
  <router-view/>
  
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import BtnLogout from '../src/components/BtnLogout.vue'
import { onMounted } from '@vue/runtime-core'

export default {
  components: {
    BtnLogout
  },
  setup() {
    const store = useStore()

    const userAuth = computed(() => {
      return store.getters.loggedIn
    })

    onMounted(async()=>{
      store.dispatch('loadSessionStorage')
    })

    return {userAuth}
  }
}


</script>


<style>

.swal-modal{
    background-color: rgb(60, 62, 65);
}

.swal-title{
    color: white;
}

.swal-text{
  color: white;
}

.swal-button{
  background-color: #198754;
  border-color: #198754;
  transition: .1s;

}
.swal-button:not([disabled]):hover {
    background-color: #147749;
}
.swal-button:hover{
  background-color: #157347;
  border-color: #146c43;
}

.swal-button:active {
    background-color: #157347;
}

.swal-button:focus {
    outline: none;
    box-shadow: 0 0 0 1px #fff, 0 0 0 3px #157347;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  font-size: 20px;
  color: #9b9b9b;
  text-decoration: none;
  transition: .3s;
}

#nav a:hover {
  color: #42b983;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
