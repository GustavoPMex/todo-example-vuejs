<template>
    <p v-if="incorrectAuth">
        Incorrect username
    </p>
    <form @submit.prevent="login">
        <input
            class="form-control w-50 mx-auto mt-4"
            type="text"
            placeholder="Username"
            v-model="user_name"
        >

        <input
            class="form-control w-50 mx-auto mt-4"
            type="password"
            placeholder="Password"
            v-model="user_password"
        >

        <button class="btn btn-success mt-5">
            Log in
        </button>

    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import router from '../router'
import { useStore } from 'vuex'

export default {
    setup() {

        const store = useStore()

        const user_name = ref('')
        const user_password = ref('')
        const incorrectAuth = false

        const login = () =>{
            store.dispatch('userLogin',{
                username: user_name.value,
                password: user_password.value
            })
        }

        return {user_name, user_password, incorrectAuth, login}
    },

}
</script>

<style>

</style>