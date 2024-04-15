<template>
  <div class="app">
    <div class="header">
      <img src="../assets/nelPrro.jpg" alt="" />
      <h1>No autorizado</h1>
      <div class="icon-container">
        <b-icon
          icon="lock-fill"
          animation="cylon"
          variant="danger"
          font-scale="4"
        ></b-icon>
        <b-icon
          icon="lock-fill"
          animation="cylon"
          variant="danger"
          font-scale="4"
        ></b-icon>
        <b-icon
          icon="lock-fill"
          animation="cylon"
          variant="danger"
          font-scale="4"
        ></b-icon>
      </div>
      <br />
    </div>
    <div class="content">
      <h4>
        Este acceso está restringido o la acción que intentaste realizar no está
        permitida. <br />
        Por favor, verifica que tus permisos sean los adecuados para esta
        operación. <br />
        <a href="/">Regresar al Home</a>
      </h4>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header,
.content {
  width: 80%;
  text-align: center;
}
.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
h1 {
  color: #ae0505;
}

img {
  margin-top: 5vh;
  width: 25%;
  height: 25%;
}
</style>
