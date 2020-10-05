<template>
  <div class="modal" v-show="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Create a Task</h3>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row-fluid">
            <div class="col-xs-12">
              <input v-model="name" type="text" class="form-control form-row" placeholder="Name" required>
              <input v-model="description" type="text" class="form-control form-row" placeholder="Description" required>
              <ul>
                <li v-for="category in this.categories" :style="{ color: category.color }">
                  <input type="radio" name="category" v-model="cat" :value="category"> {{  category.name  }}
                </li>
              </ul>
              <button class="btn btn-success" @click="createTask" :disabled="!name || !description || !cat">Submit</button>
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
        cat: '',
      }
    },
    props: ['show', 'categories'],
    methods: {
      closeModal(){
        this.$emit('close')
      },
      createTask() {
          this.$emit('create-task', {name : this.name, description: this.description, category: this.cat['.key']})
          this.name = ''
          this.description = ''
          this.cat = ''
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