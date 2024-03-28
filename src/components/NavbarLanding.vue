<template>
  <div id="navbar">
    <img src="../assets/logo.png" class="logo" />
    <b-button @click="goToLogin">Iniciar sesión</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
#navbar {
  background-color: #ae0505;
  height: 10vh;
  width: 100%;
  margin: 0;
  padding: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.logo {
  width: 55px;
  height: 55px;
}

.btn {
  padding: 8px 25px;
  background-color: white;
  color: #2d2a2a;
  border-radius: 10px;
  border: none;
  transition: all 0.2s ease;
  font-weight: 700;
}

.btn:hover {
  background-color: #2d2a2a;
  color: white;
}
</style>
