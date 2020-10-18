<template>
  <div class="modal" v-show="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Register</h3>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row-fluid">
            <div class="col-xs-12">
              <input v-model="name" type="text" class="form-control form-row" placeholder="Name*" required>
              <input v-model="email" type="email" class="form-control form-row" placeholder="Email*" required>
              <input v-model="password" type="password" class="form-control form-row" placeholder="Password*" required>
              <label class="btn btn-default btn-secondary form-row">
                Choose an Image*
                <input type="file" @change="fileUpload($event)" class="custom-file-input">
              </label>
              <label class="form-row"><input type="checkbox" class = "check">
               I would like to receive emails from Collab</label>
              <label class="form-row"><input type="checkbox" class = "check"> I have read and agree to the <u> Terms of Service</u></label>
              <br>
              <button class="btn btn-success" @click="createUser">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data: function() {
      return {
        name: '',
        email: '',
        image: '',
        password: '',
      }
    },
    props: ['users', 'show'],
    methods: {
      closeModal(){
        this.$emit('close')
      },
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
    }
  }
</script>

<style scoped>

  button{
    margin-top: 1em;
  }

  img{
    max-width: 30%;
    max-height: 30%;
    border: 50%;
  }

  .check {
    margin-right: 1em;
  }

  .modal {
    display: block;
  }

  .form-row {
    margin-bottom: 1em;
  }

  label {
    display: inline-block;
  }

</style>