<script setup>
import NavbarClient from "./NavbarClient.vue";
import Footer from "../../components/Footer.vue";
import Carousel from "../../components/Carousel.vue";
import RatingTaquiza from "../RatingTaquiza.vue";
import FancyBoxLanding from "../FancyBoxLanding.vue";
import FancyBoxTaquizas from "../FancyBoxTaquizas.vue";
import { ref, onMounted } from "vue";

const isLoading = ref(true); // Estado para controlar la visualización del spinner

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false; // Oculta el spinner después de 1 segundo (ajusta según necesidad)
  }, 5000);
});
</script>

<template>
  <div>
    <div v-if="isLoading" class="spinner-fullscreen">
      <div
        class="spinner-border text-primary"
        role="status"
        style="width: 20rem; height: 20rem"
      ></div>
    </div>

    <div>
      <div v-if="!isLoading">
        <div class="app">
          <NavbarClient />
        </div>
      </div>

      <div class="banner-container">
        <img src="../../assets/Banner.png" alt="" class="banner-image" />
      </div>

      <Carousel />

      <div class="title">
        <h1>Servicios populares</h1>
      </div>
      <div class="servicios">
        <div class="card1">
          <h3>Transporte</h3>
          <img
            src="../../assets/transporteIcon.png"
            alt=""
            class="iconService"
          />
          <div>
            <b-button
              variant="primary"
              style="width: 30%"
              @click="goToTransporte"
              >Ver Más</b-button
            >
          </div>
        </div>
        <div class="card2">
          <h3>Comida</h3>
          <img src="../../assets/comidaIcon.png" alt="" class="iconService" />
          <div>
            <b-button variant="primary" style="width: 30%" @click="goToComida"
              >Ver Más</b-button
            >
          </div>
        </div>
        <div class="card1">
          <h3>Utileria</h3>
          <img src="../../assets/utileriaIcon.png" alt="" class="iconService" />
          <div>
            <b-button variant="primary" style="width: 30%" @click="goToUtileria"
              >Ver Más</b-button
            >
          </div>
        </div>
      </div>

      <div class="quienes-somos-container">
        <div class="header-section">
          <h1>¿Quiénes somos?</h1>
        </div>
        <div class="content-section">
          <p>
            Somos un equipo apasionado por la gastronomía y el buen servicio,
            dedicado a ofrecer experiencias culinarias únicas a través de
            nuestros buffets. Con una amplia variedad de opciones que se adaptan
            a cualquier tipo de evento, nuestro compromiso es garantizar la
            satisfacción y superar las expectativas de nuestros clientes.
          </p>
          <p>
            Fundada en [Año], nuestra misión ha sido siempre llevar a cada
            evento un toque especial, combinando sabores tradicionales y
            contemporáneos para crear menús memorables. Valoramos la calidad, la
            innovación y la excelencia en el servicio, y estamos constantemente
            explorando nuevas formas de deleitar a nuestros comensales.
          </p>
        </div>
        <div class="image-section">
          <FancyBoxTaquizas></FancyBoxTaquizas>
        </div>
      </div>
      <div>
        <h1 color="#AE0505">Reseñas</h1>
        <br />
        <RatingTaquiza></RatingTaquiza>
      </div>
      <div>
        <FancyBoxLanding></FancyBoxLanding>
      </div>

      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToTransporte() {
      this.$router.push("/transporte");
    },
    goToComida() {
      this.$router.push("/comida");
    },
    goToUtileria() {
      this.$router.push("/utileria");
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

h1 {
  margin: 10vh;
}

h3 {
  margin-top: 2.5vh;
}
.card1 {
  background-color: #ae0505;
  height: auto;
  width: auto;
  border-radius: 16px;
  color: white;
  font-family: "Montserrat", sans-serif;
  padding: 2.5vh;
  margin-bottom: 5vh;
}

.card2 {
  background-color: #2d2a2a;
  height: auto;
  width: auto;
  border-radius: 16px;
  color: white;
  font-family: "Montserrat", sans-serif;
  padding: 2.5vh;
  margin-bottom: 5vh;
}

img {
  width: 100%;
  height: 75vh;
  margin-bottom: 5vh;
}

.title {
  margin-top: 5vh;
  justify-content: center;
  background-color: #ae0505;
  color: #fff;
  padding: 20px;
  height: 25vh;
}

.iconService {
  height: 15vh;
  width: 15vh;
}

.servicios {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 5vh;
  grid-gap: 5vh;
}

@media (max-width: 800px) {
  .servicios {
    display: grid;
    grid-template-columns: 1fr; /* Cambia a una sola columna */
    margin: 2.5vh 5%; /* Ajusta el margen para pantallas pequeñas */
    width: 90%;
  }

  h1,
  h2,
  h3,
  h4 {
    text-align: center; /* Centra los títulos */
    margin: 5vh; /* Ajusta el margen superior */
    font-size: 1.5rem; /* Reduce el tamaño del texto para pantallas pequeñas */
  }

  .card1,
  .card2 {
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

.quienes-somos-container {
  padding: 50px 20px;
  text-align: center;
  background-color: #ae0505;
}

.header-section h1 {
  font-size: 2.5rem;
  font-family: "Montserrat", sans-serif;
  color: white;
  margin-bottom: 30px;
}

.content-section p {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 1.2rem;
  line-height: 1.6;
  color: white;
  margin-bottom: 20px;
}

.spinner-fullscreen {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; /* Asegura que el contenedor del spinner ocupe toda la vista en ancho */
  height: 100vh; /* Asegura que el contenedor del spinner ocupe toda la vista en alto */
  position: fixed; /* Posicionamiento fijo para que el spinner no se mueva al hacer scroll */
  top: 0;
  left: 0;
  z-index: 1050; /* Asegura que el spinner esté sobre otros elementos */
  background-color: rgba(
    255,
    255,
    255,
    0.9
  ); /* Fondo ligeramente transparente para el spinner */
  color: #ae0505;
}
.spinner-border {
  width: 100px; /* Tamaño del spinner */
  height: 100px;
  border-width: 30px; /* Hace que el borde del spinner sea más grueso */
}

.loading-text {
  margin-top: 2rem; /* Espacio entre el spinner y el texto */
  font-size: 2rem; /* Tamaño del texto, ajusta según necesidad */
  color: #0275d8; /* Color del texto, puedes ajustarlo para que coincida con el estilo de tu sitio */
}
</style>
