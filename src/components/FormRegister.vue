<template>
    <form @submit.prevent="registration">
        
        <!-- username -->
        <input
            class="form-control  w-50  mx-auto  mt-4"
            type="text"
            placeholder="Username"
            v-model.trim="username"
        >
        <div 
            v-if="errors.username"
            class="w-50 mx-auto mt-3 alert alert-danger"
            role="alert">
            <i class="fas fa-exclamation-triangle"></i>
            <p 
                class="d-flex justify-content-start text-left"
                v-for="(error, index) in errors.username" 
                :key="index">
                - {{error}}
            </p>
        </div>

        <!-- EMAIL -->
        <input
            class="form-control  w-50  mx-auto  mt-4"
            type="Email"
            placeholder="Email"
            v-model.trim="email"
        >
        <div 
            v-if="errors.email"
            class="w-50 mx-auto mt-3 alert alert-danger"
            role="alert">
            <i class="fas fa-exclamation-triangle"></i>
            <p 
                class="d-flex justify-content-start text-left"
                v-for="(error, index) in errors.email" 
                :key="index">
                - {{error}}
            </p>
        </div>

        <!-- FIRST NAME -->
        <input
            class="form-control  w-50  mx-auto  mt-4"
            type="text"
            placeholder="First name"
            v-model.trim="firstName"
        >

        <!-- LAST NAME -->
        <input
            class="form-control  w-50  mx-auto  mt-4"
            type="text"
            placeholder="Last name"
            v-model.trim="lastName"
        >

        <!-- PASSWORD -->
        <input 
            class="form-control  w-50  mx-auto  mt-4"
            type="password"
            placeholder="Password"
            v-model.trim="password"
        >
        <div 
            v-if="errors.password"
            class="w-50 mx-auto mt-3 alert alert-danger"
            role="alert">
            <i class="fas fa-exclamation-triangle"></i>
            <p 
                class="d-flex justify-content-start text-left"
                v-for="(error, index) in errors.password" 
                :key="index">
                - {{error}}
            </p>
        </div>
        <!-- PASSWORD 2 -->
        <input
            class="form-control  w-50  mx-auto  mt-4"
            type="password"
            placeholder="Password again"
            v-model.trim="passwordAgain"
        >

        <div 
            v-if="errors.password2"
            class="w-50 mx-auto mt-3 alert alert-danger"
            role="alert">
            <i class="fas fa-exclamation-triangle"></i>
            <p 
                class="d-flex justify-content-start text-left"
                v-for="(error, index) in errors.password2" 
                :key="index">
                - {{error}}
            </p>
        </div>
        
        <button
            class="btn btn-success mt-4"
            :disabled='disabledBtn'
        >
            Register
        </button>

    </form>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    setup() {
        const username = ref('')
        const email = ref('')
        const firstName = ref('')
        const lastName = ref('')
        const password = ref('')
        const passwordAgain = ref('')
        const errors = ref('')

        const store = useStore()

        const disabledBtn = computed(() =>{
            if (username.value && email.value &&
                firstName.value && lastName.value &&
                password.value && passwordAgain.value){
                return false
            }
            return true
        })

        const registration = () => {
            store.dispatch('userRegistration', {
                username: username.value,
                email: email.value,
                first_name: firstName.value,
                last_name: lastName.value,
                password: password.value,
                password2: passwordAgain.value,
            })
            .catch((error) => {
                errors.value = error.response.data
            })
        }



        return {
            username, password, passwordAgain, disabledBtn,
            email, firstName, lastName, registration, errors
        }
    }
}
</script>

<style>

</style>