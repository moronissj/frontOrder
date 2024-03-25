<template>
  <div>
    <b-navbar toggleable="lg" variant="dark" class="bg-dark">
      <b-navbar-brand href="#"><img src="../../assets/logo.png" class="logo" alt="logo"></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="my-1">

          <b-nav-item href="#" @click="goToServices" ><p class="itemsM">Servicios</p ></b-nav-item>
            <b-nav-item href="#" @click="goToHistory"><p class="itemsM">Historial de compras</p ></b-nav-item>

          <b-nav-item-dropdown text="User" right class="ml-auto itemsM"> <!--HAZ QUE ESTE EL TEXT SEA BLNACO-->
            <b-dropdown-item href="#" @click="goToLogin">Cerrar sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToServices() {
      this.$router.push('/servicios');
    },
    goToHistory() {
      this.$router.push('/historial');
    },

  },
};
</script>

<style scoped>
.logo {
  height: 7.5vh;
  width: 7.5vh;
}

/* Ensure all text in the navbar is white */
.navbar-dark .b-navbar-nav .nav-link,
.navbar-dark .b-navbar-brand,
.navbar-dark .b-nav-item-dropdown > a,
.navbar-dark .b-nav-item-dropdown .dropdown-toggle,
.navbar-dark .b-nav-item-dropdown .dropdown-item {
  color: white !important;
}

/* You may not need this if the above works, but just in case */
.itemsM {
  color: white !important;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

/* Other existing styles */
/* ... */
.bg-dark {
  background-color: #AE0505 !important;
}

</style>

