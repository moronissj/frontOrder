<template>
  <div>
    <b-button
      class="table-button"
      size="sm"
      v-b-tooltip.hover.top
      title="Editar"
      v-b-modal="`editPackageModal_${aPackage.packageId}`"
      @click="fillForm"
      variant="primary"
      ><b-icon icon="pencil-square" scale="1"></b-icon
    ></b-button>
    <b-modal
      :id="`editPackageModal_${aPackage.packageId}`"
      title="Editar Paquete"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5 class="form-title">Editar Paquete</h5>
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
        <b-form @submit.prevent="handleSubmit(sendPutEditPackage)">
          <b-form-group
            id="input-group-1"
            label="Nombre del paquete:"
            label-for="input-1"
            class="input-label-container"
          >
            <ValidationProvider
              rules="required|valid-text|max-length-name"
              v-slot="{ errors }"
            >
              <b-form-input
                id="input-1"
                type="text"
                v-model="form.packageName"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Descripción del paquete:"
            label-for="input-2"
            class="input-label-container"
          >
            <ValidationProvider
              rules="required|description-length|valid-text-description"
              v-slot="{ errors }"
            >
              <b-form-textarea
                id="input-2"
                v-model="form.packageDescription"
                :class="{ 'is-invalid': errors[0] }"
                placeholder="Ingrese la descripción del paquete aquí..."
              ></b-form-textarea>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <div class="row">
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-3"
                label="Precio del paquete:"
                label-for="input-3"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|positive-number|max-value:15000"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-3"
                    type="number"
                    v-model="form.packagePrice"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>

            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-4"
                label="Duración del paquete:"
                label-for="input-4"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|positive-number|max-value:8"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-4"
                    type="number"
                    v-model="form.designatedHours"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-5"
                label="Número de trabajadores a asignar al paquete:"
                label-for="input-5"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|positive-number|max-value:15"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-5"
                    type="number"
                    v-model="form.workersNumber"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-6"
                label="Servicio al que pertenece:"
                label-for="input-6"
                class="input-label-container"
              >
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <select id="service" v-model="form.categoryId" name="service">
                    <option
                      v-for="service in services"
                      :key="service.serviceId"
                      :value="service.serviceId"
                    >
                      {{ service.serviceName }}
                    </option>
                  </select>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
          </div>

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
import { required, numeric, regex } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("max-value", {
  validate(value, { max }) {
    return Number(value) <= max;
  },
  message: "Este campo no debe ser superior a {max}",
  params: ["max"],
});

extend("numeric", numeric);

extend("positive-number", {
  ...numeric,
  message:
    "El campo debe ser un número positivo mayor que cero y no puede contener caracteres especiales como e, +, -",
  validate: (value) => {
    if (!/^\d+$/.test(value)) {
      return false;
    }
    const number = parseInt(value, 10);
    return number > 0;
  },
});

extend("valid-text", {
  ...regex,
  message:
    "Este campo solo puede contener letras acentuadas, sin acentuar, puntos y comas",
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

export default {
  name: "EditPackageModal",
  props: {
    aPackage: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      services: [],
      backErrors: [],
      key: "",
      form: {
        packageName: "",
        packageDescription: "",
        packagePrice: null,
        designatedHours: null,
        workersNumber: null,
        categoryId: null,
      },
    };
  },
  methods: {
    fillForm() {
      console.log(this.aPackage);
      this.form.packageName = this.aPackage.packageName;
      this.form.packageDescription = this.aPackage.packageDescription;
      this.form.packagePrice = this.aPackage.packagePrice;
      this.form.designatedHours = this.aPackage.designatedHours;
      this.form.workersNumber = this.aPackage.workersNumber;
      this.form.categoryId = this.aPackage.categoryId;
    },
    sendPutEditPackage() {
      this.isLoading = true;

      this.key = useSecret();
      const serializedData = JSON.stringify({
        packageId: this.aPackage.packageId,
        packageName: this.form.packageName,
        packageDescription: this.form.packageDescription,
        packagePrice: this.form.packagePrice,
        designatedHours: this.form.designatedHours,
        workersNumber: this.form.workersNumber,
        categoryId: this.form.categoryId,
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
          .put("/api/packages/update-package", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("actualizacionExitosa");
            this.$swal({
              title: "Actualizacion exitosa",
              text: "El paquete ha sido actualizado con exito",
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
              console.error("Error al actualizar el paquete:", error);
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
        `editPackageModal_${this.aPackage.packageId}`
      );
      this.clearFields();
    },
    clearFields() {
      this.form.packageName = "";
      this.form.packageDescription = "";
      this.form.packagePrice = null;
      this.form.designatedHours = null;
      this.form.workersNumber = null;
      this.form.categoryId = null;
    },
    fetchServices() {
      const secretStore = useSecret();
      this.key = secretStore.secretKey;
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("/api/services", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.services = response.data.map((item) =>
              this.decryptServiceData(item)
            );
          })
          .catch((e) => {
            console.error("Error en la peticion: ", e);
          });
      }
    },
    decryptServiceData(item) {
      const fieldsToDecrypt = [
        "serviceId",
        "serviceName",
        "serviceDescription",
        "serviceQuote",
        "serviceImgUrl",
      ];
      fieldsToDecrypt.forEach((field) => {
        item[field] = this.$encryptionService.decryptData(
          item[field],
          this.key
        );
      });
      return item;
    },
  },
  mounted() {
    const secretStore = useSecret();
    this.key = secretStore.secretKey;
    this.fetchServices();
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
