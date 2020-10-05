<template>
  <div class="modal" v-show="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Change the {{ this.info }}</h3>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" v-if="!data.length">
          <div class="row-fluid">
            <div class="col-xs-12">
              <h5>Currently, the {{ this.info }} is "{{ this.value }}".</h5>
              <input v-model="newVal" class="form-control form-row" placeholder="Enter the new value">
              <button class="btn btn-success" @click="submit" :disabled="!newVal">Submit</button>
            </div>
          </div>
        </div>
        <div v-else class="modal-body">
          <div class="row-fluid">
            <div class="col-xs-12">
              <h5>Options:</h5>
              <ul>
                <li v-for="category in this.data" :style="{ color: category.color }">
                  <input type="radio" name="category" v-model="newVal" :value="category['.key']"> {{  category.name  }}
                </li>
              </ul>
              <button class="btn btn-success" @click="submit" :disabled="!newVal">Submit</button>
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
      newVal: '',
    }
  },
  props: ['info', 'value', 'show', 'data'],
  methods: {
    closeModal(){
      this.$emit('close')
    },
    submit(){
      if (this.newVal != this.value){
        this.$emit('edit-details', {info: this.info, val: this.newVal})
      }
    }
  }
}
</script>

<style scoped>
  button{
    margin-top: 1em;
  }
  .modal {
    display: block;
  }
  .form-row {
    margin-bottom: 1em;
  }

</style>
