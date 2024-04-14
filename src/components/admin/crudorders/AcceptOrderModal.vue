<template>
  <div>
    <b-button
      v-b-modal="`acceptOrderModal_${id}`"
      @click="clearFields"
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
        <h5 class="form-title">Aceptacion de orden</h5>
        <b-button
          class="button-close-form"
          size="sm"
          variant="outline-danger"
          @click="close()"
        >
          X
        </b-button>
      </template>
      <p style="font-size: 1.1rem; margin-bottom: 0">
        Antes de aceptar la orden porfavor selecciona los trabajadores a
        asignar,
        <span style="font-weight: 600">
          para seleccionarlos manten presionada la tecla ctrl de tu teclado
          mientras haces click sobre ellos</span
        >
      </p>
      <br />
      <b-form @submit.prevent="sendOrderConfirmation">
        <b-form-group
          id="input-group-1"
          label="Trabajadores:"
          label-for="input-1"
          style="margin-bottom: 20px"
        >
          <b-form-select
            id="input-2"
            v-model="form.workerIds"
            :options="workerOptions"
            multiple
            :select-size="10"
          ></b-form-select>
        </b-form-group>

        <div class="buttonsContainer">
          <b-button type="submit" class="register-btn" variant="success"
            >Registrar</b-button
          >
          <b-button @click="closeModal" class="close-btn" id="botonCancelar">
            Cancelar
          </b-button>
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
      this.key = useSecret();
      const serializedData = JSON.stringify({
        orderId: this.form.orderId,
        workerIds: this.form.workerIds,
      });
      const encryptedData = this.$encryptionService.encryptData(
        serializedData,
        this.key
      );

      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .patch("/api/orders/accept-and-assign", encryptedData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.$emit("registroExitoso");
            this.$swal({
              title: "Confirmación realizada",
              text: "La confirmación ha sido realizada con éxito",
              icon: "success",
            });
            this.closeModal();
          })
          .catch((error) => {
            console.log(error);
            if (error.response.data.code === 500) {
              this.$swal({
                title: "Error en la confirmación",
                text: "El pago ya ha sido capturado una vez, eso significa que la orden ya habia sido aceptada, no es posible aceptar una orden por segunda vez.",
                icon: "error",
              });
            } else if (error.response.data.code === 400) {
              this.$swal({
                title: "Alto! hay un problema",
                text: error.response.data.message,
                icon: "warning",
              });
            }
          });
      }
    },
    closeModal() {
      this.$root.$emit("bv::hide::modal", `acceptOrderModal_${this.id}`);
      this.clearFields();
    },
    clearFields() {
      this.form.workerIds = [];
    },
    fetchWorkers() {
      const secretStore = useSecret();
      this.key = secretStore.secretKey;
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("/api/accounts/workers")
          .then((response) => {
            this.workers = response.data.map((worker) => {
              this.decryptWorkerData(worker);
            });
            this.workers = response.data;
            this.workerOptions = this.workers.map((work) => ({
              value: work.workerId,
              text: `# ${work.workerId} - ${work.workerName} ${work.workerFirstLastName} ${work.workerSecondLastName}`,
            }));
          })
          .catch((e) => {
            console.error("Error en la petición: ", e);
          });
      }
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

.form-title {
  font-size: 1.5rem;
}

.button-close-form {
  width: 10%;
  margin: 0;
  margin-left: auto;
}

.labelContainer {
  margin-bottom: 10px;
}

.table-button {
  margin: 0;
  background-color: white;
  border: 1px solid black;
  color: black;
  width: 100%;
}
</style>
