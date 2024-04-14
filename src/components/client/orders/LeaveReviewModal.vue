<template>
  <div>
    <b-button
      class="table-button"
      size="sm"
      v-b-modal="`leaveReviewModal_${order.orderId}`"
      >Dejar reseña</b-button
    >
    <b-modal
      :id="`leaveReviewModal_${order.orderId}`"
      title="Dejar Reseña"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5 class="form-title">Dejar Reseña</h5>
        <b-button
          size="sm"
          class="button-close-form"
          variant="outline-danger"
          @click="close()"
        >
          X
        </b-button>
      </template>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(sendReview)">
          <div class="row">
            <div class="col col-sm-12 col-md-12">
              <b-form-group
                id="input-group-1"
                class="input-label-container"
                label="Calificación 0-5:"
                label-for="input-1"
              >
                <ValidationProvider rules="required|range" v-slot="{ errors }">
                  <b-form-input
                    id="input-1"
                    type="number"
                    :max="5"
                    :min="0"
                    v-model="form.score"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>

            <div class="col col-sm-12 col-md-12">
              <b-form-group
                id="input-group-2"
                label="Comentario de la reseña:"
                label-for="input-2"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|reviewPattern"
                  v-slot="{ errors }"
                >
                  <b-form-textarea
                    id="input-2"
                    v-model="form.reviewDescription"
                    :class="{ 'is-invalid': errors[0] }"
                    placeholder="Dejenos sus comentarios..."
                  ></b-form-textarea>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
          </div>

          <div class="buttonsContainer">
            <b-button type="submit" class="register-btn" variant="success"
              >Calificar</b-button
            >
            <b-button @click="closeModal" class="close-btn" id="botonCancelar">
              Cancelar
            </b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { useSecret } from "@/stores/key";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("range", {
  validate(value) {
    const number = parseInt(value, 10);
    return number >= 0 && number <= 5;
  },
  message: "La calificación debe estar entre 0 y 5",
});

extend("reviewPattern", {
  validate(value) {
    const pattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9.,;¿?¡!\s()]*$/;
    return pattern.test(value);
  },
  message:
    "El comentario solo puede contener letras, puntos, comas, caracteres acentuados, números, signos de interrogación, admiración, paréntesis y punto y coma.",
});

export default {
  name: "LeaveReviewModal",
  props: {
    order: {
      type: Object,
      required: true,
    },
    packageName: {
      type: String,
      default: null,
    },
    comboName: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      key: "",
      form: {
        reviewDescription: "",
        score: "",
        packCombName: "",
      },
    };
  },
  computed: {
    packageOrComboName() {
      return this.packageName || this.comboName;
    },
  },
  watch: {
    packageOrComboName(newValue) {
      this.form.packCombName = newValue;
    },
  },
  methods: {
    sendReview() {
      this.key = useSecret();
      const serializedData = JSON.stringify({
        orderId: this.order.orderId,
        reviewDescription: this.form.reviewDescription,
        score: this.form.score,
        packCombName: this.form.packCombName,
      });

      const encryptedData = this.$encryptionService.encryptData(
        serializedData,
        this.key
      );

      const token = localStorage.getItem("token");

      if (token) {
        this.$http
          .post("/api/reviews", encryptedData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("creacionExitosa");
            this.$swal({
              title: "Reseña agregada",
              text: "La reseña ha sido agregada, gracias por sus comentarios.",
              icon: "success",
            });
            this.closeModal();
          })
          .catch((error) => {
            if (error.response.status === 400) {
              console.log(error);
              if (error.response.data.message) {
                this.$swal({
                  title: "No se pudo completar la acción",
                  text: error.response.data.message,
                  icon: "warning",
                });
              } else {
                this.$swal({
                  title: "Error",
                  text: error.response.data,
                  icon: "error",
                });
              }
            } else {
              this.$swal({
                title: "Error",
                text: `Ocurrió un error inesperado con estado: ${error.response.status}`,
                icon: "success",
              });
            }
          });
      }
    },
    closeModal() {
      this.$root.$emit(
        "bv::hide::modal",
        `leaveReviewModal_${this.order.orderId}`
      );
      this.clearFields();
    },
    clearFields() {
      this.form.reviewDescription = "";
      this.form.score = "";
    },
  },
  mounted() {
    const secretStore = useSecret();
    this.key = secretStore.secretKey;
    this.form.packCombName = this.packageOrComboName;
  },
};
</script>

<style scoped>
.buttonsContainer {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.buttonsContainer button {
  width: 30%;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  font-size: 0.8rem;
  margin-bottom: 10px;
  margin-top: 10px;
  transition: width 0.3s;
}

.buttonsContainer button:hover {
  width: 35%;
}

.register-btn {
  margin: 0;
}

.table-button {
  margin: 0;
  background-color: white;
  border: 1px solid black;
  color: black;
  width: 100%;
}

.table-button:hover {
  margin: 0;
  background-color: #b84949;
  border: 1px solid black;
  color: white;
  width: 100%;
}

.close-btn {
  margin: 0;
}

.invalid {
  border-color: red !important;
  background-color: rgb(255, 255, 255) !important;
}

.errors {
  color: red;
}

.button-close-form {
  width: 10%;
  margin: 0;
  margin-left: auto;
}

.form-title {
  font-size: 1.5rem;
}

.input-label-container {
  margin-bottom: 15px;
}

.input-group-text {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
</style>
