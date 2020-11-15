<template>
  <div class="modal" v-show="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3>User Profile</h3>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row-fluid">
            <div class="col-xs-12">
              <img :src="user.image" class="propic" alt="" height = "200" length = "200" >
            </div>
          </div>
          <div class="row-fluid">
              <p>Name: {{ user.name }} </p>
              <button type="button" class="btn btn-sm" @click="editName(user)">
              <i class="fa fa-edit"></i>
              </button>
          </div>
          <div class="row-fluid">
              <p>Email: {{ user.email }} </p>
              <button type="button" class="btn btn-sm" @click="editEmail(user)">
              <i class="fa fa-edit"></i>
              </button>
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
      email: "",
    };
  },
  props: ["user", "show"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
    editName(user) {
      var newName = prompt(
        "What would you like to rename user ''" + user.name + "'?",
        user.name
      );
      if (newName != null && newName != "") {
        this.$emit("edit-info", [newName, "name"]);
      }
    },
    editEmail(user) {
      var newEmail = prompt(
        "Would you like to change your email? It is currently " +
          user.email +
          ".",
        user.email
      );
      if (newEmail != null && newEmail != "") {
        this.$emit("edit-info", [newEmail, "email"]);
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 1em;
}
.modal {
  display: block;
}
.form-row {
  margin-bottom: 1em;
}
</style>