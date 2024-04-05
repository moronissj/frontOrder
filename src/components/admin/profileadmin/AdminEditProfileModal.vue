<template>
  <div>
    <b-button
      class="table-button"
      size="sm"
      v-b-modal="`adminEditProfileModal_${admin.adminId}`"
      @click="fillForm"
      variant="warning"
      >Editar</b-button
    >
    <b-modal
      :id="`adminEditProfileModal_${admin.adminId}`"
      title="Editar Administrador"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5>Editar Administrador</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
      </template>
      <b-form @submit.prevent="sendPutEditAdmin">
        <b-form-group
          id="input-group-1"
          label="Nombre del Administrador:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            v-model="form.adminName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Apellido Paterno Administrador:"
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
          label="Apellido Materno del Administrador:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.adminSecondLastName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Teléfono del Administrador:"
          label-for="input-6"
        >
          <b-form-input
            id="input-6"
            type="tel"
            v-model="form.adminCellphone"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Número de seguridad del Administrador:"
          label-for="input-7"
        >
          <b-form-input
            id="input-7"
            type="number"
            v-model="form.adminSecurityNumber"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-8"
          label="Salario del Administrador:"
          label-for="input-8"
        >
          <b-form-input
            id="input-8"
            type="text"
            v-model="form.adminSalary"
            required
          ></b-form-input>
        </b-form-group>

        <div class="buttonsContainer">
          <b-button type="submit" variant="primary"
            >Editar Administrador</b-button
          >
          <b-button @click="closeModal" id="botonCancelar"> Cancelar </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AdminEditProfileModal",
  props: {
    admin: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        adminName: "",
        adminFirstLastName: "",
        adminSecondLastName: "",
        adminEmail: "",
        adminCellphone: "",
        adminSecurityNumber: null,
        adminSalary: null,
        adminRfc: "",
      },
    };
  },
  methods: {
    fillForm() {
      this.form.adminName = this.admin.adminName;
      this.form.adminFirstLastName = this.admin.adminFirstLastName;
      this.form.adminSecondLastName = this.admin.adminSecondLastName;
      this.form.adminEmail = this.admin.adminEmail;
      this.form.adminCellphone = this.admin.adminCellphone;
      this.form.adminSecurityNumber = this.admin.adminSecurityNumber;
      this.form.adminSalary = this.admin.adminSalary;
      this.form.adminRfc = this.admin.adminRfc;
    },
    sendPutEditAdmin() {
      this.$http
        .put(`/api/accounts/update-admin/info/${this.admin.adminId}`, this.form)
        .then((response) => {
          this.$emit("actualizacionExitosa");
          this.$swal({
            title: "Actualizacion exitosa",
            text: "El Administrador ha sido actualizado con exito",
            icon: "success",
          });
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFiles(event) {
      const file = event.target.files[0];
      this.form.adminImage = file;
    },
    closeModal() {
      this.$root.$emit(
        "bv::hide::modal",
        `adminEditProfileModal_${this.admin.adminId}`
      );
      this.clearFields();
    },
    clearFields() {
      this.form.adminName = "";
      this.form.adminFirstLastName = "";
      this.form.adminSecondLastName = "";
      this.form.adminEmail = "";
      this.form.adminCellphone = "";
      this.form.adminSecurityNumber = null;
      this.form.adminSalary = null;
      this.form.adminRfc = "";
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

#addadminButton {
  width: 100%;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
</style>
