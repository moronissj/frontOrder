<template>
  <div>
    <NavbarCliente />
    <div class="container">
      <h1 style="margin: 50px 0 20px 0">Servicios</h1>
      <TransitionGroup name="zoomDown" tag="div" class="row">
        <div
          class="col col-sm-6 col-md-4"
          v-for="(service, index) in services"
          :key="service.serviceId"
          style="padding: 20px"
        >
          <div :class="index % 2 === 0 ? 'card2' : 'card1'">
            <div class="inner-content text-center">
              <h3 style="margin-bottom: 30px">{{ service.serviceName }}</h3>
              <div style="height: 200px">
                <img
                  :src="service.serviceImgUrl"
                  alt="Service image"
                  class="iconService"
                />
              </div>
              <div>
                <b-button
                  class="button-card"
                  @click="navigateToServicePackages(service.serviceId)"
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
  name: "Servicios",
  components: {
    NavbarCliente,
  },
  data() {
    return {
      key: "",
      services: [],
    };
  },
  methods: {
    fetchServices() {
      const secretStore = useSecret();
      this.key = secretStore.secretKey;
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("api/services", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.services = response.data.map((item) =>
              this.decryptServiceData(item)
            );
            console.log(this.services);
          })
          .catch((e) => {
            console.error("Error en la peticion: ", e);
          });
      }
    },
    decryptServiceData(item) {
      const fieldsToDecrypt = [
        "serviceId",
        "serviceName",
        "serviceDescription",
        "serviceQuote",
        "serviceImgUrl",
      ];
      fieldsToDecrypt.forEach((field) => {
        item[field] = this.$encryptionService.decryptData(
          item[field],
          this.key
        );
      });
      return item;
    },
    navigateToServicePackages(serviceId) {
      this.$router.push({
        name: "user-service-packages",
        query: { serviceId },
      });
    },
  },
  mounted() {
    this.fetchServices();
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

.iconService {
  width: 200px !important;
  height: auto !important;
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
  margin: 10px 0 10px 0 !important;
  background: white !important;
}
</style>
