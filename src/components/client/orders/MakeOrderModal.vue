<template>
  <div style="margin-left: auto">
    <b-button
      v-b-modal.modal-1
      @click="clearFields"
      variant="outline-success"
      style="width: 25%"
      >Hacer Pedido</b-button
    >
    <b-modal id="modal-1" title="Información de Pedido" hide-footer>
      <template #modal-header="{ close }">
        <h5 class="form-title">Información de Pedido</h5>
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
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <div class="row">
            <div class="col col-sm-12 col-md-12">
              <b-form-group
                id="input-group-1"
                label="Detalles del evento:"
                class="input-label-container"
                label-for="input-1"
              >
                <ValidationProvider
                  rules="required|valid-text|text-length"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    v-model="form.orderPlace"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>

            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-2"
                label="Fecha de la orden:"
                class="input-label-container"
                label-for="input-2"
              >
                <ValidationProvider
                  rules="required|future-date"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-2"
                    type="date"
                    v-model="form.orderDate"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-3"
                label="Hora de comienzo:"
                class="input-label-container"
                label-for="input-3"
              >
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-input
                    id="input-3"
                    type="time"
                    v-model="form.orderTime"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
          </div>
          <br />

          <div class="buttonsContainer">
            <b-button
              type="submit"
              class="register-btn"
              variant="success"
              :disabled="isLoading"
            >
              <b-spinner small v-if="isLoading"></b-spinner>
              {{ isLoading ? "Cargando..." : "Registrar" }}
            </b-button>
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
import { extend } from "vee-validate";
import { required, regex } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("future-date", {
  params: ["refDate"],
  validate(value, { refDate }) {
    const currentDate = refDate ? new Date(refDate) : new Date();
    const inputDate = new Date(value);
    return inputDate.setHours(0, 0, 0, 0) > currentDate.setHours(0, 0, 0, 0);
  },
  message: "La fecha debe ser mayor que la fecha actual.",
});

extend("valid-text", {
  ...regex,
  message:
    "El campo solo puede contener letras, números, puntos, comas, paréntesis, signos de exclamación, signos de interrogación y caracteres acentuados",
  validate: (value) => {
    const pattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9;.,\s()!?]*$/;
    return pattern.test(value);
  },
});

extend("text-length", {
  validate: (value) => {
    if (!value || value.length < 50) {
      return "La descripción debe contener al menos 50 caracteres.";
    }
    if (value.length > 500) {
      return "La descripción debe contener máximo 500 caracteres.";
    }
    return true;
  },
  message: "La descripción debe contener entre 50 y 500 caracteres.",
});

export default {
  name: "Modal",
  props: {
    aPackage: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      form: {
        orderDate: null,
        orderPlace: "",
        orderTime: null,
        packageIds: [],
      },
    };
  },
  methods: {
    onSubmit() {
      this.initiatePayment();
    },
    initiatePayment() {
      this.isLoading = true;

      const paymentData = {
        orderName: this.aPackage.packageName,
        orderDescription: this.aPackage.packageDescription,
        designatedHours: Number(this.aPackage.designatedHours),
        workersNumber: Number(this.aPackage.workersNumber),
        totalPrice: Number(this.aPackage.packagePrice),
      };

      localStorage.setItem(
        "orderDetails",
        JSON.stringify({
          orderDate: this.form.orderDate,
          orderPlace: this.form.orderPlace,
          orderTime: this.form.orderTime,
          packageIds: this.form.packageIds,
        })
      );

      let formData = new FormData();
      formData.append("data", JSON.stringify(paymentData));

      this.$http
        .post("/api/payments/create-checkout-session", formData)
        .then((response) => {
          let rawResponse = JSON.stringify(response.data);
          let trimmedResponse = rawResponse
            .replace('"{url=', "")
            .replace('}"', "");
          window.location.href = trimmedResponse;
        })
        .catch((error) => {
          console.error("Error al iniciar la sesión de pago:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    closeModal() {
      this.$root.$emit("bv::hide::modal", "modal-1");
      this.clearFields();
    },
    clearFields() {
      console.log("pressed");
      this.form.orderDate = "";
      this.form.orderPlace = "";
      this.form.orderTime = "";
    },
  },
  mounted() {
    this.form.packageIds[0] = Number(this.aPackage.packageId);
    localStorage.removeItem("orderDetails");
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
