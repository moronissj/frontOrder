<template>
  <div>
    <b-button
      v-b-modal.modal-1
      id="addServiceButton"
      @click="clearFields"
      variant="success"
      >Agregar Servicio <b-icon id="plusIcon" icon="plus" scale="1.5"></b-icon
    ></b-button>
    <b-modal id="modal-1" title="Agregar Servicio" hide-footer>
      <template #modal-header="{ close }">
        <h5 class="form-title">Agregar Servicio</h5>
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
        <b-form @submit.prevent="handleSubmit(sendPostCreateService)">
          <b-form-group
            id="input-group-1"
            label="Nombre del servicio:"
            label-for="input-1"
            class="input-label-container"
          >
            <ValidationProvider
              rules="required|valid-name|max-length-name"
              v-slot="{ errors }"
            >
              <b-form-input
                id="input-1"
                type="text"
                v-model="form.serviceName"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Descripcion del servicio:"
            label-for="input-2"
            class="input-label-container"
          >
            <ValidationProvider
              rules="required|description-length|valid-text-description"
              v-slot="{ errors }"
            >
              <b-form-textarea
                id="input-2"
                v-model="form.serviceDescription"
                :class="{ 'is-invalid': errors[0] }"
                placeholder="Ingrese la descripción del servicio aquí..."
              ></b-form-textarea>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Frase del servicio:"
            label-for="input-3"
            class="input-label-container"
          >
            <ValidationProvider
              rules="required|quote-length|valid-text-entry"
              v-slot="{ errors }"
            >
              <b-form-input
                id="input-3"
                type="text"
                v-model="form.serviceQuote"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Imagen del servicio:"
            label-for="input-4"
            class="input-label-container"
          >
            <ValidationProvider
              rules="required|ext:jpg,png|size:20"
              v-slot="{ errors }"
            >
              <b-form-file
                id="input-4"
                v-model="form.serviceImage"
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
            <b-button
              type="submit"
              class="register-btn"
              variant="success"
              :disabled="isLoading"
            >
              <b-spinner small v-if="isLoading"></b-spinner>
              {{ isLoading ? "Cargando..." : "Registrar" }}
            </b-button>
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
import { required, ext, regex } from "vee-validate/dist/rules";

extend("valid-name", {
  ...regex,
  message:
    "El campo nombre solo puede contener letras, puntos, comas, y caracteres acentuados",
  validate: (value) => {
    const pattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ.,\s]*$/;
    return pattern.test(value);
  },
});

extend("valid-text-description", {
  ...regex,
  message:
    "El campo descripción solo puede contener letras, números, puntos, comas, paréntesis, signos de exclamación, signos de interrogación y caracteres acentuados",
  validate: (value) => {
    const pattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9;.,\s()!?]*$/;
    return pattern.test(value);
  },
});

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("ext", {
  ...ext,
  message: "El archivo debe ser una imagen png o jpg",
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

extend("description-length", {
  validate: (value) => {
    if (!value || value.length < 50) {
      return "La descripción debe contener al menos 50 caracteres.";
    }
    if (value.length > 500) {
      return "La descripción debe contener máximo 500 caracteres.";
    }
    return true;
  },
  message: "La descripción debe contener entre 50 y 500 caracteres.",
});

extend("max-length-name", {
  validate: (value) => {
    if (!value || value.length > 20) {
      return "El nombre debe tener máximo 20 caracteres.";
    }
    return true;
  },
  message: "El nombre debe tener máximo 20 caracteres.",
});

extend("quote-length", {
  validate: (value) => {
    if (!value || value.length < 10) {
      return "La frase debe contener al menos 10 caracteres.";
    }
    if (value.length > 60) {
      return "La frase debe contener máximo 60 caracteres.";
    }
    return true;
  },
  message: "La frase debe contener entre 10 y 60 caracteres.",
});

export default {
  name: "CreateServiceModal",
  data() {
    return {
      isLoading: false,
      key: "",
      form: {
        serviceName: "",
        serviceDescription: "",
        serviceQuote: "",
        serviceImage: null,
      },
      imagePreviewUrl: null,
    };
  },
  methods: {
    sendPostCreateService() {
      this.isLoading = true;
      const serializedData = JSON.stringify({
        serviceName: this.form.serviceName,
        serviceDescription: this.form.serviceDescription,
        serviceQuote: this.form.serviceQuote,
      });

      const encryptedData = this.$encryptionService.encryptData(
        serializedData,
        this.key
      );

      let formData = new FormData();
      formData.append("data", encryptedData);

      if (this.form.serviceImage) {
        formData.append("serviceImage", this.form.serviceImage);
      }

      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .post("/api/services", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("registroExitoso");
            this.$swal({
              title: "Creacion exitosa",
              text: "El servicio ha sido agregada con exito",
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
            } else if (error.response.status === 400) {
              this.$swal({
                title: "Problema con la información",
                text: error.response.data,
                icon: "warning",
                confirmButtonText: "Ok",
              });
            } else if (error.response.status === 413) {
              const message = error.response.data.message;
              this.$swal({
                title: "Opps!",
                text: `${message} de 20mb`,
                icon: "warning",
              });
            } else {
              console.log(error);
              this.$swal({
                title: "Error",
                text: error.response.status,
                icon: "error",
              });
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    handleFiles(event) {
      const file = event.target.files[0];
      this.form.serviceImage = file;
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
      this.form.serviceName = "";
      this.form.serviceDescription = "";
      this.form.serviceQuote = "";
      this.form.serviceImage = null;
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

#addServiceButton {
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
