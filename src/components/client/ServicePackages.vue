<!-- VISTA Y EN USO -->
<template>
  <div>
    <NavbarCliente />
    <div class="container">
      <h1 style="margin: 50px 0 20px 0">Paquetes del servicio</h1>
      <TransitionGroup name="zoomDown" tag="div" class="row">
        <div
          class="col col-sm-6 col-md-4"
          v-for="(aPackage, index) in packages"
          :key="aPackage.packageId"
          style="padding: 20px"
        >
          <div :class="index % 2 === 0 ? 'card2' : 'card1'">
            <div class="inner-content text-center">
              <h3>{{ aPackage.packageName }}</h3>
              <p>{{ aPackage.packageDescription }}</p>
              <div>
                <b-button
                  @click="navigateToUserPackageInfo(aPackage.packageId)"
                  class="button-card"
                  >Ver más</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import NavbarCliente from "./NavbarClient.vue";
import { useSecret } from "@/stores/key";

export default {
  name: "ServicePackages",
  components: {
    NavbarCliente,
  },
  data() {
    return {
      key: "",
      packages: [],
      serviceId: null,
    };
  },
  methods: {
    fetchPackages(id) {
      this.key = useSecret();

      const serializedData = JSON.stringify({
        serviceId: id,
      });

      const encryptedData = this.$encryptionService.encryptData(
        serializedData,
        this.key
      );

      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .post("api/services/packages/from-service", encryptedData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.packages = response.data;
          })
          .catch((e) => {
            console.error("Error en la peticion: ", e);
          });
      }
    },
    navigateToUserPackageInfo(packageId) {
      this.$router.push({
        name: "user-package-info",
        query: { packageId },
      });
    },
  },
  mounted() {
    const secretStore = useSecret();
    this.key = secretStore.secretKey;
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

.card1,
.card2 {
  width: 100%;
}

.button-card {
  color: black !important;
  font-size: 1.1rem !important;
  padding: 8px 30px !important;
  font-weight: 600 !important;
  width: 50% !important;
  margin: 30px 0 10px 0 !important;
  background: white !important;
}
</style>
