<template>
  <div>
    <NavbarClient />
    <div class="container">
      <div class="row" style="margin-top: 50px; margin-bottom: 50px">
        <div class="col-6">
          <h1>{{ combo.comboName }}</h1>
          <div style="text-align: justify">
            <p>Descripción: {{ combo.comboDescription }}</p>
          </div>

          <p>Duración: {{ combo.comboDesignatedHours }}</p>
          <p>
            Número de trabajadores del combo: {{ combo.comboWorkersNumber }}
          </p>
          <h2>COSTO: $ {{ combo.comboPrice }}.00 MXN</h2>
          <br />
          <MakeOrderComboModal
            v-if="combo.comboId"
            :combo="combo"
          ></MakeOrderComboModal>
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
            <a data-fancybox="gallery" :href="combo.comboImgUrl">
              <img :src="combo.comboImgUrl" width="200" height="150" />
            </a>
          </Fancybox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MakeOrderComboModal from "./MakeOrderComboModal.vue";
import NavbarClient from "../NavbarClient.vue";
import Fancybox from "../../Fancybox.vue";

export default {
  name: "ComboInfo",
  components: {
    MakeOrderComboModal,
    NavbarClient,
    Fancybox,
  },
  data() {
    return {
      combo: {},
      comboId: null,
    };
  },
  methods: {
    fetchCombo(comboId) {
      this.$http
        .get(`/api/combos/${comboId}`)
        .then((response) => {
          this.combo = response.data;
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
  },
  mounted() {
    this.comboId = this.$route.query.comboId;
    this.fetchCombo(this.comboId);
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
