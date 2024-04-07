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
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(sendPostCreateAdmin)">
          <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-input
                id="input-1"
                type="text"
                v-model="form.adminName"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Apellido Paterno:"
            label-for="input-2"
          >
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-input
                id="input-2"
                type="text"
                v-model="form.adminFirstLastName"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Apellido Materno:"
            label-for="input-3"
          >
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-input
                id="input-3"
                type="text"
                v-model="form.adminSecondLastName"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group id="input-group-4" label="Email:" label-for="input-4">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <b-form-input
                id="input-4"
                type="email"
                v-model="form.adminEmail"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Contraseña:"
            label-for="input-5"
          >
            <ValidationProvider rules="required|password" v-slot="{ errors }">
              <b-form-input
                id="input-5"
                type="password"
                v-model="form.adminPassword"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Telefono:"
            label-for="input-6"
          >
            <ValidationProvider rules="required|tel" v-slot="{ errors }">
              <b-form-input
                id="input-6"
                type="tel"
                v-model="form.adminCellphone"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-7"
            label="Numero de Seguridad Social (NSS):"
            label-for="input-7"
          >
            <ValidationProvider rules="required|nss" v-slot="{ errors }">
              <b-form-input
                id="input-7"
                type="number"
                v-model="form.adminSecurityNumber"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group id="input-group-8" label="Salario:" label-for="input-8">
            <ValidationProvider
              rules="required|max_value:50000"
              v-slot="{ errors }"
            >
              <b-form-input
                id="input-8"
                type="number"
                v-model="form.adminSalary"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-9"
            label="Foto del Administrador:"
            label-for="input-9"
          >
            <ValidationProvider
              rules="required|ext:jpg,png|size:8"
              v-slot="{ errors }"
            >
              <b-form-file
                id="input-9"
                v-model="form.adminProfilePic"
                accept="image/*"
                @change="handleFiles"
                placeholder="Seleccione una imagen"
                :class="{ invalid: errors[0] }"
              ></b-form-file>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <div class="buttonsContainer">
            <b-button type="submit" variant="primary"
              >Registrar Administrador</b-button
            >
            <b-button @click="closeModal" id="botonCancelar">
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
import { required, ext, email } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("email", {
  ...email,
  message: "La dirección de correo debe ser valida",
});

extend("ext", {
  ...ext,
  message: "El archivo debe ser una imagen png o jpg",
});

extend("password", {
  validate: (value) => {
    return /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/.test(value);
  },
  message:
    "La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra mayúscula, un número y no debe contener caracteres especiales.",
});

extend("tel", {
  validate: (value) => {
    if (!/^\d{10}$/.test(value)) return false;
    return value.startsWith("777") || value.startsWith("52");
  },
  message:
    "El teléfono debe ser numérico, comenzar con '777' o '52', y tener 10 dígitos.",
});

extend("nss", {
  validate: (value) => {
    return /^\d{11}$/.test(value);
  },
  message: "El número de seguridad social debe contener 11 digitos.",
});

extend("size", {
  params: ["size"],
  validate(value, { size }) {
    if (!value || !value.size) return false;

    const sizeInMB = size * 1024 * 1024;
    return value.size <= sizeInMB;
  },
  message: "El archivo debe ser menor o igual a {size} MB.",
});

extend("max_value", {
  validate(value, { max }) {
    return Number(value) <= max;
  },
  message: "El salario no debe ser superior a {max}",
  params: ["max"],
});

export default {
  name: "CreateAdminModal",
  data() {
    return {
      key: "",
      backErrors: [],
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
      const serializedData = JSON.stringify({
        adminName: this.form.adminName,
        adminFirstLastName: this.form.adminFirstLastName,
        adminSecondLastName: this.form.adminSecondLastName,
        adminEmail: this.form.adminEmail,
        adminPassword: this.form.adminPassword,
        adminCellphone: this.form.adminCellphone,
        adminSecurityNumber: this.form.adminSecurityNumber,
        adminSalary: this.form.adminSalary,
      });

      const encryptedData = this.$encryptionService.encryptData(
        serializedData,
        this.key
      );

      let formData = new FormData();
      formData.append("data", encryptedData);
      if (this.form.adminProfilePic) {
        formData.append("adminProfilePic", this.form.adminProfilePic);
      }

      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .post("/api/accounts/create-admin", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((resonse) => {
            this.$emit("registroExitoso");
            this.$swal({
              title: "Creación exitosa",
              text: "El Administrador ha sido agregado con éxito",
              icon: "success",
            });
            this.closeModal();
          })
          .catch((error) => {
            if (error.response.status === 409) {
              const message = error.response.data.message;
              this.$swal({
                title: "Opps!",
                text: message,
                icon: "warning",
              });
            } else if (error.response.status === 420) {
              const message = error.response.data.message;
              this.$swal({
                title: "Opps!",
                text: message,
                icon: "warning",
              });
            } else if (error.response.status === 400) {
              error.response.data.forEach((element) => {
                this.backErrors.push(element);
              });
              this.$swal({
                title: "Problema con la información",
                text: "Verifique que todos los campos esten llenos y que hayan cumplido con las reglas mostradas",
                icon: "warning",
                confirmButtonText: "Ok",
              });
            } else {
              console.error("Error al crear el administrador:", error);
            }
          });
      }
    },
    handleFiles(event) {
      const file = event.target.files[0];
      this.form.adminProfilePic = file;
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
  mounted() {
    this.key = useSecret();
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

.invalid {
  border-color: red !important;
  background-color: rgb(255, 255, 255) !important;
}

.errors {
  color: red;
}
</style>
