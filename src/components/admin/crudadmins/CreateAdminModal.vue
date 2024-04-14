<template>
  <div>
    <b-button
      v-b-modal.modal-1
      id="addAdminButton"
      @click="clearFields"
      variant="success"
      >Agregar Administrador
      <b-icon id="plusIcon" icon="plus" scale="1.5"></b-icon
    ></b-button>
    <b-modal id="modal-1" title="Agregar Administrador" hide-footer>
      <template #modal-header="{ close }">
        <h5 class="form-title">Agregar Administrador</h5>
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
        <b-form @submit.prevent="handleSubmit(sendPostCreateAdmin)">
          <div class="row">
            <div class="col col-sm-12 col-md-12">
              <b-form-group
                id="input-group-1"
                class="input-label-container"
                label="Nombre:"
                label-for="input-1"
              >
                <ValidationProvider
                  rules="required|valid-name-part"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    v-model="form.adminName"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-2"
                label="Apellido Paterno:"
                class="input-label-container"
                label-for="input-2"
              >
                <ValidationProvider
                  rules="required|valid-name-part"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-2"
                    type="text"
                    v-model="form.adminFirstLastName"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-3"
                label="Apellido Materno:"
                class="input-label-container"
                label-for="input-3"
              >
                <ValidationProvider
                  rules="required|valid-name-part"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-3"
                    type="text"
                    v-model="form.adminSecondLastName"
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
                    v-model="form.adminEmail"
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
                    v-model="form.adminPassword"
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
                label="Celular:"
                label-for="input-6"
                class="input-label-container"
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
                    v-model="form.adminSecurityNumber"
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
                  rules="required|max_value:50000"
                  v-slot="{ errors }"
                >
                  <b-input-group prepend="$">
                    <b-form-input
                      id="input-8"
                      type="number"
                      v-model="form.adminSalary"
                      :class="{ invalid: errors[0] }"
                    ></b-form-input>
                  </b-input-group>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
          </div>

          <b-form-group
            id="input-group-9"
            class="input-label-container"
            label="Foto del Administrador:"
            label-for="input-9"
          >
            <ValidationProvider
              rules="required|ext:jpg,png|size:20"
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
import { useSecret } from "@/stores/key";
import { extend } from "vee-validate";
import { required, ext, email, regex } from "vee-validate/dist/rules";

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
    "El número telefónico debe ser numérico, comenzar con '777' o '52', y tener 10 dígitos.",
});

extend("valid-name-part", {
  ...regex,
  message: "Este campo solo puede contener letras acentuadas y sin acentuar",
  validate: (value) => {
    const pattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$/;
    return pattern.test(value);
  },
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
      confirmation: "",
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
      imagePreviewUrl: null,
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
              text: "El Administrador ha sido agregado con éxito.",
              icon: "success",
            });
            this.closeModal();
          })
          .catch((error) => {
            if (error.response.status === 409) {
              const message = error.response.data.message;
              this.$swal({
                title: "Opps!",
                text: `${message} es posible que el correo o NSS ya esten en uso, verifique la información.`,
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
                text: "Verifique que todos los campos esten llenos y que hayan cumplido con las reglas mostradas.",
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
      this.form.adminName = "";
      this.form.adminFirstLastName = "";
      this.form.adminSecondLastName = "";
      this.form.adminEmail = "";
      this.form.adminPassword = "";
      this.form.adminCellphone = "";
      this.form.adminSecurityNumber = null;
      this.form.adminSalary = null;
      this.form.adminProfilePic = null;
      this.confirmation = "";
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
  font-size: 0.8rem;
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
