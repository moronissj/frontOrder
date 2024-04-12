<template>
  <div>
    <NavbarCliente />
    <div class="container">
      <h1 style="margin: 50px 0 20px 0">Paquetes</h1>
      <TransitionGroup name="zoomDown" tag="div" class="row">
        <div
          class="col col-sm-6 col-md-4"
          v-for="pkg in packages"
          :key="pkg.packageId"
          style="padding: 20px"
        >
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">{{ pkg.packageName }}</h5>
              <div>
                <span class="badge badge-primary">{{ pkg.categoryName }}</span>
              </div>
              <hr />
              <p class="card-text description">
                {{ pkg.packageDescription }}
              </p>
              <h5>$ {{ pkg.packagePrice }}.00 MXN</h5>
              <hr />
              <a
                @click="navigateToUserPackageInfo(pkg.packageId)"
                class="btn btn-outline-dark"
                >Más información</a
              >
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
  name: "UserAllPackages",
  components: {
    NavbarCliente,
  },
  data() {
    return {
      key: "",
      packages: [],
    };
  },
  methods: {
    fetchPackages() {
      const secretStore = useSecret();
      this.key = secretStore.secretKey;
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("/api/packages", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.packages = response.data.map((item) =>
              this.decryptPackageData(item)
            );
            this.packages = response.data;
            console.log(this.packages);
          })
          .catch((e) => {
            console.error("Error en la peticion: ", e);
          });
      }
    },
    decryptPackageData(item) {
      const fieldsToDecrypt = [
        "packageId",
        "packageName",
        "packageDescription",
        "packagePrice",
        "packageState",
        "designatedHours",
        "workersNumber",
        "categoryName",
        "categoryId",
        "categoryId",
      ];
      fieldsToDecrypt.forEach((field) => {
        item[field] = this.$encryptionService.decryptData(
          item[field],
          this.key
        );
      });
      return item;
    },
    navigateToUserPackageInfo(packageId) {
      this.$router.push({
        name: "user-package-info",
        query: { packageId },
      });
    },
  },
  mounted() {
    this.fetchPackages();
  },
};
</script>

<style>
.description {
  max-height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge {
  background-color: #ae0505;
}
</style>
