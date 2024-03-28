<script setup>
import NavbarLanding from "./NavbarLanding.vue";
import Footer from "./Footer.vue";
import Carousel from "./Carousel.vue";
import RatingTaquiza from "./RatingTaquiza.vue";
</script>

<template>
  <div>
    <NavbarLanding />
    <div class="banner-container">
      <div class="banner-background"></div>
      <div class="container">
        <div class="text-wrapper">
          <h1 id="bannerText">ORDER.COM</h1>
        </div>
        <div class="button-wrapper">
          <b-button @click="goToLogin" class="banner-button">
            ¡Empieza a ordenar ahora!
          </b-button>
        </div>
      </div>
    </div>

    <div class="container">
      <Carousel />
      <div class="title">
        <h1>Servicios</h1>
      </div>
      <div class="row" id="cards">
        <div class="col">
          <div class="card">
            <h3>Transporte</h3>
            <div class="img-container">
              <img
                src="../assets/transporteIcon.png"
                alt=""
                class="iconService"
              />
            </div>
            <div>
              <b-button @click="goToLogin" class="btn">Ver más</b-button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card black-card">
            <h3>Comida</h3>
            <div class="img-container">
              <img src="../assets/comidaIcon.png" alt="" class="iconService" />
            </div>
            <div>
              <b-button @click="goToLogin" class="btn">Ver más</b-button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <h3>Utileria</h3>
            <div class="img-container">
              <img
                src="../assets/utileriaIcon.png"
                alt=""
                class="iconService"
              />
            </div>
            <div>
              <b-button @click="goToLogin" class="btn">Ver más</b-button>
            </div>
          </div>
        </div>
      </div>

      <div class="servicios">
        <div>
          <h1 style="margin-bottom: 50px">Opiniones</h1>
          <RatingTaquiza></RatingTaquiza>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.banner-container {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../assets/BannerLandingImage.jpg);
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  top: -74px;
  z-index: 0;
}
.banner-container .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

#bannerText {
  color: white;
  font-size: 6rem;
}

.banner-button {
  font-family: "Montserrat", sans-serif;
  width: 25%;
  border-radius: 15px;
  font-weight: bold;
  padding: 15px;
  background-color: white !important;
  color: #2d2a2a;
  transition: all 0.2s ease;
  border: none;
}

.banner-button:hover {
  background-color: #2d2a2a !important;
  color: white;
}

.card {
  background-color: #ae0505;
  height: 100%;
  border-radius: 16px;
  color: white;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.black-card {
  background-color: #2d2a2a;
}

.card .btn {
  margin-top: 20px;
  padding: 9px 50px;
  border-radius: 10px;
  background-color: white;
  font-weight: 700;
  color: #2d2a2a;
}

.card h3 {
  margin-bottom: 20px;
}

.img-container {
  display: flex;
  justify-content: center;
  height: 200px;
}

.iconService {
  object-fit: contain;
}

.title {
  margin-top: 50px;
  margin-bottom: 50px;
}

#cards {
  margin-bottom: 50px;
}
@media (max-width: 800px) {
  #cards {
    display: grid;
    grid-template-columns: 1fr; /* Todos los elementos se alinean en una sola columna */
    grid-gap: 20px; /* Ajusta el espacio entre las tarjetas */
  }

  .card {
    justify-content: center; /* Centra el contenido en la tarjeta */
    padding: 20px; /* Reduce el padding para ahorrar espacio */
    text-align: center; /* Asegura que el texto esté centrado */
  }

  .img-container {
    height: auto; /* Ajusta la altura del contenedor de la imagen */
    margin-bottom: 20px; /* Añade un margen abajo de la imagen */
  }

  .iconService {
    height: 15vh; /* Ajusta el tamaño de la imagen */
    width: auto; /* Asegura que la imagen mantenga su proporción */
  }

  .card .btn {
    width: 100%; /* El botón ocupa todo el ancho disponible */
    padding: 10px 0; /* Ajusta el padding verticalmente */
  }

  #bannerText {
  color: white;
  font-size: 4rem;
}
}
</style>
