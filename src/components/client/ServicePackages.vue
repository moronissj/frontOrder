<!-- VISTA Y EN USO -->
<template>
  <div class="app">
    <NavbarCliente />
    <div class="container">
      <h1>Paquetes del servicio</h1>
      <TransitionGroup name="zoomDown" tag="div" class="row">
        <div
          class="col-4"
          v-for="(aPackage, index) in packages"
          :key="aPackage.packageId"
          :class="index % 2 === 0 ? 'card2' : 'card1'"
        >
          <h3>{{ aPackage.packageName }}</h3>
          <p>{{ aPackage.packageDescription }}</p>
          <div>
            <b-button
              @click="navigateToUserPackageInfo(aPackage.packageId)"
              class="btn"
              >Ver más</b-button
            >
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import NavbarCliente from "./NavbarClient.vue";
export default {
  name: "ServicePackages",
  components: {
    NavbarCliente,
  },
  data() {
    return {
      packages: [],
      serviceId: null,
    };
  },
  methods: {
    fetchPackages(id) {
      this.$http
        .get(`api/services/${id}/packages`)
        .then((response) => {
          this.packages = response.data;
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
    navigateToUserPackageInfo(packageId) {
      console.log(packageId);
      this.$router.push({
        name: "user-package-info",
        query: { packageId },
      });
    },
  },
  mounted() {
    this.serviceId = this.$route.query.serviceId;
    this.fetchPackages(this.serviceId);
  },
};
</script>

<style>
.card1 {
  background-color: #ae0505;
  height: 50vh;
  border-radius: 16px;
  color: white;
  font-family: "Montserrat", sans-serif;
  padding: 2.5vh;
}

.card2 {
  background-color: #2d2a2a;
  height: 50vh;
  border-radius: 16px;
  color: white;
  font-family: "Montserrat", sans-serif;
  padding: 2.5vh;
}

.title {
  margin-top: 1vh;
}

.iconService {
  height: 25vh;
  width: 25vh;
}

.btn {
  background-color: #d9d9d9;
  color: #2d2a2a;
  width: 15vh;
  margin: 7.5vh;
}

.servicios {
  display: grid;
  grid-template-columns: repeat(
    3,
    1fr
  ); /* Tres columnas para pantallas grandes */
  gap: 15px; /* Espacio entre las tarjetas */
  padding-left: 15vh; /* Padding uniforme en todos los lados */
  padding-right: 15vh; /* Padding uniforme en todos los lados */
  width: 100%;
}

.card1,
.card2 {
  height: auto; /* Hace que la altura se ajuste al contenido */
  width: 100%; /* Hace que la tarjeta se ajuste al ancho de la columna */
  margin-bottom: 2.5vh; /* Espaciado entre tarjetas */
}

h3 {
  margin-bottom: 5vh;
}
@media (max-width: 1024px) {
  .servicios {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* Dos columnas para pantallas medianas */
    padding: 7.5vh;
  }
}

/* Ajustes para móviles */
@media (max-width: 800px) {
  .servicios {
    grid-template-columns: 1fr; /* Una sola columna para pantallas pequeñas */
    padding: 5vh; /* Padding reducido en los lados para pantallas pequeñas */
  }

  h1 {
    text-align: center; /* Centra el título */
    margin: 2.5vh 0; /* Margen reducido para el título */
  }

  .iconService {
    height: 15vh; /* Reduce el tamaño del ícono para pantallas pequeñas */
    width: 15vh; /* Mantiene la proporción del ícono */
  }

  .btn {
    width: 50%; /* Botón más ancho para llenar el espacio disponible */
    margin: 2.5vh auto; /* Centra el botón y proporciona espacio vertical */
  }
}
</style>
./client/NavbarClient.vue
