<script setup>
import NavbarAdmin from './NavbarAdmin.vue';
import Footer from '../../components/Footer.vue';

</script>

<template>
    <div>
      <div class="app">
        <NavbarAdmin/>
      </div>
  
    <div class="banner-container">
      <img src="../../assets/banerAdmin.png" alt="" class="banner-image">

    </div>


    <div class="servicios">     
        <div class="card1" >
            <h3>Administradores</h3>
            <img src="../../assets/administradoresIcon.png" alt="" class="iconService">
            <div>
                <b-button class="btn">Ver más</b-button>
            </div>
        </div>
        <div class="card2">
            <h3>Servicios</h3>
            <img src="../../assets/comidaIcon.png" alt="" class="iconService">
            <div>
                <b-button @click="goToServices" class="btn">Ver más</b-button>
            </div>
        </div>
        <div class="card1">
            <h3>Paquetes</h3>
            <img src="../../assets/paquetesIcon.png" alt="" class="iconService">
            <div>
                <b-button class="btn">Ver más</b-button>
            </div>      
        </div>
        <div class="card2">
            <h3>Comida</h3>
            <img src="../../assets/trabajadoresIcon.png" alt="" class="iconService">
            <div>
                <b-button  class="btn">Ver más</b-button>
            </div>
        </div>

    </div>

    <template>
  <b-button variant="dark" class="notification-button">
    Solicitudes de servicios
    <div  class="notification-badge">6</div>
  </b-button>
</template>
   
    <Footer />
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
      this.$router.push('/admin-workers');
    },
    goToPackages() {
      this.$router.push('/admin-packages');
    },
    goToRequest() {
      this.$router.push('/admin-request');
    },
  },
};
</script>

<style scoped>
body,
h2,
p,
ul,
li {
  margin: 0;
  padding: 0;
}

h1{
    margin: 10vh;
}

h3{
    margin-top: 2.5vh;
}
.card1{
    background-color: #AE0505;
    height: auto;
    width: auto;
    border-radius: 16px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    padding:2.5vh;
    margin-bottom: 5vh;
}

.card2{
    background-color: #2D2A2A;
    height: auto;
    width: auto;
    border-radius: 16px;
    color:white;
    font-family: 'Montserrat', sans-serif;
    padding: 2.5vh;
    margin-bottom: 5vh;
}


img {
  width: 100%;
  height: 75vh;
  margin-bottom: 5vh;
}

.title{margin-top: 1vh;}

.iconService{
    height: 15vh;
    width: 15vh;
}

.servicios{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: 5vh;
    grid-gap: 5vh;
}

.btn{
    background-color: #d9d9d9;
    color:#2D2A2A;
    margin: 2.5vh;
}

.notification-button {
  position: relative;
  padding-right: 5vh; /* Espacio adicional para el distintivo */
  margin: 5vh;
}

.notification-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: 50%; 
  background-color: green;
  color: white;
  width: 5vh;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 800px) { 
  .servicios {
    display: grid;
    grid-template-columns: 1fr; /* Cambia a una sola columna */
    margin: 2.5vh 5%; /* Ajusta el margen para pantallas pequeñas */
    width: 90%;
  }

  h1, h2, h3, h4 {
    text-align: center; /* Centra los títulos */
    margin: 5vh; /* Ajusta el margen superior */
    font-size: 1.5rem; /* Reduce el tamaño del texto para pantallas pequeñas */
  }

  .card1, .card2 {
    width: 90%; /* Aumenta el ancho de las tarjetas para llenar más espacio */
    margin-left: 5%; /* Ajusta los márgenes para centrar las tarjetas */
    margin-right: 5%; /* Asegura que el margen derecho también esté ajustado */
    height: auto; /* Hace que la altura se ajuste al contenido */
  }

  img {
    height: auto; /* Ajusta la altura de la imagen para mantener la proporción */
    width: auto; /* Asegura que la imagen no exceda el ancho de la pantalla */
    max-width: 100%; /* Limita el ancho de la imagen al 100% del contenedor */
  }

  .iconService {
    height: 10vh; /* Ajusta el tamaño de los íconos para pantallas pequeñas */
    width: 10vh;
  }

  .btn {
    width: 50%; /* Ajusta el ancho del botón para pantallas pequeñas */
    margin: 1vh auto; /* Centra el botón horizontalmente y ajusta el margen vertical */
  }
}


</style>
