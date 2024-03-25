<script setup>
import Footer from './Footer.vue';
import Carousel from './Carousel.vue'
import RatingTaquiza from './RatingTaquiza.vue';
import FancyBoxLanding from './FancyBoxLanding.vue';
import NavbarLanding from './NavbarLanding.vue'
import FancyBoxTaquizas from './FancyBoxTaquizas.vue';
</script>

<template>
    <div>
        <div class="app">
            <NavbarLanding/>
        </div>

        <div class="imageBack">
            <img src="../../assets/Banner.png" alt="">
        </div>
        <Carousel></Carousel>
        <div class="title">
            <h1>Servicios populares</h1>
        </div>
        <div class="servicios">
            <div class="card">
                <h3>Transporte</h3>
                <img src="../../assets/transporteIcon.png" alt="" class="iconService">
                <b-button class="btn" id="transporte"><router-link to="/transporte" class="msg">Ver
                        más</router-link></b-button>
            </div>
            <div class="card2">
                <h3>Comida</h3>
                <img src="../../assets/comidaIcon.png" alt="" class="iconService">
                <b-button class="btn" id="transporte"><router-link to="/comida" class="msg">Ver
                        más</router-link></b-button>
            </div>
            <div class="card3">
                <h3>Utileria</h3>
                <img src="../../assets/utileriaIcon.png" alt="" class="iconService">
                <b-button class="btn" id="transporte"><router-link to="/utileria" class="msg">Ver
                        más</router-link></b-button>
            </div>
        </div>
        <div class="quienes-somos-container">
    <div class="header-section">
      <h1>¿Quiénes somos?</h1>
    </div>
    <div class="content-section">
      <p>
        Somos un equipo apasionado por la gastronomía y el buen servicio, dedicado a
        ofrecer experiencias culinarias únicas a través de nuestros buffets. Con una
        amplia variedad de opciones que se adaptan a cualquier tipo de evento, nuestro
        compromiso es garantizar la satisfacción y superar las expectativas de nuestros
        clientes.
      </p>
      <p>
        Fundada en [Año], nuestra misión ha sido siempre llevar a cada evento un toque
        especial, combinando sabores tradicionales y contemporáneos para crear menús
        memorables. Valoramos la calidad, la innovación y la excelencia en el servicio,
        y estamos constantemente explorando nuevas formas de deleitar a nuestros comensales.
      </p>
    </div>
    <div class="image-section">
      <FancyBoxTaquizas></FancyBoxTaquizas>
    </div>
  </div>
        <div>
            <h1 color="#AE0505">Reseñas</h1>
            <br>
            <RatingTaquiza></RatingTaquiza>
        </div>
        <div>
            <FancyBoxLanding></FancyBoxLanding>
        </div>
        <Footer/>

    </div>
</template>


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
    margin-top: 15vh;
}

#navbar {
    background-color: #AE0505;
    height: 15vh;
    width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.card {
    background-color: #AE0505;
    height: 50vh;
    width: 60%;
    border-radius: 16px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    margin-left: 40%;
    padding: 5vh;
}

.card2 {
    background-color: #2D2A2A;
    height: 50vh;
    width: 60%;
    border-radius: 16px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    margin-left: 20%;
    margin-right: 20%;
    padding: 5vh;
}

.card3 {
    background-color: #AE0505;
    height: 50vh;
    width: 60%;
    border-radius: 16px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    margin-right: 40%;
    padding: 5vh;

}

img {
    width: 100%;
    height: 75vh;
    margin-bottom: 5vh;
}

.title {
    margin-top: 1vh;
    justify-content: center;
    background-color: #AE0505;
    color: #fff;
    padding: 20px;
    height: 25vh;
}

.iconService {
    height: 25vh;
    width: 25vh;
}

.servicios {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 10vh;
}

.btn {
    background-color: #d9d9d9;
    color: #2D2A2A;
    width: 15vh;
}

#transporte {
    margin-left: 7vh;
    margin-top: 2.5vh;
}
.footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
  }

.quienes-somos-container {

  padding: 50px 20px;
  text-align: center;
  background-color: #AE0505;
}

.header-section h1 {
  font-size: 2.5rem;
  font-family: 'Montserrat', sans-serif;
  color: white;
  margin-bottom: 30px;
}

.content-section p {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 1.2rem;
  line-height: 1.6;
  color: white;
  margin-bottom: 20px;
}

.image-section img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 30px;
}
</style>
