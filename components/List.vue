<template>
  <div class="col-md-3">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">
          <a data-toggle="collapse" :href="'#' + this.index">
            {{ list.name }}
          </a>
          <button type="button" class="btn btn-light right" @click="$emit('delete-list')" title = "Delete List">
            <i class="fa fa-trash"></i>
          </button>
          <button type="button" class="btn btn-light right" @click="editName" title = "Edit List Name">
            <i class="fa fa-edit" aria-hidden="true"></i>
          </button>
        </h5>
      </div>
      <div class="card-block collapse show" :id="this.index">
        <template v-for="task in tasks">
          <task v-show="render(task)" :users="users" :task="task" :index="index" :length="length" :key="task.key" :list="list" :categories="allcategories"
          @delete-task="deleteTask(task)" @move-task-left="moveTaskLeft(task)" @move-task-right="moveTaskRight(task)"></task>
        </template>
        <hr>
        <button type="button" class="btn btn-default btn-light" @click="showAddTask = true" title="Add Task">
          <i class="fa fa-plus" style="color: #0275d8" aria-hidden="true"></i>
        </button>
        <button v-if="index < length-1" class="btn btn-light right" @click="$emit('move-list-right')" title = "Move List Right">
          &raquo;</button>
        <button v-if="index > 0" class="btn btn-light right" @click="$emit('move-list-left')" title = "Move List Left">
          &laquo;</button>
      </div>
    </div>
    <add-task :show="showAddTask" :categories="allcategories" @create-task="addTask" @close="showAddTask = false"></add-task>
    <edit-name :show="showNameEditor" @close="showNameEditor = false" @edit-name="edit" :item="nameItem"></edit-name>
  </div>
</template>
<script>
module.exports = {
  props: ['list', 'index', 'length', 'tasks', 'users', 'checkedcategories', 'allcategories', 'checkeddates'],
  data: function() {
    return {
      showAddTask : false,
      showModal: false,
      showNameEditor: false,
      nameItem: {}
    }
  },
  methods: {
    editName(){
      this.nameItem = this.list
      this.showNameEditor = true
    },
    edit(stuff){
      const { item, val } = stuff
      this.$emit("edit-list-name", [this.list, val])
      this.showNameEditor = false
      this.editInfo = ''
      this.editValue = ''
    },
    addTask(task){
      const { name, description, category } = task
      // gets and formats the date strings to look nice
      var creationdate = new Date()
      if (creationdate.getMonth() < 10){
        creationdate = "0" + creationdate.toLocaleString().substring(0, 9)
      }
      else creationdate = creationdate.toLocaleString().substring(0, 10)
      var deadline = new Date()
      deadline.setDate(deadline.getDate() + 7)
      var deadlinestring  = deadline.toLocaleString().substring(0, 10)
      if (deadline.getMonth() < 10){
        deadlinestring = "0" + deadline.toLocaleString().substring(0, 9)
      }
      var myList = this.list['.key']
      this.$emit('create-task',
        {
            name: name,
            description: description,
            creationdate: creationdate,
            deadline: deadlinestring,
            list: myList,
            comments: [],
            todos: [],
            images: [],
            users: [],
            category: category
        })
      this.showAddTask = false
    },
    deleteTask(task){
      this.$emit('delete-task', task)
    },
    moveTaskLeft(task){
      this.$emit('move-task-left', task)
    },
    moveTaskRight(task){
      this.$emit('move-task-right', task)
    },
    render(task){
      // function that checks if the task should be displayed in each list. Can't be computed b/c Firebase changes don't update computed values AFAIK
      var category = db.ref('allTasks/'+task['.key']+'/category')
      var cat
      category.on('value', function(snapshot){
        cat = snapshot.val()
      })
      return (task.list == this.list['.key']) && (this.checkedcategories.includes(cat))
    }
  },
  components: {
    'task': httpVueLoader('Task.vue'),
    'add-task': httpVueLoader('AddTask.vue'),
    'edit-name': httpVueLoader('EditName.vue')
  }
}
</script>

<style scoped>
.card{
  margin: 1em;
}
.right{
  float: right;
}
button{
  margin: .05em;
}
</style>
