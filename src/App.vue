<template>
  <h1 class="mt-4">ToDO example</h1>

  <div id="nav">
    <router-link class="mx-4" to="/">Home</router-link> 
    <router-link class="mx-4" to="/add">Add</router-link>
    <router-link 
      class="mx-4"
      to="/login"
      v-if="!userAuth"
    >
      Login
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
