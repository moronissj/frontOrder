<template>
  <div>
    <b-button
      v-b-modal.modal-1
      id="addWorkerButton"
      @click="clearFields"
      variant="success"
      >Agregar Trabajador <b-icon id="plusIcon" icon="plus" scale="1.5"></b-icon
    ></b-button>
    <b-modal id="modal-1" title="Agregar Trabajador" hide-footer>
      <template #modal-header="{ close }">
        <h5 class="form-title">Agregar Trabajador</h5>
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
        <b-form @submit.prevent="handleSubmit(sendPostCreateWorker)">
          <div class="row">
            <div class="col col-sm-12 col-md-12">
              <b-form-group
                id="input-group-1"
                class="input-label-container"
                label="Nombre:"
                label-for="input-1"
              >
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-input
                    id="input-1"
                    type="text"
                    v-model="form.workerName"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-2"
                class="input-label-container"
                label="Apellido Paterno:"
                label-for="input-2"
              >
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-input
                    id="input-2"
                    type="text"
                    v-model="form.workerFirstLastName"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-3"
                class="input-label-container"
                label="Apellido Materno:"
                label-for="input-3"
              >
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-input
                    id="input-3"
                    type="text"
                    v-model="form.workerSecondLastName"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col col-sm-12 col-md-12">
              <b-form-group
                id="input-group-4"
                label="Correo electrónico:"
                label-for="input-4"
                class="input-label-container"
              >
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <b-form-input
                    id="input-4"
                    type="email"
                    v-model="form.workerEmail"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-5"
                label="Contraseña:"
                label-for="input-5"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|password|password-match:@confirm"
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
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-55"
                label="Confirmar contraseña:"
                label-for="input-55"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required"
                  name="confirm"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-55"
                    type="password"
                    v-model="confirmation"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-6"
                label="Telefono:"
                label-for="input-6"
                class="input-label-container"
              >
                <ValidationProvider rules="required|tel" v-slot="{ errors }">
                  <b-form-input
                    id="input-6"
                    type="tel"
                    v-model="form.workerCellphone"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-7"
                label="NSS:"
                label-for="input-7"
                class="input-label-container"
              >
                <ValidationProvider rules="required|nss" v-slot="{ errors }">
                  <b-form-input
                    id="input-7"
                    type="number"
                    v-model="form.workerSecurityNumber"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-8"
                label="Salario:"
                label-for="input-8"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|max_value:20000"
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
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-9"
                label="RFC:"
                class="input-label-container"
                label-for="input-9"
              >
                <ValidationProvider rules="required|rfc" v-slot="{ errors }">
                  <b-form-input
                    id="input-9"
                    type="text"
                    v-model="form.workerRfc"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
          </div>

          <b-form-group
            id="input-group-10"
            label="Foto del trabajador:"
            label-for="input-10"
            class="input-label-container"
          >
            <ValidationProvider
              rules="required|ext:jpg,png|size:10"
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
            <div class="image-preview">
              <img
                v-if="imagePreviewUrl"
                :src="imagePreviewUrl"
                alt="Vista previa"
              />
            </div>
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
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { required, ext, email, regex } from "vee-validate/dist/rules";
import { useSecret } from "@/stores/key";

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
  message: "La imagen debe ser un png o jpg",
});

extend("password", {
  validate: (value) => {
    return /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/.test(value);
  },
  message:
    "La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra mayúscula, un número y no debe contener caracteres especiales.",
});

extend("password-match", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Las contraseñas no coinciden",
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

extend("rfc", {
  ...regex,
  message: "El RFC debe tener un formato válido como XXXX00000DDD",
  validate: (value) => /^[A-Z]{4}\d{5}[A-Z0-9]{3}$/.test(value),
});

export default {
  name: "CreateWorkerModal",
  data() {
    return {
      key: "",
      confirmation: "",
      backErrors: [],
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
      imagePreviewUrl: null,
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
      this.form.workerProfilePic = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviewUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
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
      this.imagePreviewUrl = null;
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

.register-btn {
  margin: 0;
}

.close-btn {
  margin: 0;
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

.image-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.image-preview img {
  max-width: 150px;
  border-radius: 10px;
}
</style>
