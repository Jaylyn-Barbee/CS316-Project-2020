// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyDULic6juH_JdmWudQ8qECnuD70_nODbWY",
  authDomain: "cs316-g37-2020.firebaseapp.com",
  databaseURL: "https://cs316-g37-2020.firebaseio.com",
  projectId: "cs316-g37-2020",
  storageBucket: "cs316-g37-2020.appspot.com",
  messagingSenderId: "1017331525000",
  appId: "1:1017331525000:web:d59cd3793d88044ff8063d",
  measurementId: "G-L0Q3SWCX9L"
};
// global access to initialized app database
var db = firebase.initializeApp(config).database();
// global reference to remote data
var usersRef = db.ref("users");
var loggedInRef = db.ref("loggedinUser");
var bgColRef = db.ref("backgroundColor");
var bgImgRef = db.ref("backgroundImage");
var ingredientsRef = db.ref("ingredientsList");
var recipesRef = db.ref("recipeList");

// connect Firebase to Vue
Vue.use(VueFire);
//Main Vue instance for the app
new Vue({
  el: "#my-app",
  data: {
    //these two are not doubling the firebase backgroundColor or backgroundImage bc CSS binding only works on the event.target.value, not the snapshot
    backgroundColorVal: "",
    backgroundImageVal: "",
    newList: "",
    searchQuery: "",
    recipeSearch: "",
    showSignIn: false,
    showRegister: false,
    showUserProfile: false,
    showCreateRecipe: false,
    numberOfColumns: 4,
    checkedIngredients: [],
    filteredRecipes: []
  },
  created() {
    this.filteredRecipes = this.recipes;
  },
  firebase: {
    users: usersRef,
    // binds the below three items as objects instead of as arrays, the firebase default
    loggedInUser: { source: loggedInRef, asObject: true },
    backgroundColor: { source: bgColRef, asObject: true },
    backgroundImage: { source: bgImgRef, asObject: true },
    ingredients: ingredientsRef,
    recipes: recipesRef
  },
  components: {
    login: httpVueLoader("./components/Login.vue"),
    register: httpVueLoader("./components/Register.vue"),
    userprofile: httpVueLoader("./components/UserProfile.vue"),
    recipe: httpVueLoader("./components/Recipe.vue"),
    createrecipe: httpVueLoader("./components/CreateRecipe.vue")
    /*'add-list': httpVueLoader('AddList.vue'),
    'list': httpVueLoader('List.vue'),
    'categories': httpVueLoader('Categories.vue') */
  },
  computed: {
    gridStyle() {
      let numberOfColumns = Math.floor(window.screen.width / 450);
      return {
        gridTemplateColumns: `repeat(${numberOfColumns}, minmax(200px, 1fr))`
      };
    },
    filteredIngredients() {
      if (this.searchQuery) {
        return this.ingredients.filter((item) => {
          return (
            item.name
              .toLowerCase()
              .startsWith(this.searchQuery.toLowerCase()) ||
            item.category
              .toLowerCase()
              .startsWith(this.searchQuery.toLowerCase())
          );
        });
      } else {
        return this.ingredients;
      }
    },
    searchRecipes() {
      if (this.recipeSearch) {
        return this.filteredRecipes.filter((item) => {
          return (
            item.RecipeName.toLowerCase().startsWith(
              this.recipeSearch.toLowerCase()
            ) ||
            item.Author.toLowerCase().startsWith(
              this.recipeSearch.toLowerCase()
            )
          );
        });
      } else {
        return this.filteredRecipes;
      }
    }
  },
  watch: {
    checkedIngredients: function (newI, oldI) {
      if (newI.length == 0) {
        this.filteredRecipes = this.recipes;
      } else {
        let filtered = [];
        let recipes = this.recipes;
        for (i = 0; i < recipes.length; i++) {
          if (
            recipes[i].rawFood &&
            recipes[i].rawFood.some(function (item) {
              return newI.indexOf(item) !== -1;
            })
          ) {
            filtered.push(recipes[i]);
          }
        }
        this.filteredRecipes = filtered;
      }
    }
  },
  methods: {
    //These methods are pretty straightforward based on the name, just updating firebase values based on user changes
    createUser(user) {
      this.showRegister = false;
      this.$firebaseRefs.users.push(user);
      this.$firebaseRefs.loggedInUser.child("name").set(user.name);
      this.$firebaseRefs.loggedInUser.child("email").set(user.email);
      this.$firebaseRefs.loggedInUser.child("image").set(user.image);
    },
    openSignIn() {
      this.showSignIn = true;
    },
    closeSignIn() {
      this.showSignIn = false;
    },
    openRegister() {
      this.showRegister = true;
    },
    closeRegister() {
      this.showRegister = false;
    },
    openUserProfile() {
      this.showUserProfile = true;
    },
    closeUserProfile() {
      this.showUserProfile = false;
    },
    editInfo(newInfo) {
      let [newString, type] = newInfo;
      let currName = this.loggedInUser.name;
      let currEmail = this.loggedInUser.email;
      let currPic = this.loggedInUser.image;
      usersRef.once('value', function(snapshot){ 
        snapshot.forEach(function(itemSnapshot) {
          if (itemSnapshot.val().name == currName && itemSnapshot.val().email == currEmail && itemSnapshot.val().image == currPic)
           itemSnapshot.ref.child(type).set(newString);
           loggedInRef.child(type).set(newString);
       }) 
      })
    },
    openCreateRecipe() {
      this.showCreateRecipe = true;
    },
    closeCreateRecipe() {
      this.showCreateRecipe = false;
    },
    addRecipe(rec) {
      recipesRef.push(rec);
    },
    login(user) {
      this.$firebaseRefs.loggedInUser.child("name").set(user.name);
      this.$firebaseRefs.loggedInUser.child("email").set(user.email);
      this.$firebaseRefs.loggedInUser.child("image").set(user.image);
      this.showSignIn = false;
    },
    logout() {
      this.$firebaseRefs.loggedInUser.child("name").set("");
      this.$firebaseRefs.loggedInUser.child("email").set("");
      this.$firebaseRefs.loggedInUser.child("image").set("");
    },
    backgroundImageUpload(event) {
      //FileReader handles the uploading of the file, when it loads it sets the Firebase background image
      var file = event.target.files[0];
      var vm = this;
      var reader = new FileReader();
      reader.onload = function (e) {
        vm.$firebaseRefs.backgroundImage.set(e.target.result);
        vm.$firebaseRefs.backgroundColor.set("");
        vm.backgroundColorVal = "";
        var image = db.ref("backgroundImage");
        var imageVal;
        image.on("value", function (snapshot) {
          imageVal = snapshot.val();
        });
        vm.backgroundImageVal = imageVal;
        //this.$firebaseRefs.backgroundImage.set(imageVal) doesn't work because the v-style binding doesn't take objects
      };
      reader.readAsDataURL(file);
    },
    setColor(event) {
      // sets the background color of the project page
      this.$firebaseRefs.backgroundColor.set(event.target.value);
      var color = db.ref("backgroundColor");
      var colorVal;
      color.on("value", function (snapshot) {
        colorVal = snapshot.val();
      });
      this.backgroundColorVal = colorVal;
      this.backgroundImageVal = "";
      this.$firebaseRefs.backgroundImage.set("");
    }
  }
});
