<template>
    <!-- We verify if "taskDescription" exists in session storage-->
    <form v-if="taskDescription" @submit.prevent="update">
        <input 
            id="task"
            class="form-control w-50 mx-auto mt-4"
            placeholder="Description"
            v-model.trim="taskDescription.description"
        type="text">
        <button
            class="btn btn-success mt-4"
            :disabled="disabledBtn"
        > Update
        </button>
    </form>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import router from '../router'

export default {
    
    setup() {

        const taskDescription = ref(JSON.parse(sessionStorage.getItem('task')))
        
        const store = useStore()

        const disabledBtn = computed(() => {
            const currentTask = JSON.parse(sessionStorage.getItem('task')).description
            const newTask = taskDescription.value.description
            if (newTask.length <= 0 || currentTask === newTask){
                return true
            }
            return false
        })

        const update = () =>{
            store.dispatch('updateTask', taskDescription.value)
        }

        return {taskDescription, disabledBtn, update}

    },
    watch: {
        $route (to, from){
            sessionStorage.removeItem('task')
        }
    },
    created() {
        if(!(JSON.parse(sessionStorage.getItem('task')))){
            router.go(-1)
        }
    }

}


</script>

<style>

</style>