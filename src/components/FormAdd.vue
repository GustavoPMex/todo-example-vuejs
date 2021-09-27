<template>
    <form @submit.prevent='addElement'>
        <input 
            id="task"
            class="form-control w-50 mx-auto mt-4"
            placeholder="Description"
            v-model.trim="inputTask"
            @keyup="inputChange"
        type="text">

        <button 
            class="btn btn-success mt-4"
            :disabled='disabledBtn'
        > Add task
        </button>
    </form>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import router from '../router'
import swal from 'sweetalert'

export default {
    setup() {
        const inputTask = ref('')
        
        const store = useStore()

        const disabledBtn = computed(() => {
            return inputTask.value <= 0 ? true : false
        })

        const inputChange = () =>{
            sessionStorage.setItem('autosave', inputTask.value)
        }

        const addElement = () =>{
            store.dispatch('addTask', inputTask)
        }

        return {inputTask, disabledBtn, addElement, inputChange}
    }, 
    watch: {
        $route (to, from){
            sessionStorage.removeItem('autosave')
        }
    },
    created() {
        if (sessionStorage.getItem('autosave')){
            this.inputTask = sessionStorage.getItem('autosave')
        }
    }
}


</script>

<style>

</style>