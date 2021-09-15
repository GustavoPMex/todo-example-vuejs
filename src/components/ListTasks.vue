<template>
    <div v-if="tasks.length > 0" class="content p-5">
            <h2>Tasks</h2>
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
                    <td>
                        In progress
                    </td>
                    <td>
                        <i 
                            class="fas fa-pen-square icon-edit"
                            role="button"
                            title="Success"
                            @click="setTarea(task)"
                        ></i >
                        <i 
                            class="fas fa-calendar-check icon-success"
                            role="button"
                            title="Success"
                            @click="complete(task)"
                        ></i>
                        <i 
                            class="fas fa-calendar-times icon-delete"
                            role="button"
                            title="Delete Task"
                            @click="deleteTask(task.id)"
                        ></i>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else class="content p-5">
        <p class="empty">Empty</p>
    </div>

    <div v-if="completedTasks.length > 0" class="content p-5">
        <h2 class="mb-5">Completed Tasks</h2>
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
                <tr v-for="(task, index) in completedTasks" :key="index">
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
                            class="fas fa-calendar-times icon-delete"
                            role="button"
                            title="Delete Task"
                            @click="deleteTask(task.id)"
                        ></i>

                    </td>
                </tr>
            </tbody>
        </table>
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

        const completedTasks = computed(() =>{
            return store.getters.getCompletedTasks
        })

        const complete = (task) =>{
            store.dispatch('completeTask', task)
        }

        const deleteTask = (idtask) => {
            store.dispatch('deleteTask', idtask)
        }

        const setTarea = (task) => {
            store.dispatch('setUpdateTask', task)
        }

        onMounted(async()  =>{
            await store.dispatch('getTasks')
            await tasks
            await completedTasks
        })

        return {tasks, completedTasks, complete, deleteTask, setTarea}
    }
}
</script>

<style>
.table-list{
    color: white !important;
}

.icon-edit{
    color: rgb(115, 147, 255) !important;
    margin: 0 13px 0 0;
    font-size: 30px;
}

.icon-success{
    color: green !important;
    margin: 0;
    font-size: 30px;
}

.icon-delete{
    color: red !important;
    margin: 0 0 0 13px;
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

