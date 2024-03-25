<template>
  <div>
    <b-navbar toggleable="lg" variant="dark" class="bg-dark">
      <b-navbar-brand href="#"><img src="../../assets/logo.png" class="logo" alt="logo"></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="my-1">

          <b-nav-item href="#" @click="goToServices" ><p class="itemsM">Servicios</p ></b-nav-item>
          <b-nav-item href="#" @click="goToAdmins" ><p class="itemsM">Administradores</p ></b-nav-item>
          <b-nav-item href="#" @click="goToWorkers" ><p class="itemsM">Trabajadores</p ></b-nav-item>
          <b-nav-item href="#" @click="goToPackages" ><p class="itemsM">Paquetes</p ></b-nav-item>
          <b-nav-item href="#" @click="goToRequest" ><p class="itemsM">Solicitudes</p ></b-nav-item>

          <b-nav-item-dropdown text="User" right class="ml-auto">

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
      this.$router.push('/admin-servicios');
    },
    goToAdmins() {
      this.$router.push('/admin-admins');
    },
    goToWorkers() {
      this.$router.push('/admin-trabajadores');
    },
    goToPackages() {
      this.$router.push('/admin-paquetes');
    },
    goToRequest() {
      this.$router.push('/admin-solicitudes');
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

div{
  width: 100%;
}

</style>

