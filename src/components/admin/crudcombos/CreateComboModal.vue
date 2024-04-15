<template>
  <div>
    <b-button
      v-b-modal.modal-1
      id="addComboButton"
      @click="clearFields"
      variant="success"
      >Agregar Combo <b-icon id="plusIcon" icon="plus" scale="1.5"></b-icon
    ></b-button>
    <b-modal
      id="modal-1"
      no-close-on-backdrop
      title="Agregar Combo"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5 class="form-title">Agregar Combo</h5>
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
        <b-form @submit.prevent="handleSubmit(sendPostCreateCombo)">
          <b-form-group
            id="input-group-1"
            label="Nombre del Combo:"
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
                v-model="form.comboName"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Descripción del Combo:"
            label-for="input-2"
            class="input-label-container"
          >
            <ValidationProvider
              rules="required|valid-text-description|description-length"
              v-slot="{ errors }"
            >
              <b-form-textarea
                id="input-2"
                v-model="form.comboDescription"
                :class="{ 'is-invalid': errors[0] }"
                placeholder="Ingrese la descripción del combo aquí..."
              ></b-form-textarea>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <div class="row">
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-3"
                label="Precio del Combo:"
                label-for="input-3"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|positive-number|max-value:20000"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-3"
                    type="number"
                    v-model="form.comboPrice"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-4"
                label="Horas a Asignar:"
                label-for="input-4"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|positive-number|max-value:8"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-4"
                    v-model="form.comboDesignatedHours"
                    type="number"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-5"
                label="Número de Trabajadores a Asignar:"
                label-for="input-5"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|positive-number|max-value:15"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-5"
                    v-model="form.comboWorkersNumber"
                    type="number"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-6"
                label="Paquetes a asignar al combo:"
                label-for="input-6"
                class="input-label-container"
              >
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-select
                    id="input-6"
                    v-model="form.packageIds"
                    :options="packageOptions"
                    multiple
                    :select-size="5"
                    :class="{ invalid: errors[0] }"
                  ></b-form-select>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
          </div>

          <b-form-group
            id="input-group-7"
            label="Foto del combo:"
            label-for="input-7"
            class="input-label-container"
          >
            <ValidationProvider
              rules="required|ext:png,jpg|size:2"
              v-slot="{ errors }"
            >
              <b-form-file
                id="input-7"
                v-model="form.comboImg"
                accept="image/*"
                @change="handleFiles"
                placeholder="Seleccione la imagen de portada del combo"
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
import { required, ext, numeric, regex } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
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

extend("max-value", {
  validate(value, { max }) {
    return Number(value) <= max;
  },
  message: "Este campo no debe ser superior a {max}",
  params: ["max"],
});

extend("ext", {
  ...ext,
  message: "El archivo debe ser una imagen png o jpg",
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

extend("size", {
  params: ["size"],
  validate(value, { size }) {
    if (!value || !value.size) return false;

    const sizeInMB = size * 1024 * 1024;
    return value.size <= sizeInMB;
  },
  message: "El archivo debe ser menor o igual a {size} MB.",
});

export default {
  name: "CreateComboModal",
  data() {
    return {
      isLoading: false,
      packages: [],
      packageOptions: [],
      backErrors: [],
      key: "",
      form: {
        comboName: "",
        comboDescription: "",
        comboPrice: "",
        comboDesignatedHours: "",
        comboWorkersNumber: "",
        comboImg: null,
        packageIds: [],
      },
      imagePreviewUrl: null,
    };
  },
  methods: {
    sendPostCreateCombo() {
      this.isLoading = true;

      this.key = useSecret();

      const serializedData = JSON.stringify({
        comboName: this.form.comboName,
        comboDescription: this.form.comboDescription,
        comboPrice: this.form.comboPrice,
        comboDesignatedHours: this.form.comboDesignatedHours,
        comboWorkersNumber: this.form.comboWorkersNumber,
        packageIds: this.form.packageIds,
      });

      const encryptedData = this.$encryptionService.encryptData(
        serializedData,
        this.key
      );

      let formData = new FormData();
      formData.append("data", encryptedData);

      if (this.form.comboImg) {
        formData.append("comboImg", this.form.comboImg);
      }
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .post("/api/combos", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("registroExitoso");
            this.$swal({
              title: "Creacion exitosa",
              text: "El Combo ha sido agregado con exito",
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
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    handleFiles(event) {
      const file = event.target.files[0];
      this.form.comboImg = file;
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
      this.form.comboName = "";
      this.form.comboDescription = "";
      this.form.comboPrice = "";
      this.form.comboDesignatedHours = "";
      this.form.comboWorkersNumber = "";
      this.form.comboImg = null;
      this.form.packageIds = [];
      this.imagePreviewUrl = "";
    },
    fetchPackages() {
      const secretStore = useSecret();
      this.key = secretStore.secretKey;
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("/api/packages", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.packages = response.data.map((item) =>
              this.decryptPackageData(item)
            );
            this.packageOptions = this.packages.map((pkg) => ({
              value: pkg.packageId,
              text: pkg.packageName,
            }));
          })
          .catch((e) => {
            console.error("Error en la petición: ", e);
          });
      }
    },
    decryptPackageData(item) {
      const fieldsToDecrypt = [
        "packageId",
        "packageName",
        "packageDescription",
        "packagePrice",
        "packageState",
        "designatedHours",
        "workersNumber",
        "categoryName",
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
    this.fetchPackages();
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

#addComboButton {
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
