<template>
  <div>
    <NavbarLanding />
    <div class="container">
      <h1 style="margin: 50px 0 50px 0">Reseñas de nuestros clientes</h1>
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
              <star-rating
                style="display: flex; justify-content: end"
                read-only
                :show-rating="false"
                :star-size="30"
                :rating="Number(review.score)"
              />
            </div>
          </b-card>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import NavbarLanding from "./NavbarLanding.vue";
import { useSecret } from "@/stores/key";
import StarRating from "vue-star-rating";

export default {
  name: "SeeReviews",
  components: {
    NavbarLanding,
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

      this.$http
        .get("/api/reviews")
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
    },
    decryptReviewData(item) {
      const fieldsToDecrypt = ["score", "reviewDescription", "packCombName"];
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
