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
              <input
                v-model="name"
                type="text"
                class="form-control form-row"
                placeholder="Name"
                required
              />
              <input
                v-model="preptime"
                type="text"
                class="form-control form-row"
                placeholder="Prep Time"
                required
              />
              <input
                v-model="cooktime"
                type="text"
                class="form-control form-row"
                placeholder="Cook Time"
                required
              />
              <ul>
                <li v-for="(i, index) in this.ingredients" :key="index">
                  <p>{{ i }}</p>
                </li>
              </ul>
              <input
                v-model="ingredientbox"
                type="text"
                class="form-control form-row"
                placeholder="Type ingredient names one by one and hit enter"
                @keyup.enter="addIng"
                required
              />
              <ul>
                <li v-for="(i, index) in this.directions" :key="index">
                  <p>{{ i }}</p>
                </li>
              </ul>
              <input
                v-model="directionbox"
                type="text"
                class="form-control form-row"
                placeholder="Type directions one by one and hit enter"
                @keyup.enter="addDir"
                required
              />
              <label for="picuploader">Upload an Image:</label>
              <input type="file" id="picuploader" accept="image/png, image/jpeg, image/jpg" @change="fileUpload">
            </div>
          </div>
          <div class="row-fluid">
            <div class="col-xs-12">
              <button
                class="btn btn-success"
                @click="createRecipe"
                :disabled="btnDisabled"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      name: "",
      cooktime: "",
      preptime: "",
      ingredientbox: "",
      directionbox: "",
      directions: [],
      ingredients: [],
      photo: null,
    };
  },
  props: ["show", "author"],
  computed: {
    btnDisabled() {
      return (
        !this.name ||
        !this.cooktime ||
        !this.preptime ||
        !this.ingredients ||
        !this.directions ||
        !this.photo
      );
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
      (this.name = ""),
        (this.cooktime = ""),
        (this.preptime = ""),
        (this.ingredientbox = ""),
        (this.directionbox = ""),
        (this.directions = []),
        (this.ingredients = []);
    },
    createRecipe() {
      this.$emit("add-recipe", {
        RecipeName: this.name,
        Author: this.author,
        ReviewCount: 0,
        CookTime: this.cooktime,
        PrepareTime: this.preptime,
        Directions: this.directions,
        Ingredients: this.ingredients,
        TotalTime: this.cooktime + this.preptime,
        RecipeID: -1,
        RecipePhoto: this.photo,
        rawFood: this.ingredients,
      });
      this.closeModal();
    },
    addIng() {
      this.ingredients.push(this.ingredientbox);
      this.ingredientbox = '';
    },
    addDir() {
      this.directions.push(this.directionbox);
      this.directionbox = '';
    },
    fileUpload(event) {
      // adds an image to a task using FileReader
      var self = this
      const file = event.target.files[0];
      const reader = new FileReader();
      let pic = null
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        self.photo = e.target.result;
      };
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 1em;
}
img {
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
