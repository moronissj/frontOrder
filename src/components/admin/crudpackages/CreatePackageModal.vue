<template>
  <div>
    <b-button
      v-b-modal.modal-1
      id="addPackageButton"
      @click="clearFields"
      variant="success"
      >Agregar Paquete <b-icon id="plusIcon" icon="plus" scale="1.5"></b-icon
    ></b-button>
    <b-modal id="modal-1" title="Agregar Paquete" hide-footer>
      <template #modal-header="{ close }">
        <h5 class="form-title">Agregar Paquete</h5>
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
        <b-form @submit.prevent="handleSubmit(sendPostCreatePackage)">
          <b-form-group
            id="input-group-1"
            label="Nombre del paquete:"
            label-for="input-1"
            class="input-label-container"
          >
            <ValidationProvider rules="required" v-slot="{ errors }">
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
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-textarea
                id="input-2"
                v-model="form.packageDescription"
                :class="{ 'is-invalid': errors[0] }"
                placeholder="Ingrese la descripción del paquete aquí..."
              ></b-form-textarea>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Precio del paquete:"
            label-for="input-3"
            class="input-label-container"
          >
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-input
                id="input-3"
                type="number"
                v-model="form.packagePrice"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Horas de duración del paquete:"
            label-for="input-4"
            class="input-label-container"
          >
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-input
                id="input-4"
                type="number"
                v-model="form.designatedHours"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Número de trabajadores a asignar al paquete:"
            label-for="input-5"
            class="input-label-container"
          >
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-input
                id="input-5"
                type="number"
                v-model="form.workersNumber"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

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

          <b-form-group
            id="input-group-7"
            label="Cargar imágenes del paquete:"
            label-for="input-7"
            class="input-label-container"
          >
            <ValidationProvider
              rules="required|ext:jpg,png"
              v-slot="{ errors }"
            >
              <b-form-file
                id="input-7"
                v-model="form.images"
                :multiple="true"
                accept="image/*"
                @change="handleFiles"
                placeholder="Seleccione una o varias imágenes..."
                :class="{ invalid: errors[0] }"
              ></b-form-file>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
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
import { required, ext } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("ext", {
  ...ext,
  message: "El archivo debe ser una imagen png o jpg",
});

export default {
  name: "CreatePackageModal",
  data() {
    return {
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
        images: [],
      },
    };
  },
  methods: {
    sendPostCreatePackage() {
      this.key = useSecret();

      const serializedData = JSON.stringify({
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

      if (this.form.images && this.form.images.length) {
        for (let i = 0; i < this.form.images.length; i++) {
          formData.append("images", this.form.images[i]);
        }
      }

      console.log(formData);

      const token = localStorage.getItem("token");

      if (token) {
        this.$http
          .post("/api/packages", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("registroExitoso");
            this.$swal({
              title: "Acción realizada con éxito",
              text: "El paquete ha sido añadido a la lista",
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
              console.error("Error al crear el servicio:", error);
            }
          });
      }
    },
    handleFiles(event) {
      this.form.images = Array.from(event.target.files);
    },
    closeModal() {
      this.$root.$emit("bv::hide::modal", "modal-1");
      this.clearFields();
    },
    clearFields() {
      this.form.packageName = "";
      this.form.packageDescription = "";
      this.form.packagePrice = null;
      this.form.designatedHours = null;
      this.form.workersNumber = null;
      this.form.categoryId = null;
      this.form.images = [];
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

#addPackageButton {
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
