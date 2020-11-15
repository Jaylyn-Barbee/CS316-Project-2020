<template>
  <div class="col-md-3">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">
            {{ recipe.RecipeName }}
        </h5>
        <p>by {{ recipe.Author }} </p>
      </div>
      <div class="img-cont">
          <img :src="recipe.RecipePhoto" class="recipePic" alt="">
      </div>
      <button class="btn btn-light expander" @click="openModal" title="Open Recipe Details"><i class="fa fa-expand-arrows-alt" style="color: #0275d8" aria-hidden="true"></i></button>
    </div>
    <!-- <add-task :show="showAddTask" :categories="allcategories" @create-task="addTask" @close="showAddTask = false"></add-task>
    <edit-name :show="showNameEditor" @close="showNameEditor = false" @edit-name="edit" :item="nameItem"></edit-name> -->
  </div>
</template>
<script>
module.exports = {
  props: ['recipe'],
  data: function() {
    return {
      /* 'showAddTask : false,
      showModal: false,
      showNameEditor: false,
      nameItem: {} */
    }
  },
  methods: {
    /* editName(){
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
    deleteTask(task){
      this.$emit('delete-task', task)
    }, */
  },
  components: {
    /*'task': httpVueLoader('Task.vue'), */
  }
}
</script>

<style scoped>
.card{
  max-width: 22rem;
  min-width: 22rem;
  max-height: 25em;
  min-height: 25em;
}
.right{
  float: right;
}
button{
  margin: .05em;
}
.recipePic {
    float: center;
    width:  15em;
    height: 15em;
    object-fit: cover;
}
.img-cont {
    text-align: center;
    display: block;
}
.expander {
    position: absolute;
    bottom: 0;
}
</style>