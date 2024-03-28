<script setup>
import Footer from "../../components/Footer.vue";
import ModalTaquizas from "../client/ModalTaquizas.vue";
import RatingTaquiza from "../RatingTaquiza.vue";
import FancyBoxTaquizas from "../FancyBoxTaquizas.vue";
import NavbarClient from "./NavbarClient.vue";
</script>

<template>
  <div>
    <div class="app"></div>
    <NavbarClient />
    <br />
    <div class="title">
      <div id="taqui">
        <h1>Taquizas</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit magna ante,
          montes hac cras vivamus nascetur sem odio suspendisse, maecenas
          viverra commodo ligula primis cum quisque faucibus. Consequat libero
          convallis auctor taciti metus ligula rhoncus tellus iaculis posuere
          litora imperdiet id massa, ante aptent egestas scelerisque aliquet
          primis augue vitae sagittis vehicula habitant erat. Facilisi massa
          natoque quam odio montes porta eleifend cum nisi, netus imperdiet duis
          tincidunt cursus conubia euismod aptent luctus, curabitur porttitor
          pellentesque ornare convallis id laoreet mollis.
        </p>
        <h2>COSTO: $10,0000 MXN</h2>

        <br />
        <ModalTaquizas></ModalTaquizas>
      </div>
      <div id="caru">
        <FancyBoxTaquizas></FancyBoxTaquizas>
      </div>
      <div></div>
    </div>
    <br />
    <h1>RESEÑAS</h1>
    <br />
    <RatingTaquiza />
    <Footer />
    <footer class="footer">
      <p>&copy; 2024 Order.com</p>
    </footer>
  </div>
</template>

<style>
.title {
  display: flex;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 0%;
  height: 60%;
  min-width: auto;
  max-height: auto;
}

#taqui,
#caru {
  flex: 1 1 50%; /* Ocupa el 50% del espacio disponible */
  margin: 0 10px; /* Agrega un poco de espacio alrededor */
}

.app {
  margin-bottom: 0%;
  min-width: auto;
  max-height: auto;
}

@media (max-width: 768px) {
  .title {
    flex-direction: column;
  }

  #taqui,
  #caru {
    flex: 1 1 100%; /* Ocupa el 100% del espacio disponible en pantallas pequeñas */
    margin: 0 10px;
  }

  #taqui {
    width: auto; /* Hace que #taqui ocupe el ancho disponible */
    margin: 0; /* Elimina márgenes específicos para pantallas pequeñas */
  }
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
}
</style>
