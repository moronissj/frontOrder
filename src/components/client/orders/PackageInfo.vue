<template>
  <div>
    <NavbarClient />
    <div class="container">
      <div class="row" style="margin-top: 50px">
        <div class="col-6">
          <h1>{{ aPackage.packageName }}</h1>
          <div style="text-align: justify">
            <p>Descripción: {{ aPackage.packageDescription }}</p>
          </div>
          <p>Servicio: {{ service }}</p>
          <p>Horas designadas: {{ aPackage.designatedHours }}</p>
          <p>
            Número de trabajadores del paquete: {{ aPackage.workersNumber }}
          </p>
          <h2>COSTO: $ {{ aPackage.packagePrice }}.00 MXN</h2>
          <br />
          <MakeOrderModal
            v-if="aPackage.packageId"
            :aPackage="aPackage"
          ></MakeOrderModal>
        </div>
        <div class="col-6">
          <Fancybox
            :options="{
              Carousel: {
                infinite: false,
              },
            }"
            style="display: flex"
          >
            <div
              v-for="(imageUrl, index) in images"
              :key="index"
              class="image-container"
            >
              <a data-fancybox="gallery" :href="imageUrl">
                <img :src="imageUrl" width="200" height="150" />
              </a>
            </div>
          </Fancybox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MakeOrderModal from "./MakeOrderModal.vue";
import NavbarClient from "../NavbarClient.vue";
import Fancybox from "../../Fancybox.vue";

export default {
  name: "PackageInfo",
  components: {
    MakeOrderModal,
    NavbarClient,
    Fancybox,
  },
  data() {
    return {
      aPackage: {},
      images: [],
      packageId: null,
      service: null,
    };
  },
  methods: {
    fetchPackageInfo(packageId) {
      this.$http
        .get(`/api/packages/package-info-users/${packageId}`)
        .then((response) => {
          this.aPackage = response.data;
          this.images = [];
          this.service = this.aPackage.categoryName;
          if (response.data.images && response.data.images.length > 0) {
            this.images = response.data.images.map((image) => image.imageUrl);
          }
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
  },
  mounted() {
    this.packageId = this.$route.query.packageId;
    this.fetchPackageInfo(this.packageId);
  },
};
</script>

<style>
.title {
  display: flex;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 0%;
  height: 60%;
  min-width: auto;
  max-height: auto;
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
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
}
</style>
