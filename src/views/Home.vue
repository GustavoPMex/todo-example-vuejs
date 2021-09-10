<template>
  <div class="home">
    <ListTasks />
  </div>
</template>

<script>
import ListTasks from '../components/ListTasks.vue'

export default {
  name: 'Home',
  components: {
    ListTasks
  }

}
</script>
