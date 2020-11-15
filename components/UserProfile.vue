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
              <p>Name: {{ user.name }} </p>
              <p>Email: {{ user.email }} </p>
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
      email: "",
    };
  },
  props: ["user", "show"],
  methods: {
    closeModal() {
      this.$emit("close");
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