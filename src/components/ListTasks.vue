<template>
    <h2>Tasks</h2>
    <div v-if="tasks.length > 0" class="content p-5">
        <table class="table table-dark table-striped table-list disable-select">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Tasks</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task,index) in tasks" :key="index">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{task.description}}</td>
                    <td
                        v-if="task.status"
                    >
                        In progress
                    </td>
                    <td v-else>
                        Complete
                    </td>
                    <td>
                        <i 
                            class="fas fa-calendar-check icon-success"
                            role="button"
                            title="Success"
                        ></i>

                        <i 
                            class="fas fa-calendar-times icon-delete"
                            role="button"
                            title="Delete Task"
                        ></i>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else class="content p-5">
        <p class="empty">Empty</p>
    </div>

</template>

<script>
import { onMounted, computed } from '@vue/runtime-core'
import {useStore} from 'vuex'

export default {
    setup(){
        const store = useStore()
        
        const tasks = computed(() =>{
            return store.getters.getTasks
        })

        onMounted(async()  =>{
            await tasks
            await store.dispatch('getTasks')
        })

        return {tasks}
    }
}
</script>

<style>
.table-list{
    color: white !important;
}

.icon-success{
    color: green !important;
    margin: 0 10px 0 0;
    font-size: 30px;
}

.icon-delete{
    color: red !important;
    margin: 0 0 0 10px;
    font-size: 30px;
}

.empty{
    color: red;
    font-size: 30px;
}

.disable-select{
    user-select:none;
}

</style>

