<template>
  <div class="modal" v-show="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Create a Recipe</h3>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row-fluid">
            <div class="col-xs-12">
              <input v-model="name" type="text" class="form-control form-row" placeholder="Name" required>
              <input v-model="description" type="text" class="form-control form-row" placeholder="Description" required>
              <input v-model="cooktime" type="text" class="form-control form-row" placeholder="Cook Time" required>
              <input v-model="preptime" type="text" class="form-control form-row" placeholder="Prep Time" required>
              <button class="btn btn-success" @click="createRecipe" :disabled="!name || !description || !cooktime || !preptime">Submit</button>
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
        description: '',
        cooktime: '',
        preptime: '',
        directions: [],
        ingredients: []
      }
    },
    props: ['show', 'author'],
    methods: {
      closeModal(){
        this.$emit('close')
      },
      createRecipe() {
          this.$emit('add-recipe', {RecipeName : this.name, description: this.description, author: this.author, ReviewCount: 0, })
          this.name = ''
          this.description = ''
          this.cooktime = ''
          this.preptime = ''
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