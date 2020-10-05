<template>
  <div class="modal" v-show="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Categories & Filters</h3>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row-fluid">
            <div class="col-xs-12">
              <h5>Current Categories</h5>
              <span  v-for="category in categories" :style="{ color: category.color }">
                {{  category.name  }}
                <button type="button" class="btn-xs btn-default btn-light" @click="editCategory(category)" title="Edit">
                  <i class="fa fa-edit" style="color: #0275d8" aria-hidden="true" ></i>
                </button>
              </span>
            </div>
          </div>
            <hr>
            <div class="row-fluid">
              <div class="col-xs-12">
                <h5>Filters</h5>
                <span v-for="category in categories">
                <label style="margin-right: 1.5em;">
                  {{  category.name  }}

                  <input :id="category['.key']" :value="category['.key']" type="checkbox" v-model="inputChecked">
                  </label>
              </span>
              </div>
            </div>
            <hr>
            <div class="row-fluid">
              <div class="col-xs-12">
                <h5>Create a New Category</h5>
                <input v-model="newCat" class="form-control" placeholder="Enter category name">
              </div>
            </div>
            <div class="row-fluid">
              <div class="col-xs-12">
                <label class="btn btn-primary" style="margin-top: 0.5em;">Set Category Color
                  <input type="color" value="#ff0000" @change="setColor($event)" hidden>
                </label>
              </div>
              <div class="col-xs-12">
                <button type="button" class="btn btn-default btn-success" :disabled="!newCat" @click="createCategory">Submit</button>
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
      inputChecked: this.checkedcategories,
      newCat: '',
      color: '#000000'
    }
  },
  props: ['categories', 'checkedcategories', 'show'],
  methods: {
    closeModal(){
      this.$emit('close')
    },
    createCategory(){
      this.$emit('create-cat', {name: this.newCat, color: this.color})
      this.newCat = ''
      this.color = '#000000'
    },
    editCategory(category){
      var newName = prompt("What is the new name for this category?", category.name)
      //failsafe to stop users from making blank category names
      if (newName.length == 0 || newName == null){
        newName = category.name
      }
      var newColor = prompt("What is the new color for this category? Please enter it as a hex value with a #", category.color)
      //makes sure color is valid hex, then updates firebase
      if (newColor.charAt(0) === '#' && newColor.length === 7){
        this.$emit('edit-cat', {category: category, name: newName, color: newColor})
      }
      else alert("Your color is formatted wrong!")
    },
    setColor(event){
      this.color = event.target.value
    }
  },
  watch: {
    inputChecked(val) {
      this.$emit('input', val);
    }
  }
}
</script>

<style scoped>

.modal {
  display: block;
}

li{
  display: inline;
}


</style>
