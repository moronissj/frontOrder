<template>
  <div>
    <NavbarClient />
    <div class="container">
      <h1 style="margin: 50px 0 50px 0">Mis reseñas</h1>
      <TransitionGroup name="bounce" tag="div" class="row">
        <div class="col" v-for="review in reviews" :key="review.reviewId">
          <b-card
            :header="review.packCombName"
            header-text-variant="white"
            header-tag="header"
            header-bg-variant="dark"
            style="max-width: 20rem"
            id="card-1"
          >
            <b-card-text>
              {{ review.reviewDescription }}
            </b-card-text>
            <div class="text-center">
              <div class="row">
                <div
                  class="col-6"
                  style="display: flex; justify-content: start"
                >
                  <b-button
                    @click="deleteReview(review.reviewId)"
                    size="sm"
                    variant="outline-danger"
                    >Eliminar</b-button
                  >
                </div>
                <div class="col-6">
                  <star-rating
                    style="display: flex; justify-content: end"
                    read-only
                    :show-rating="false"
                    :star-size="30"
                    :rating="Number(review.score)"
                  />
                </div>
              </div>
            </div>
          </b-card>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import NavbarClient from "./NavbarClient.vue";
import { useSecret } from "@/stores/key";
import StarRating from "vue-star-rating";

export default {
  name: "SeeReviews",
  components: {
    NavbarClient,
    StarRating,
  },
  data() {
    return {
      key: "",
      reviews: [],
    };
  },
  methods: {
    fetchReviews() {
      const secretStore = useSecret();
      this.key = secretStore.secretKey;

      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("/api/reviews/my-reviews", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.reviews = response.data.map((item) =>
              this.decryptReviewData(item)
            );
            this.reviews = response.data;
            console.log(this.reviews);
          })
          .catch((e) => {
            console.error("Error en la peticion: ", e);
          });
      }
    },
    deleteReview(id) {
      this.key = useSecret();

      const numericId = Number(id);
      this.$swal({
        title: "¿Estas seguro?",
        text: "No podras revertir este cambio",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "cancelar",
        confirmButtonText: "Si, eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          const serializedData = JSON.stringify({
            reviewId: numericId,
          });
          const encryptedData = this.$encryptionService.encryptData(
            serializedData,
            this.key
          );

          console.log("Encrypted Data: " + encryptedData);

          const token = localStorage.getItem("token");
          if (token) {
            this.$http
              .delete("/api/reviews/delete", {
                data: encryptedData,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log(response);
                this.$swal({
                  title: "Eliminada",
                  text: "Tu reseña ha sido eliminado con exito",
                  icon: "success",
                });
                this.fetchReviews();
              })
              .catch((error) => {
                console.log(response);
                this.$swal({
                  title: "Error al eliminar",
                  text: error.response.status,
                  icon: "error",
                });
              });
          }
        }
      });
    },
    decryptReviewData(item) {
      const fieldsToDecrypt = [
        "score",
        "reviewDescription",
        "packCombName",
        "reviewId",
      ];
      fieldsToDecrypt.forEach((field) => {
        item[field] = this.$encryptionService.decryptData(
          item[field],
          this.key
        );
      });
      return item;
    },
  },
  mounted() {
    this.fetchReviews();
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
