<template lang="html">
  <div class="modal" v-show="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4>{{ task.name }}</h4>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <h6>Description:
                <button type="button" class="btn-xs btn-default btn-light edit-buttons" @click="editDescription"
                        title = "Edit">
                  <i class="fa fa-edit" style="color: #0275d8" aria-hidden="true" ></i>
              </button>
              </h6>
              <p> {{  task.description  }}</p>
              <h6>Creation Date:</h6>
              <p>  {{  task.creationdate  }}</p>
            </div>
            <div class="col-6">
              <h6>Category:
                <button type="button" class="btn-xs btn-default btn-light edit-buttons" @click="switchCategory"
                        title = "Edit">
                  <i class="fa fa-edit" style="color: #0275d8" aria-hidden="true" ></i>
                </button>
              </h6>
              <p :style="{ color: categoryColor() }"> {{ categoryName() }}</p>
                <h6>Deadline:
                <button type="button" class="btn-xs btn-default btn-light edit-buttons" @click="editDeadline"
                        title = "Edit">
                  <i class="fa fa-edit" style="color: #0275d8" aria-hidden="true" ></i>
                </button>
              </h6>
              <p> {{  task.deadline  }}</p>
            </div>
          </div>
          <edit-details :show="showDetailEditor" @close="showDetailEditor = false" @edit-details="edit"
                        :info="editInfo" :value="editValue" :data="editData"></edit-details>
          <hr>
          <div class="row-fluid">
            <div class="col-xs-3">
              <h6>Images: </h6>
              <ul>
                <li v-for="image in task.images" >
                  <img :src="image"/>
                  <button type="button" class="btn-xs btn-default btn-light delete-buttons"
                          @click="removeImage(image)" title = "Delete">
                    <i class="fa fa-trash" style="color: #0275d8" aria-hidden="true" ></i>
                  </button>
                </li>
              </ul>
            </div>
            <div class="col-xs-3">
              <h6>Comments: </h6>
              <ul>
                <li v-for="comment in task.comments" @click="removeComment(comment)">
                  {{  comment  }}
                  <button type="button" class="btn-xs btn-default btn-light delete-buttons"
                          @click="removeComment(comment)" title = "Delete">
                    <i class="fa fa-trash" style="color: #0275d8" aria-hidden="true" ></i>
                  </button>
                </li>
              </ul>
            </div>
            <div class="col-xs-3">
              <h6>Hashtags: </h6>
              <ul>
                <li v-for="todo in task.todos" @click="removeTodo(todo)">
                  {{ '#' + todo  }}
                  <button type="button" class="btn-xs btn-default btn-light delete-buttons"
                          @click="removeTodo(todo)" title = "Delete">
                    <i class="fa fa-trash" style="color: #0275d8" aria-hidden="true" ></i>
                  </button>
                </li>
              </ul>
            </div>
            <div class="col-xs-3">
              <h6>Shared With: </h6>
              <ul>
                <span  v-for="user in task.users" >
                  <span>
                    <img :src="user.image" class = "profile-pic" v-bind:title="user.name"/>
                    <button type="button" class="btn-xs btn-default btn-light delete-buttons"
                            @click="removeUser(user)" title = "Delete">
                      <i class="fa fa-trash" style="color: #0275d8" aria-hidden="true" ></i>
                    </button>
                  </span>
                </span>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="addComment">Add Comment</button>
          <button class="btn btn-primary" @click="addTodo">Add Hashtag</button>
          <button class="btn btn-primary" @click="addUser">Invite User</button>
          <label class="btn btn-primary" for="im-uploader">
            Add Image
            <input id="im-uploader" type="file" @change="fileUpload($event)" class="custom-file-input" hidden>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['task', 'show', 'users', 'categories'],
  components: {
    'edit-details': httpVueLoader('EditDetails.vue')
  },
  data: function(){
    return {
      editInfo: '',
      editValue: '',
      editData: [],
      showDetailEditor : false
    }
  },
  methods: {
    categoryName(){
      var categoryKey = this.task.category
      var query = db.ref('categories').child(categoryKey).child('name')
      var categoryName
      query.once('value', function(snapshot){
        categoryName = snapshot.val()
      })
      return categoryName
    },
    categoryColor(){
      var categoryKey = this.task.category
      var query = db.ref('categories').child(categoryKey).child('color')
      var categoryColor
      query.once('value', function(snapshot){
        categoryColor = snapshot.val()
      })
      return categoryColor
    },
    switchCategory(){
      this.editData = this.categories
      this.editInfo = 'category'
      this.editValue = this.task.category
      this.showDetailEditor = true
    },
    edit(stuff){
      const { info, val } = stuff
      tasksRef.child(this.task['.key']).child(info).set(val)
      this.showDetailEditor = false
      this.editInfo = ''
      this.editValue = ''
      this.editData = []
    },
    editDescription(){
      this.editInfo = 'description'
      this.editValue = this.task.description
      this.showDetailEditor = true
    },
    editDeadline(){
      this.editInfo = 'deadline'
      this.editValue = this.task.deadline
      this.showDetailEditor = true
    },
    closeModal(){
      this.$emit('close')
    },
    fileUpload(event){
      // adds an image to a task using FileReader 
      var file = event.target.files[0]
      var task = tasksRef.child(this.task['.key']).child('images')
      var reader = new FileReader()
      reader.onload = function(e){
        task.push(e.target.result)
      }
      reader.readAsDataURL(file)
    },
    addComment(){
      var newComment = prompt("What is the comment you would like to add?")
      //tasksRef.child(this.task['.key']).child('comments').child(""+newComment+"").setValue(newComment) doesn't work rip
      tasksRef.child(this.task['.key']).child('comments').push(newComment)
    },
    addTodo(){
      var newtodo = prompt("What is the hashtag you would like to add?")
      tasksRef.child(this.task['.key']).child('todos').push(newtodo)
    },
    addUser(){
      var newUser = prompt("Who would you like to add to this card?")
      var users = db.ref('users')
      var userArray = []
      //makes an array of all users to check the existence of the user 
      users.on('value', function(snapshot){
        snapshot.forEach(function(user){
          var user = user.val()
          userArray.push(user)
        })
      })
      // checks if the user's name is valid
      var nameCheck = userArray.filter(user => user.name == newUser)
      if (nameCheck.length > 0){
        tasksRef.child(this.task['.key']).child('users').push(nameCheck[0])
      }
      else{
        alert("Sorry, that user doesn't exist!")
      }
    },
    //the 4 methods below can't be condensed into one removeItem(item) because the query is different for each
    removeImage(image){
      var query = tasksRef.child(this.task['.key']).child('images')
      query.once('value', function(snapshot){ 
        snapshot.forEach(function(itemSnapshot) {
          if (itemSnapshot.val() == image)
           itemSnapshot.ref.remove()
       }) 
      })
    },
    removeUser(user){
      var query = tasksRef.child(this.task['.key']).child('users').orderByChild('name').equalTo(user.name)
      query.once('value', function(snapshot){
        snapshot.forEach(function(itemSnapshot) {
         itemSnapshot.ref.remove()
       }) 
      })
    },
    removeComment(comment){
      var query = tasksRef.child(this.task['.key']).child('comments')
      query.once('value', function(snapshot){ 
        snapshot.forEach(function(itemSnapshot) {
          if (itemSnapshot.val() == comment)
           itemSnapshot.ref.remove()
       }) 
      })
    },
    removeTodo(todo){
      var query = tasksRef.child(this.task['.key']).child('todos')
      query.once('value', function(snapshot){ 
        snapshot.forEach(function(itemSnapshot) {
          if (itemSnapshot.val() == todo)
           itemSnapshot.ref.remove()
       }) 
      })
    }
  }
}
</script>

<style scoped>
/* Bootstrap has a default display: none on modal classes, so this forces it to appear and it toggles based on Vue instead */
.modal{
  display: block;
  font-size: .8em;
}

img{
  max-width: 9.375em;
  max-height: 9.375em;
}

h6 {
  display: inline;
}

.edit-buttons{
  float:right;
}

.delete-buttons {
  margin-right: 1em;
}

.profile-pic {
  display: inline;
  object-fit: cover;
  overflow: hidden;
  height: 2.5em;
  width: 2.5em;
  border-radius: 50%;
  border-spacing: 2.5em;
}
</style>
