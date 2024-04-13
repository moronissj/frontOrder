<template>
  <div style="margin-left: auto">
    <b-button v-b-modal.modal-1 variant="outline-primary" style="width: 25%"
      >Hacer Pedido</b-button
    >
    <b-modal id="modal-1" title="Información de Pedido" hide-footer>
      <template #modal-header="{ close }">
        <h5 style="color: #ae0505; margin-left: 25%">Información de Pedido</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
      </template>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <b-form-group
            id="input-group-1"
            label="Direccion del evento:"
            label-for="input-1"
          >
            <ValidationProvider rules="required|valid-text" v-slot="{ errors }">
              <b-form-input
                id="input-1"
                type="text"
                v-model="form.orderPlace"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Fecha de la orden:"
            label-for="input-2"
          >
            <ValidationProvider rules="required|futureDate" v-slot="{ errors }">
              <b-form-input
                id="input-2"
                type="date"
                v-model="form.orderDate"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Hora de comienzo:"
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
          <br />
          <b-button type="submit" variant="primary">Registrar orden</b-button>
          <button type="button" @click="closeModal" id="botonCancelar">
            Cancelar
          </button>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("futureDate", {
  params: ["refDate"],
  validate(value, { refDate }) {
    const currentDate = refDate ? new Date(refDate) : new Date();
    const inputDate = new Date(value);
    return inputDate.setHours(0, 0, 0, 0) > currentDate.setHours(0, 0, 0, 0);
  },
  message: "La fecha debe ser mayor que la fecha actual.",
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
        });
    },
    closeModal() {
      this.$root.$emit("bv::hide::modal", "modal-1");
      this.clearFields();
    },
    clearFields() {
      this.orderDate = null;
      this.orderPlace = null;
      this.orderTime = null;
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
  min-width: auto;
  max-height: auto;
}

.buttonsContainer button {
  width: 30%;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  margin-bottom: 10px;
  margin-top: 10px;
  transition: width 0.3s;
  min-width: auto;
  max-height: auto;
}

.buttonsContainer button:hover {
  width: 35%;
  min-width: auto;
  max-height: auto;
}

#botonEnviar {
  background-color: rgb(32, 184, 40);
  color: white;
  min-width: auto;
  max-height: auto;
}

.invalid {
  border-color: red !important;
  background-color: rgb(255, 255, 255) !important;
}

.errors {
  color: red;
}

#botonCancelar {
  background-color: rgb(240, 51, 51);
  color: white;
  min-width: auto;
  max-height: auto;
}

#form {
  background-color: rgb(255, 255, 255);
  width: 100%;
  padding: 10px;
  min-width: auto;
  max-height: auto;
}

.fieldContainer {
  width: 100%;
  margin-bottom: 20px;
  min-width: auto;
  max-height: auto;
}

.labelContainer {
  margin-bottom: 10px;
  min-width: auto;
  max-height: auto;
}

.inputContainer {
  min-width: auto;
  max-height: auto;
}

.inputContainer input {
  padding: 10px;
  min-width: auto;
  max-height: auto;
  border: 2px solid #ae0505;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: #333;
  outline: none;
}

.inputContainer input:focus {
  border-color: #2b2b2b;
}

.inputContainer textarea {
  padding: 10px;
  min-width: auto;
  max-height: auto;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: #333;
  outline: none;
}

.inputContainer textarea:focus {
  border-color: #2b2b2b;
  min-width: auto;
  max-height: auto;
}

.inputContainer select {
  padding: 10px;
  min-width: auto;
  max-height: auto;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: #333;
  outline: none;
}

.inputContainer select:focus {
  border-color: #2b2b2b;
  min-width: auto;
  max-height: auto;
}
</style>
