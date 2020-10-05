// set up for Firebase
var config = {
  apiKey: "AIzaSyBrSVlVsnrLJQyrZR8udpU86HmLOqsFChI",
  authDomain: "trello-clone-d96e6.firebaseapp.com",
  databaseURL: "https://trello-clone-d96e6.firebaseio.com",
  projectId: "trello-clone-d96e6",
  storageBucket: "trello-clone-d96e6.appspot.com",
  messagingSenderId: "839860356924"
}
// global access to initialized app database
var db = firebase.initializeApp(config).database()
// global reference to remote data
var usersRef = db.ref('users')
var listsRef = db.ref('myLists')
var loggedInRef = db.ref('loggedinUser')
var bgColRef = db.ref('backgroundColor')
var bgImgRef = db.ref('backgroundImage')
var tasksRef = db.ref('allTasks')
var categoriesRef = db.ref('categories')
var datesRef = db.ref('filteredDates')

//create an array of checked categories at pageload so that by default, every category is filtered in
var checkedCategories = []
categoriesRef.once('value', function(snapshot){
  var keys = Object.keys(snapshot.val())
  for (var i = 0; i < keys.length; i++){
    checkedCategories.push(keys[i])
  }
})
// connect Firebase to Vue
Vue.use(VueFire)
//Main Vue instance for the app
new Vue({
  el: '#my-app',
  data: {
    //these two are not doubling the firebase backgroundColor or backgroundImage bc CSS binding only works on the event.target.value, not the snapshot
    backgroundColorVal: '',
    backgroundImageVal: '',
    checkedCategories: checkedCategories,
    newList: '',
    showSignIn: false,
    showRegister: false,
    showCategories: false,
  },
  firebase: {
    myLists: listsRef.orderByChild('index'),
    users: usersRef,
    // binds the below three items as objects instead of as arrays, the firebase default
    loggedInUser: {source: loggedInRef, asObject: true},
    backgroundColor: {source: bgColRef, asObject: true},
    backgroundImage: {source: bgImgRef, asObject: true},
    allTasks: tasksRef,
    categories: categoriesRef
  },
  components: {
    'add-list': httpVueLoader('AddList.vue'),
    'list': httpVueLoader('List.vue'),
    'login': httpVueLoader('Login.vue'),
    'register': httpVueLoader('Register.vue'),
    'categories': httpVueLoader('Categories.vue')
  },
  computed: {
    lengthLists: function(){
      return this.myLists.length
    },
  },
  methods: {
    //These methods are pretty straightforward based on the name, just updating firebase values based on user changes
    createNewList() {
      if (this.newList === ''){
        alert("Must submit at least one character!")
      }
      else{
        this.$firebaseRefs.myLists.push({name : this.newList, index: this.lengthLists})
        this.newList = ''
      }
    },
    createUser(user){
      this.showRegister = false
      this.$firebaseRefs.users.push(user)
      this.$firebaseRefs.loggedInUser.child('name').set(user.name)
      this.$firebaseRefs.loggedInUser.child('email').set(user.email)
      this.$firebaseRefs.loggedInUser.child('image').set(user.image)
    },
    openSignIn() {
      this.showSignIn = true
    },
    closeSignIn() {
      this.showSignIn = false
    },
    openRegister() {
      this.showRegister = true
    },
    closeRegister() {
      this.showRegister = false
    },
    openCategories() {
      this.showCategories = true
    },
    closeCategories() {
      this.showCategories = false
    },
    login(user){
      this.$firebaseRefs.loggedInUser.child('name').set(user.name)
      this.$firebaseRefs.loggedInUser.child('email').set(user.email)
      this.$firebaseRefs.loggedInUser.child('image').set(user.image)
      this.showSignIn = false
    },
    logout(){
      this.$firebaseRefs.loggedInUser.child('name').set('')
      this.$firebaseRefs.loggedInUser.child('email').set('')
      this.$firebaseRefs.loggedInUser.child('image').set('')
    },
    deleteList(list){
      this.$firebaseRefs.myLists.child(list['.key']).remove()
    },
    editListName(array){
      var list = array[0]
      var newName = array[1]
      this.$firebaseRefs.myLists.child(list['.key']).child('name').set(newName)
    },
    createCategory(category){
      this.$firebaseRefs.categories.push(category)
    },
    editCategory(stuff){
      const { category, name, color } = stuff
      this.$firebaseRefs.categories.child(category['.key']).child('name').set(name)
      this.$firebaseRefs.categories.child(category['.key']).child('color').set(color)
    },
    moveListLeft(list){
      var origIndex = this.myLists.indexOf(list)
      var theList = this.myLists.splice(this.myLists.indexOf(list), 1)
      this.myLists.splice(origIndex - 1, 0, theList[0])
    },
    moveListRight(list){
      var origIndex = this.myLists.indexOf(list)
      var theList = this.myLists.splice(this.myLists.indexOf(list), 1)
      this.myLists.splice(origIndex + 1, 0, theList[0])
    },
    createTask(task){
      this.$firebaseRefs.allTasks.push(task)
    },
    deleteTask(task){
      this.$firebaseRefs.allTasks.child(task['.key']).remove()
    },
    moveTaskLeft(task){
       var key = task.list
      // get that list's index using the key
      var query = db.ref('myLists').child(key+'').child('index')
      var index
      query.once('value', function(snapshot){
        index = snapshot.val()
      })
      // get the new list for the object using the current list's index
      var query = db.ref('myLists').orderByChild('index').equalTo(index - 1)
      var newListKey
      query.once('value', function(snapshot){
        snapshot.forEach(function(itemSnapshot) {
         newListKey = Object.keys(snapshot.val())[0]
       })
      })
      //set the task's list to the new list
      tasksRef.child(task['.key']).child('list').set(newListKey)
    },
    moveTaskRight(task){
      var key = task.list
      // get that list's index using the key
      var query = db.ref('myLists').child(key+'').child('index')
      var index
      query.once('value', function(snapshot){
        index = snapshot.val()
      })
      // get the new list for the object using the current list's index
      var query = db.ref('myLists').orderByChild('index').equalTo(index + 1)
      var newListKey
      query.once('value', function(snapshot){
        snapshot.forEach(function(itemSnapshot) {
         newListKey = Object.keys(snapshot.val())[0]
       })
      })
      //set the task's list to the new list
      tasksRef.child(task['.key']).child('list').set(newListKey)
    },
    backgroundImageUpload(event){
      //FileReader handles the uploading of the file, when it loads it sets the Firebase background image
      var file = event.target.files[0]
      var vm = this
      var reader = new FileReader()
      reader.onload = function(e){
        vm.$firebaseRefs.backgroundImage.set(e.target.result)
        vm.$firebaseRefs.backgroundColor.set('')
        vm.backgroundColorVal = ''
        var image = db.ref('backgroundImage')
        var imageVal
        image.on('value', function(snapshot){
          imageVal = snapshot.val()
        })
        vm.backgroundImageVal = imageVal
        //this.$firebaseRefs.backgroundImage.set(imageVal) doesn't work because the v-style binding doesn't take objects 
      }
      reader.readAsDataURL(file)
    },
    setColor(event){
      // sets the background color of the project page
      this.$firebaseRefs.backgroundColor.set(event.target.value)
      var color = db.ref('backgroundColor')
      var colorVal
      color.on('value', function(snapshot){
        colorVal = snapshot.val()
      })
      this.backgroundColorVal = colorVal
      this.backgroundImageVal = ''
      this.$firebaseRefs.backgroundImage.set('')
    }
  }
})
