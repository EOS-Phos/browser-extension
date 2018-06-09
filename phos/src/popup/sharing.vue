<template>
  <div>
    <h2>Login</h2>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
  </div>
</template>

<script>
console.log('LOGIN')

export default {
  data() {
    return {
      email: "joe@example.com",
      pass: "",
      error: false
    };
  },
  methods: {
    login() {
      this.$router.replace(this.$route.query.redirect || "/");
    }
  }
};
</script>

<style>
.error {
  color: red;
}
</style>