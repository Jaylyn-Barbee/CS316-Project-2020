<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">{{ task.name }}
        <button type="button" class="btn btn-light right" @click="$emit('delete-task')" title="Delete Task">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <button type="button" class="btn btn-light right" @click="editName(task)" title="Edit Task Name">
          <i class="fa fa-edit" aria-hidden="true"></i>
        </button>
      </h5>
    </div>
    <div class="card-body">
      <p class="card-text">Created: {{ task.creationdate }}</p>
      <p class="card-text">Due: {{ task.deadline }}</p>
      <hr>
      <button class="btn btn-light" @click="openModal" title="Open Task Details"><i class="fa fa-expand-arrows-alt" style="color: #0275d8" aria-hidden="true"></i></button>
      <button class="btn btn-light right" v-if="this.index < this.length-1" @click="$emit('move-task-right', task)"
              title="Move Task Right">&raquo;</button>
      <button class="btn btn-light right" v-if="this.index > 0" @click="$emit('move-task-left', task)"
              title="Move Task Left">&laquo;</button>
    </div>
    <modal :task="task" :users="users" :show="showModal" @close="closeModal" :categories="categories" ></modal>
    <edit-name :show="showNameEditor" @close="showNameEditor = false" @edit-name="edit" :item="nameItem"></edit-name>
  </div>
</template>
<script>
module.exports = {
  props: ['task', 'index', 'length', 'users', 'categories'],
  data: function() {
    return {
      showModal: false,
      showNameEditor: false,
      nameItem: {}
    }
  },
  methods: {
    editName(task){
      this.nameItem = task
      this.showNameEditor = true
    },
    edit(stuff){
      const { item, val } = stuff
      this.$root.$firebaseRefs.allTasks.child(item['.key']).child('name').set(val)
      this.showNameEditor = false
      this.editInfo = ''
      this.editValue = ''
    },
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    }
  },
  components: {
    'modal': httpVueLoader('Modal.vue'),
    'edit-name': httpVueLoader('EditName.vue')
  }
}
</script>

<style scoped>
.right{
  float: right;
}
button{
  margin: .05em;
}
.card{
  margin: 1.2em;
}
.card-block{
  margin: 0;
}
</style>
