<template>
  <div>
    <b-button
      v-b-modal="`acceptOrderModal_${id}`"
      id="acceptOrderModal"
      variant="success"
      class="table-button"
      ><b-icon icon="check2" scale="1.2"></b-icon
    ></b-button>
    <b-modal
      :id="`acceptOrderModal_${id}`"
      title="Aceptacion de orden"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5>Aceptacion de orden</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
      </template>
      <p>
        Antes de aceptar la orden porfavor selecciona los trabajadores a asignar
      </p>
      <b-form @submit.prevent="sendOrderConfirmation">
        <b-form-group
          id="input-group-1"
          label="Trabajadores a asignar a la orden:"
          label-for="input-1"
        >
          <b-form-select
            id="input-2"
            v-model="form.workerIds"
            :options="workerOptions"
            multiple
            :select-size="15"
          ></b-form-select>
        </b-form-group>

        <div class="buttonsContainer">
          <b-button type="submit" variant="primary">Confirmar Orden</b-button>
          <b-button @click="closeModal" id="botonCancelar"> Cancelar </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { useSecret } from "@/stores/key";

export default {
  name: "AcceptOrderModal",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      key: "",
      workers: [],
      workerOptions: [],
      form: {
        orderId: "",
        workerIds: [],
      },
    };
  },
  methods: {
    sendOrderConfirmation() {
      this.$http
        .patch("/api/orders/accept-and-assign", this.form)
        .then((response) => {
          this.$emit("registroExitoso");
          this.$swal({
            title: "Confirmacion realizada",
            text: "La confirmacion ha sido realizada con exito",
            icon: "success",
          });
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeModal() {
      this.$root.$emit("bv::hide::modal", `acceptOrderModal_${this.id}`);
      this.clearFields();
    },
    clearFields() {
      this.form.workerIds = [];
    },
    fetchWorkers() {
      this.$http
        .get("/api/accounts/workers")
        .then((response) => {
          console.log(response.data);
          this.workers = response.data.map((worker) => {
            this.decryptWorkerData(worker);
          });
          this.workerOptions = this.workers.map((work) => ({
            value: work.workerId,
            text: work.workerName,
          }));
        })
        .catch((e) => {
          console.error("Error en la petición: ", e);
        });
    },
    decryptWorkerData(worker) {
      const fieldsToDecrypt = [
        "workerId",
        "workerName",
        "workerFirstLastName",
        "workerSecondLastName",
        "workerRfc",
        "workerCellphone",
        "workerSecurityNumber",
        "workerSalary",
        "workerEmail",
        "workerProfilePicUrl",
      ];

      fieldsToDecrypt.forEach((field) => {
        worker[field] = this.$encryptionService.decryptData(
          worker[field],
          this.key
        );
      });

      return worker;
    },
  },
  mounted() {
    const secretStore = useSecret();
    this.form.orderId = this.id;
    this.key = secretStore.secretKey;
    this.fetchWorkers();
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
  margin-bottom: 10px;
  margin-top: 10px;
  transition: width 0.3s;
}

.buttonsContainer button:hover {
  width: 35%;
}

#botonEnviar {
  background-color: rgb(51, 139, 240);
  color: white;
}

#botonCancelar {
  background-color: rgb(240, 51, 51);
  color: white;
}

#form {
  width: 100%;
  padding: 10px;
}

.fieldContainer {
  width: 100%;
  margin-bottom: 20px;
}

.labelContainer {
  margin-bottom: 10px;
}

.inputContainer {
  width: 100%;
}

.table-button {
  margin: 0;
  background-color: white;
  border: 1px solid black;
  color: black;
  width: 100%;
}

.inputContainer input {
  padding: 10px;
  width: 100%;
  border: 2px solid #ccc;
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
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: #333;
  outline: none;
}

.inputContainer textarea:focus {
  border-color: #2b2b2b;
}

.inputContainer select {
  padding: 10px;
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: #333;
  outline: none;
}

.inputContainer select:focus {
  border-color: #2b2b2b;
}

#acceptOrderModal {
  width: 100%;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
</style>
