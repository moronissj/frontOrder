<template>
  <div id="navbar">
    <img src="../assets/logo.png" class="logo">
    <b-button @click="goToLogin">Iniciar sesión</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },

  },
};
</script>

<style scoped>
#navbar{
  background-color:  #AE0505;
  height: 13vh;
  width: 100%;
  margin: 0;
  padding: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo{
  height: 7.5vh;
  width: 7.5vh;
}

.btn{
  width: 25vh;
}
</style>
