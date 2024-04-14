<template>
  <div>
    <b-navbar id="navbar" toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand href="/">
          <img src="../assets/logo.png" class="logo" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav style="justify-content: end">
          <b-navbar-nav>
            <b-nav-item href="/reviews"
              ><b-button style="width: 150px">Ver reseñas</b-button></b-nav-item
            >

            <b-nav-item href="/login"
              ><b-button style="width: 180px"
                >Iniciar Sesión</b-button
              ></b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {};
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

.btn {
  padding: 8px 25px;
  background-color: white;
  color: #2d2a2a;
  border-radius: 10px;
  border: none;
  transition: all 0.2s ease;
  font-weight: 700;
  width: 80%;
}

.btn:hover {
  background-color: #2d2a2a;
  color: white;
}
</style>
