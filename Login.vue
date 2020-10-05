<template>
  <div class="modal" v-show="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Sign In</h3>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row-fluid">
            <div class="col-xs-12">
              <input v-model="signin" class="form-control form-row" placeholder="Enter name or email">
              <input v-model="signinpass" class="form-control form-row" type="password" placeholder="Enter password">
              <button class="btn btn-success" @click="login">Submit</button>
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
      signin: '',
      signinpass: ''
    }
  },
  props: ['users', 'show'],
  methods: {
    closeModal(){
      this.$emit('close')
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
  }
}
</script>

<style scoped>

  button{
    margin-top: 1em;
  }

/* 
img{
  max-width: 18.750em;
  max-height: 18.750em;
} */

  .modal {
    display: block;
  }
  .form-row {
    margin-bottom: 1em;
  }

</style>
