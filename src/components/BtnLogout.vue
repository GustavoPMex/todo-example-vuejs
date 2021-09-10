<template>
    <button
        class="btn btn-danger"
        @click="logout"
        v-if="userAuth"
    >
        Logout
    </button>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'

export default {
    setup() {
        const store = useStore()

        const logout = () =>{
            store.dispatch('userLogout')
        }

        const userAuth = computed(() => {
            return store.getters.loggedIn
        })

        return {logout, userAuth}
    }
}
</script>

<style>

</style>