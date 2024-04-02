<template>
  <div>
    <b-button v-b-modal.modal-1 id="addWorkerButton" variant="success"
      >Agregar Trabajador <b-icon id="plusIcon" icon="plus" scale="1.5"></b-icon
    ></b-button>
    <b-modal id="modal-1" title="Agregar Trabajador" hide-footer>
      <template #modal-header="{ close }">
        <h5>Agregar Trabajador</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
      </template>
      <b-form @submit.prevent="sendPostCreateWorker">

        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
          <ValidationProvider
                rules="required"
                v-slot="{ errors }"
              >
          <b-form-input
            id="input-1"
            type="text"
            v-model="form.workerName"
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
        <ValidationProvider
                rules="required"
                v-slot="{ errors }"
              >
          <b-form-input
            id="input-2"
            type="text"
            v-model="form.workerFirstLastName"
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
        <ValidationProvider
                rules="required"
                v-slot="{ errors }"
              >
          <b-form-input
            id="input-3"
            type="text"
            v-model="form.workerSecondLastName"
            :class="{ invalid: errors[0] }"
          ></b-form-input>
          <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
        </b-form-group>

        <b-form-group id="input-group-4" label="Email:" label-for="input-4">
          <ValidationProvider
                rules="required|email"
                v-slot="{ errors }"
              >
          <b-form-input
            id="input-4"
            type="email"
            v-model="form.workerEmail"
            :class="{ invalid: errors[0] }"
          ></b-form-input>
          <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
        </b-form-group>


        <b-form-group id="input-group-5" label="Password:" label-for="input-5">
          <ValidationProvider
                rules="required|password"
                v-slot="{ errors }"
              >
          <b-form-input
            id="input-5"
            type="password"
            v-model="form.workerPassword"
            :class="{ invalid: errors[0] }"
          ></b-form-input>
          <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
        </b-form-group>

        <b-form-group id="input-group-6" label="Telefono:" label-for="input-6">
          <ValidationProvider
                rules="required|phone"
                v-slot="{ errors }"
              >
          <b-form-input
            id="input-6"
            type="tel"
            v-model="form.workerCellphone"
            :class="{ invalid: errors[0] }"
          ></b-form-input>
          <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Número de seguridad:"
          label-for="input-7"
        >
        <ValidationProvider
                rules="required|no-e"
                v-slot="{ errors }"
              >
          <b-form-input
            id="input-7"
            type="number"
            v-model="form.workerSecurityNumber"
            :class="{ invalid: errors[0] }"
          ></b-form-input>
          <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
        </b-form-group>

        <b-form-group id="input-group-8" label="Salario:" label-for="input-8">
          <ValidationProvider
                rules="required|no-e"
                v-slot="{ errors }"
              >
          <b-form-input
            id="input-8"
            type="number"
            v-model="form.workerSalary"
            :class="{ invalid: errors[0] }"
          ></b-form-input>
          <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
        </b-form-group>

        <b-form-group id="input-group-9" label="RFC:" label-for="input-9">
          <ValidationProvider
                rules="required|rfc"
                v-slot="{ errors }"
              >
          <b-form-input
            id="input-9"
            type="text"
            v-model="form.workerRfc"
            :class="{ invalid: errors[0] }"
          ></b-form-input>
          <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
        </b-form-group>

        <b-form-group
          id="input-group-10"
          label="Foto del trabajador:"
          label-for="input-10"
        >
        <ValidationProvider
                rules="required|ext:png"
                v-slot="{ errors }"
              >
          <b-form-file
            id="input-10"
            v-model="form.workerProfilePic"
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
            >Registrar Trabajador</b-button
          >
          <b-button @click="closeModal" id="botonCancelar"> Cancelar </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
<<<<<<< HEAD

import { extend, ValidationProvider   } from "vee-validate";
import { required, min, ext } from "vee-validate/dist/rules";


extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("ext", {
  ...ext,
  message: "La imagen debe ser un png",
});
extend('email', {
  validate: value => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },
  message: 'El campo debe ser una dirección de correo electrónico válida.'
});

extend('phone', {
  validate: value => {
    return /^\d{10}$/.test(value);
  },
  message: 'El número de celular debe tener exactamente 10 dígitos y no contener letras.',
});

extend('password', {
  validate: value => {
    return /^(?=.*[A-Z])(?=.*\d)(?!.*[^a-zA-Z0-9]).{8,}$/.test(value);
  },
  message: 'La contraseña debe contener al menos una letra mayúscula, un número y no debe contener caracteres especiales.',
});
extend('no-e', {
  validate: value => {
    if (typeof value === 'number') {
      value = value.toString();
    }
    return !value.includes('e');
  },
  message: 'El campo no puede contener la letra "e".',
});
extend('rfc', {
  validate: value => {
    // Expresión regular para validar el formato de RFC
    const rfcRegex = /^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z1-9]\d{1}$/;
    return rfcRegex.test(value);
  },
  message: 'El RFC ingresado no es válido. Verifica que tenga el formato correcto.'
});
=======
import { useSecret } from "@/stores/key";

>>>>>>> b1a8c2b0fe09641d5abbc04402354b65b86d6cdc
export default {
  components: {
    ValidationProvider
  },
  name: "CreateWorkerModal",
  data() {
    return {
      key: "",
      form: {
        workerName: "",
        workerFirstLastName: "",
        workerSecondLastName: "",
        workerEmail: "",
        workerPassword: "",
        workerCellphone: "",
        workerSecurityNumber: null,
        workerSalary: null,
        workerRfc: "",
        workerProfilePic: null,
      },
    };
  },
  methods: {
    sendPostCreateWorker() {
      const serializedData = JSON.stringify({
        workerName: this.form.workerName,
        workerFirstLastName: this.form.workerFirstLastName,
        workerSecondLastName: this.form.workerSecondLastName,
        workerEmail: this.form.workerEmail,
        workerCellphone: this.form.workerCellphone,
        workerSecurityNumber: this.form.workerSecurityNumber,
        workerSalary: this.form.workerSalary,
        workerPassword: this.form.workerPassword,
        workerRfc: this.form.workerRfc,
      });

      const encryptedData = this.$encryptionService.encryptData(
        serializedData,
        this.key
      );

      let formData = new FormData();
      formData.append("data", encryptedData);
      if (this.form.workerProfilePic) {
        formData.append("workerProfilePic", this.form.workerProfilePic);
      }
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .post("/api/accounts/create-worker", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("registroExitoso");
            this.$swal({
              title: "Creación exitosa",
              text: "El trabajador ha sido agregado con éxito",
              icon: "success",
            });
            this.closeModal();
          })
          .catch((error) => {
            console.error("Error al crear el trabajador:", error);
          });
      }
    },
    handleFiles(event) {
      this.form.workerProfilePic = event.target.files[0];
    },
    closeModal() {
      this.$root.$emit("bv::hide::modal", "modal-1");
      this.clearFields();
    },
    clearFields() {
      this.form.workerName = "";
      this.form.workerFirstLastName = "";
      this.form.workerSecondLastName = "";
      this.form.workerProfilePic = null;
      this.form.workerEmail = "";
      this.form.workerPassword = "";
      this.form.workerCellphone = "";
      this.form.workerSecurityNumber = null;
      this.form.workerSalary = null;
      this.form.workerRfc = "";
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

#addWorkerButton {
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
