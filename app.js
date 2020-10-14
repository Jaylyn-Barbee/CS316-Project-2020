// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
var db = firebase.initializeApp(firebaseConfig).database();

// global reference to remote data
var ingredientsTable = db.ref('ingredientsList');
var recipeTable = db.ref('recipeList');
var userTable = db.ref('usersList');

// connect Firebase to Vue
Vue.use(VueFire);

new Vue({
  el: '#my-app',
  data: {
    //these two are not doubling the firebase backgroundColor or backgroundImage bc CSS binding only works on the event.target.value, not the snapshot
  
  },
  firebase: {
    ingredients: ingredientsTable,
    users: userTable,
    recipes: recipeTable
  },
  components: {
  },
  computed: {
  },
  methods: {
    
  }
})
