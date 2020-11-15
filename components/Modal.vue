<template lang="html">
  <div class="modal" v-show="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4>{{ recipe.RecipeName }}</h4>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <h6>Author:</h6>
              <p> {{  recipe.Author  }}</p>
              <h6>Cook Time:</h6>
              <p>  {{  recipe.CookTime  }}</p>
            </div>
            <div class="col-6">
              <h6>Prep Time:</h6>
              <p>  {{  recipe.PrepareTime  }}</p>
              <h6>Total Time:</h6>
              <p> {{  recipe.TotalTime  }}</p>
            </div>
          </div>
          <div class="row-fluid">
            <div class="col-xs-3">
              <h6>Required Ingredients: </h6>
              <ul>
                <li v-for="ing in recipe.Ingredients">
                  {{  ing  }}
                </li>
              </ul>
            </div>
            <div class="col-xs-3">
              <h6>Directions: </h6>
              <ul>
                <li v-for="dir in recipe.Directions">
                  {{  dir  }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['recipe', 'show'],
  data: function(){
    return {
    }
  },
  methods: {
    closeModal(){
      this.$emit('close')
    },
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
