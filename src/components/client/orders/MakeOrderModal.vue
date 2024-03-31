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
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Direccion del evento:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            v-model="form.orderPlace"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Fecha de la orden:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            type="date"
            v-model="form.orderDate"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Hora de comienzo:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            type="time"
            v-model="form.orderTime"
            required
          ></b-form-input>
        </b-form-group>
        <br />
        <b-button type="submit" variant="primary">Registrar orden</b-button>
        <button type="button" @click="closeModal" id="botonCancelar">
          Cancelar
        </button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    packageId: {
      type: Number,
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
      const token = localStorage.getItem("token");
      const combinedDateTime = `${this.form.orderDate}T${this.form.orderTime}:00`;
      const formData = {
        orderDate: this.form.orderDate,
        orderPlace: this.form.orderPlace,
        orderTime: combinedDateTime,
        packagesIds: [this.form.packageIds[0]],
      };
      console.log(formData);
      if (token) {
        this.$http
          .post("api/orders", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("registroExitoso");
            this.$swal({
              title: "Registrada",
              text: "Orden registrada con exito, espera la confirmacion de uno de nuestros administradores",
              icon: "success",
            });
            this.closeModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
    this.form.packageIds[0] = this.packageId;
    console.log(this.form);
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
