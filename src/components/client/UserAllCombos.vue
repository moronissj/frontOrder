<template>
  <div>
    <NavbarCliente />
    <div class="container">
      <h1 style="margin: 50px 0 20px 0">Combos</h1>
      <TransitionGroup name="zoomDown" tag="div" class="row">
        <div
          class="col col-sm-6 col-md-4"
          v-for="combo in combos"
          :key="combo.comboId"
          style="padding: 20px"
        >
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">{{ combo.comboName }}</h5>
              <hr />
              <p class="card-text description">
                {{ combo.comboDescription }}
              </p>
              <h5>$ {{ combo.comboPrice }}.00 MXN</h5>
              <hr />
              <a
                @click="navigateToUserComboInfo(combo.comboId)"
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
  name: "UserAllCombos",
  components: {
    NavbarCliente,
  },
  data() {
    return {
      key: "",
      combos: [],
    };
  },
  methods: {
    fetcCombos() {
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("/api/combos", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.combos = response.data;
          })
          .catch((e) => {
            console.error("Error en la peticion: ", e);
          });
      }
    },
    navigateToUserComboInfo(comboId) {
      this.$router.push({
        name: "user-combo-info",
        query: { comboId },
      });
    },
  },
  mounted() {
    this.fetcCombos();
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
