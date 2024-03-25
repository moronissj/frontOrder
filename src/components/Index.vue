<script setup>
import NavbarLanding from './NavbarLanding.vue'
import Footer from './Footer.vue';
import Carousel from './Carousel.vue';
</script>

<template>
    <div>
      <div class="app">
        <NavbarLanding/>
      </div>
  
      <div class="banner-container">
      <img src="../assets/banerIndex.png" alt="" class="banner-image">
      <b-button @click="goToLogin" class="banner-button">¡Empieza a order ahora!</b-button>
    </div>


    <Carousel/>
    
    <div class="title">
        <h1>Servicios populares</h1>
    </div>
    <div class="servicios">     
        <div class="card1" >
            <h3>Transporte</h3>
            <img src="../assets/transporteIcon.png" alt="" class="iconService">
            <div>
                <b-button @click="goToLogin" class="btn">Ver más</b-button>
            </div>
        </div>
        <div class="card2">
            <h3>Comida</h3>
            <img src="../assets/comidaIcon.png" alt="" class="iconService">
            <div>
                <b-button @click="goToLogin" class="btn">Ver más</b-button>
            </div>
        </div>
        <div class="card1">
            <h3>Utileria</h3>
            <img src="../assets/utileriaIcon.png" alt="" class="iconService">
            <div>
                <b-button @click="goToLogin" class="btn">Ver más</b-button>
            </div>
            
        </div>


    </div>
   
    <Footer />
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {

    };
  },

  methods: {
    goToLogin() {
      this.$router.push('/login');
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
    grid-template-columns: 1fr 1fr 1fr;
    margin: 5vh;
    grid-gap: 5vh;
}

.btn{
    background-color: #d9d9d9;
    color:#2D2A2A;
    margin: 2.5vh;
}

.banner-container {
  position: relative;
  text-align: center; /* Centrar el texto para botones anchos */
}

.banner-image {
  width: 100%;
  height: auto; /* Asegúrate de que la imagen de banner ocupe el ancho completo */
  display: block; /* Evita que la imagen tenga un espacio blanco debajo */
}

.banner-button {
  position: absolute;
  top: 60%; /* Ajusta estos valores para posicionar el botón como desees */
  left: 25%;
  transform: translate(-50%, -50%); /* Centra el botón exactamente en el medio del banner */
  font-family: 'Montserrat', sans-serif; /* Tipografía */
  width: 50vh;
  border-radius: 16px;
  font-weight: bold;
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

  .banner-button{
    margin-left: 5vh;
  }
}

</style>
