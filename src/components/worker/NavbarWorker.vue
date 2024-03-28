<template>
  <div>
    <b-navbar toggleable="lg" variant="dark" class="bg-dark">
      <b-navbar-brand href="#"
        ><img src="../../assets/logo.png" class="logo" alt="logo"
      /></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="my-1">
          <b-nav-item href="#" @click="goToSolicitudes"
            ><p class="itemsM">Solicitudes</p></b-nav-item
          >
        </b-navbar-nav>

        <b-nav-item-dropdown right class="ml-auto itemsM2">
          <!-- Utiliza el slot "button-content" para personalizar el contenido del dropdown -->
          <template #button-content>
            <img src="../../assets/buffe.PNG" class="user-avatar" alt="User" />
          </template>
          <b-dropdown-item @click="goToAccount">Cuenta</b-dropdown-item>
          <b-dropdown-item @click="goToLogin">Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    goToSolicitudes() {
      this.$router.push("/solicitudes-trabajador");
    },

    goToAccount() {
      this.$router.push("/perfil-trabajador");
    },

    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
.logo {
  height: 7.5vh;
  width: 7.5vh;
}
.user-avatar {
  height: 7.5vh; /* Ajusta esto según el tamaño que desees */
  width: 7.5vh;
  object-fit: cover;
  border-radius: 50%; /* Esto creará una imagen redonda si es cuadrada */
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
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

.itemsM2 {
  margin-left: 66%;
  margin-bottom: 2vh;
}

@media (max-width: 800px) {
  .itemsM2 {
    margin-left: 0;
  }
}

/* Other existing styles */
/* ... */
.bg-dark {
  background-color: #ae0505 !important;
}
</style>
