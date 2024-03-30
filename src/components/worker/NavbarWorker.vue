<template>
  <div>
    <b-navbar id="navbar" toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand href="/worker-home"
          ><img src="../../assets/logo.png" class="logo" alt="logo"
        /></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/admin-services">Servicios</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>Trabajador</em>
              </template>
              <b-dropdown-item href="/worker-profile">Perfil</b-dropdown-item>
              <b-dropdown-item @click="cerrarSesion"
                >Cerrar Sesión</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "NavbarAdmin",
  methods: {
    cerrarSesion() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#navbar {
  background-color: #ae0505 !important;
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
</style>
