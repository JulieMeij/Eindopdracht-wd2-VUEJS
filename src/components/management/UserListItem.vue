<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2 black-text">
    <div class="card h-100">
      <div class="card-body">
        <div class="float-start">
          <p>{{ user.username }}</p>
          <p>{{ user.points }}</p>
          <p>{{ user.type }}</p>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-warning">Edit</button>&nbsp;&nbsp;
        <button class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserListItem",
  props: {
    user: Object,
  },
  methods: {
    deleteUser(id) {
      axios.delete("http://localhost/users/" + id).then((response) => {
        console.log(response);
        if (response.status == 200) this.$emit("update");
      });
    },
    editUser(id) {
      this.$router.push("/users/" + id);
    },
  },
};
</script>

<style>
.black-text {
    color: black;
}
</style>