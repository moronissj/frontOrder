<script setup>
import Footer from "../../components/Footer.vue";
import TablePedido from "../client/TablePedido.vue";
import ModalReseña from "../client/ModalReseña.vue";
import NavbarClient from "./NavbarClient.vue";
</script>

<template>
  <div>
    <div class="app">
      <NavbarClient />
    </div>
    <br />
    <div class="title">
      <div id="taqui">
        <h1>Detalles del Paquete</h1>
        <h2>Paquete Solicitado:</h2>
        <h3>Carnitas</h3>

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
        <h2>PAGADO: $8000.00 MXN</h2>
        <br />
        <b-button
          v-b-modal.modal-1
          variant="primary"
          style="width: 50%"
          @click="goToTaquizas"
          >Regresar a Historial</b-button
        >
      </div>
      <div id="caru">
        <h2>Estado de la solicitud:</h2>
        <h2 style="color: cornflowerblue">Servido</h2>
        <h2>Trabajadores Asignados</h2>
        <TablePedido></TablePedido>

        <ModalReseña style="margin-top: 10%"></ModalReseña>
      </div>
    </div>

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
  margin-bottom: 10%;
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
