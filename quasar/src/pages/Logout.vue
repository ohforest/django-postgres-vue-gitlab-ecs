<template>
  <base-page>
    <base-btn @click.native="logout">Logout</base-btn>
  </base-page>
</template>

<script>
export default {
  methods: {
    logout() {
      const vm = this;
      this.$axios.post("/api/logout/").then(() => {
        localStorage.removeItem("authenticated");
        vm.$router.push("/");
        // window.location.reload();
      });
    },
  },
};
</script>

<style scoped></style>
