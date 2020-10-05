<template>
  <div class="modal" v-show="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Enter a new name for "{{ this.item.name }}"</h5>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row-fluid">
            <div class="col-xs-12">
              <input v-model="name" class="form-control form-row" placeholder="Name goes here">
              <button class="btn btn-success" @click="edit" :disabled="!name">Submit</button>
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
      name: ''
    }
  },
  props: ['item','show'],
  methods: {
    closeModal(){
      this.$emit('close')
    },
    edit(){
      this.$emit('edit-name', {item: this.item, val: this.name})
      this.name = ''
    }
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
