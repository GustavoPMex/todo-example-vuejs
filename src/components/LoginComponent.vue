<template>
    <form @submit.prevent="login">
        <input
            class="form-control  w-50  mx-auto  mt-4"
            type="text"
            placeholder="Username"
            v-model="user_name"
        >

        <input
            class="form-control  w-50  mx-auto  mt-4"
            type="password"
            placeholder="Password"
            autocomplete="on"
            v-model="user_password"
        >

        <button 
            class="btn btn-success mt-5"
            :disabled='disabledBtn'
        >
            Log in
        </button>
    </form>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    setup() {

        const store = useStore()

        const user_name = ref('')
        const user_password = ref('')

        const disabledBtn = computed(() => {
            return !(user_name.value) || !(user_password.value) ? true : false
        })

        const login = () => {
            store.dispatch('userLogin',{
                username: user_name.value,
                password: user_password.value
            })
        }

        return {user_name, user_password, disabledBtn, login}
    },

}
</script>

<style>



</style>