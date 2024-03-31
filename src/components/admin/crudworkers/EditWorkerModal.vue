<template>
  <div>
    <b-button
      class="table-button"
      size="sm"
      v-b-modal="`editWorkerModal_${worker.workerId}`"
      @click="fillForm"
      variant="primary"
      ><b-icon icon="pencil-square" scale="1"></b-icon
    ></b-button>
    <b-modal
      :id="`editWorkerModal_${worker.workerId}`"
      title="Editar Trabajador"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5>Editar Trabajador</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
      </template>
      <b-form @submit.prevent="sendPutEditWorker">
        <b-form-group
          id="input-group-1"
          label="Nombre del Trabajador:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            v-model="form.workerName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Apellido Paterno Trabajador:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            type="text"
            v-model="form.workerFirstLastName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Apellido Materno del Trabajador:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.workerSecondLastName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Email del Trabajador:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            type="email"
            v-model="form.workerEmail"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Teléfono del Trabajador:"
          label-for="input-6"
        >
          <b-form-input
            id="input-6"
            type="text"
            v-model="form.workerCellphone"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-7"
          label="Número de seguridad del Trabajador:"
          label-for="input-7"
        >
          <b-form-input
            id="input-7"
            type="number"
            v-model="form.workerSecurityNumber"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-8"
          label="Salario del Trabajador:"
          label-for="input-8"
        >
          <b-form-input
            id="input-8"
            type="text"
            v-model="form.workerSalary"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-9"
          label="RFC del Trabajador:"
          label-for="input-9"
        >
          <b-form-input
            id="input-9"
            type="text"
            v-model="form.workerRfc"
            required
          ></b-form-input>
        </b-form-group>

        <div class="buttonsContainer">
          <b-button type="submit" variant="primary">Editar Trabajador</b-button>
          <b-button @click="closeModal" id="botonCancelar"> Cancelar </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "EditWorkerModal",
  props: {
    worker: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        workerName: "",
        workerFirstLastName: "",
        workerSecondLastName: "",
        workerEmail: "",
        workerCellphone: "",
        workerSecurityNumber: null,
        workerSalary: null,
        workerRfc: "",
      },
    };
  },
  methods: {
    fillForm() {
      this.form.workerName = this.worker.workerName;
      this.form.workerFirstLastName = this.worker.workerFirstLastName;
      this.form.workerSecondLastName = this.worker.workerSecondLastName;
      this.form.workerEmail = this.worker.workerEmail;
      this.form.workerCellphone = this.worker.workerCellphone;
      this.form.workerSecurityNumber = this.worker.workerSecurityNumber;
      this.form.workerSalary = this.worker.workerSalary;
      this.form.workerRfc = this.worker.workerRfc;
    },
    sendPutEditWorker() {
      this.$http
        .put(
          `/api/accounts/update-worker/info/${this.worker.workerId}`,
          this.form
        )
        .then((response) => {
          this.$emit("actualizacionExitosa");
          this.$swal({
            title: "Actualizacion exitosa",
            text: "El Trabajador ha sido actualizado con exito",
            icon: "success",
          });
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFiles(event) {
      this.form.WorkerImage = event.target.files;
    },
    closeModal() {
      this.$root.$emit(
        "bv::hide::modal",
        `editWorkerModal_${this.worker.workerId}`
      );
      this.clearFields();
    },
    clearFields() {
      this.form.workerName = "";
      this.form.workerFirstLastName = "";
      this.form.workerSecondLastName = "";
      this.form.workerEmail = "";
      this.form.workerCellphone = "";
      this.form.workerSecurityNumber = null;
      this.form.workerSalary = null;
      this.form.workerRfc = "";
      this.form.workerProfilePic = null;
    },
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

.table-button {
  margin: 0;
  background-color: white;
  border: 1px solid black;
  color: black;
  width: 100%;
}

.labelContainer {
  margin-bottom: 10px;
}

.inputContainer {
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

#addWorkerButton {
  width: 100%;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
</style>
