<template>
  <div class="col-lg-12">
    <div class="row">
      <div class="col-lg-3" v-show="loggedin.name.length == 0">
        <h3>Sign In</h3>
        <input v-model="signin" class="form-control" placeholder="Enter name or email">
        <input v-model="signinpass" class="form-control" type="password" placeholder="Enter password">
        <button class="btn btn-primary" @click="login">Submit</button>
      </div>
      <div class="col-lg-3" v-show="loggedin.name.length > 0">
        <div class="row">
          <h3>Welcome, {{ loggedin.name }}</h3>
          <!-- <button type="button" class="btn btn-sm" @click="editName(loggedin)">
            <i class="fa fa-edit"></i>
          </button> -->
        </div>
        <div class="row">
          <p>Email address: {{loggedin.email}}</p>
          <!-- <button type="button" class="btn btn-sm" @click="editEmail(loggedin)">
            <i class="fa fa-edit"></i> 
          </button> -->
        </div>
        <div class="row">
          <img :src="loggedin.image"/>
          <!-- <label class="btn btn-default btn-secondary">Change Image
            <input type="file" @change="editPic($event)" class="custom-file-input">
          </label> -->
        </div>
        <div class="row">
          <button class="btn btn-danger" @click="$emit('logout')">Logout</button>
        </div>
      </div>
      <div class="col-lg-3">
        <h3>Create a User</h3>
        <input v-model="name" type="text" class="form-control" placeholder="Name" required>
        <input v-model="email" type="email" class="form-control" placeholder="Email" required>
        <input v-model="password" type="password" class="form-control" placeholder="Password" required>
        <label class="btn btn-default btn-secondary">
          Choose an Image
          <input type="file" @change="fileUpload($event)" class="custom-file-input">
        </label>
        <button class="btn btn-primary" @click="createUser">Submit</button>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      name: '',
      email: '',
      image: '',
      signin: '',
      password: '',
      signinpass: ''
    }
  },
  props: ['users', 'loggedin'],
  methods: {
    createUser() {
      if (this.name === '' || this.email === '' || this.password === '' || this.image === ''){
        alert("All fields are required!")
      }
      else{
        this.$emit('create-user', {name : this.name, email: this.email, password: this.password, image: this.image})
        this.name = ''
        this.email = ''
        this.password = ''
      }
    },
    fileUpload(event){
      //uses the FileReader to load an image for the profile picture, this method is identical to every other image upload in this app
      var file = event.target.files[0]
      var vm = this
      var reader = new FileReader()
      reader.onload = function(e){
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    login(){
      //checks to see if the signin is valid, then logs the user in if it is
      var nameCheck = this.users.filter(user => user.name == this.signin)
      var emailCheck = this.users.filter(user => user.email == this.signin)
      if (nameCheck.length > 0){
        if (nameCheck[0].password === this.signinpass){
          this.$emit('login', nameCheck[0])
        }
        this.signin = ''
        this.signinpass = ''
      }
      else if (emailCheck.length > 0){
        if (emailCheck[0].password === this.signinpass){
          this.$emit('login', emailCheck[0])
        }
        this.signin = ''
        this.signinpass = ''
      }
      else{
        alert("Sorry, your credentials don't match!")
        this.signin = ''
        this.signinpass = ''
      }
    },
    /* editName(user){
      var newName = prompt("What would you like to rename user " + user.name + "?", user.name)
      if (newName != null && newName != ""){
        this.$emit('edit-username', newName)
      }
    },
    editEmail(user){
      var newEmail = prompt("Please input a new email address", user.email)
      if (newEmail != null && newEmail != ""){
        this.$emit('edit-email',  newEmail)
      }
    },
    editPic(event){
      var file = event.target.files[0]
      var vm = this
      var reader = new FileReader()
      reader.onload = function(e){
        vm.$emit('edit-pic', e.target.result)
      }
      reader.readAsDataURL(file)
    } */
  }
}
</script>

<style scoped>
div{
  margin-top: 2.5em;
  margin-left: 2em;
}
button{
  margin-top: 1em;
}
img{
  max-width: 18.750em;
  max-height: 18.750em;
}
</style>
