<template>
  <div>
    <b-button v-b-modal.modal-1 id="addAdminButton" variant="success"
      >Agregar Administrador
      <b-icon id="plusIcon" icon="plus" scale="1.5"></b-icon
    ></b-button>
    <b-modal id="modal-1" title="Agregar Administrador" hide-footer>
      <template #modal-header="{ close }">
        <h5>Agregar Administrador</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
      </template>
      <b-form @submit.prevent="sendPostCreateAdmin">
        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
          <b-form-input
            id="input-1"
            type="text"
            v-model="form.adminName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Apellido Paterno:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            type="text"
            v-model="form.adminFirstLastName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Apellido Materno:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.adminSecondLastName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Email:" label-for="input-4">
          <b-form-input
            id="input-4"
            type="email"
            v-model="form.adminEmail"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Contraseña:"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            type="password"
            v-model="form.adminPassword"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-6" label="Telefono:" label-for="input-6">
          <b-form-input
            id="input-6"
            type="text"
            v-model="form.adminCellphone"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Numero de Seguridad:"
          label-for="input-7"
        >
          <b-form-input
            id="input-7"
            type="number"
            v-model="form.adminSecurityNumber"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-8" label="Salario:" label-for="input-8">
          <b-form-input
            id="input-8"
            type="number"
            v-model="form.adminSalary"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-9"
          label="Foto del Administrador:"
          label-for="input-9"
        >
          <b-form-file
            id="input-9"
            v-model="form.adminProfilePic"
            accept="image/*"
            @change="handleFiles"
            placeholder="Seleccione una imagen"
          ></b-form-file>
        </b-form-group>

        <div class="buttonsContainer">
          <b-button type="submit" variant="primary"
            >Registrar Servicio</b-button
          >
          <b-button @click="closeModal" id="botonCancelar"> Cancelar </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "CreateAdminModal",
  data() {
    return {
      form: {
        adminName: "",
        adminFirstLastName: "",
        adminSecondLastName: "",
        adminEmail: "",
        adminPassword: "",
        adminCellphone: "",
        adminSecurityNumber: null,
        adminSalary: null,
        adminProfilePic: null,
      },
    };
  },
  methods: {
    sendPostCreateAdmin() {
      this.$http
        .post("/api/accounts/create-admin", this.form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$emit("registroExitoso");
          this.$swal({
            title: "Creacion exitosa",
            text: "El admin ha sido agregada con exito",
            icon: "success",
          });
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFiles(event) {
      this.form.adminProfilePic = event.target.files;
    },
    closeModal() {
      this.$root.$emit("bv::hide::modal", "modal-1");
      this.clearFields();
    },
    clearFields() {
      this.form.adminName = "";
      this.form.adminFirstLastName = "";
      this.form.adminSecondLastName = "";
      this.form.adminEmail = "";
      this.form.adminPassword = "";
      this.form.adminCellphone = "";
      this.form.adminSecurityNumber = null;
      this.form.adminSalary = null;
      this.form.adminProfilePic = null;
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

#addAdminButton {
  width: 100%;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
</style>
