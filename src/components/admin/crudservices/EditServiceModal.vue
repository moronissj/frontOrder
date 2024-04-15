<template>
  <div>
    <b-button
      class="table-button"
      v-b-tooltip.hover.top
      title="Editar"
      size="sm"
      v-b-modal="`editServiceModal_${service.serviceId}`"
      @click="fillForm"
      variant="primary"
      ><b-icon icon="pencil-square" scale="1"></b-icon
    ></b-button>
    <b-modal
      no-close-on-backdrop
      :id="`editServiceModal_${service.serviceId}`"
      title="Editar Servicio"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5 class="form-title">Editar Servicio</h5>
        <b-button
          class="button-close-form"
          size="sm"
          variant="outline-danger"
          @click="close()"
        >
          X
        </b-button>
      </template>

      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(sendPutEditService)">
          <b-form-group
            id="input-group-1"
            label="Nombre del servicio:"
            label-for="input-1"
            class="input-label-container"
          >
            <ValidationProvider rules="required|valid-name" v-slot="{ errors }">
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
              rules="required|min-length-quote|valid-text-entry"
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

          <div class="buttonsContainer">
            <b-button
              type="submit"
              class="register-btn"
              variant="success"
              :disabled="isLoading"
            >
              <b-spinner small v-if="isLoading"></b-spinner>
              {{ isLoading ? "Cargando..." : "Actualizar" }}
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
import { required, regex } from "vee-validate/dist/rules";

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

extend("valid-text-entry", {
  ...regex,
  message:
    "El campo descripción solo puede contener letras, puntos, comas, paréntesis, signos de exclamación, signos de interrogación y caracteres acentuados",
  validate: (value) => {
    const pattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ.,\s()!?]*$/;
    return pattern.test(value);
  },
});

extend("required", {
  ...required,
  message: "Este campo es requerido",
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

extend("min-length-quote", {
  validate: (value) => {
    if (!value || value.length < 10) {
      return "La frase debe contener al menos 10 caracteres.";
    }
    return true;
  },
  message: "La frase debe contener al menos 10 caracteres.",
});

export default {
  name: "EditServiceModal",
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      key: "",
      form: {
        serviceName: "",
        serviceDescription: "",
        serviceQuote: "",
      },
    };
  },
  methods: {
    fillForm() {
      this.form.serviceName = this.service.serviceName;
      this.form.serviceDescription = this.service.serviceDescription;
      this.form.serviceQuote = this.service.serviceQuote;
    },
    sendPutEditService() {
      this.isLoading = true;
      console.log(this.form.serviceDescription);
      const serializedData = JSON.stringify({
        serviceId: this.service.serviceId,
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

      const token = localStorage.getItem("token");

      if (token) {
        this.$http
          .put("/api/services/update-service", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("actualizacionExitosa");
            this.$swal({
              title: "Actualizacion exitosa",
              text: "El servicio ha sido actualizado con exito",
              icon: "success",
            });
            this.closeModal();
          })
          .catch((error) => {
            if (error.response.status === 419) {
              const message = error.response.data.message;
              this.$swal({
                title: "Error",
                text: message,
                icon: "error",
              });
            } else {
              console.error("Error al actualizar el servicio:", error);
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    closeModal() {
      this.$root.$emit(
        "bv::hide::modal",
        `editServiceModal_${this.service.serviceId}`
      );
      this.clearFields();
    },
    clearFields() {
      this.form.serviceName = "";
      this.form.serviceDescription = "";
      this.form.serviceQuote = "";
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

.table-button {
  margin: 0;
  background-color: white;
  border: 1px solid black;
  color: black;
  width: 100%;
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
