<template>
  <div>
    <b-button v-b-modal.modal-1 id="addPackageButton" variant="success"
      >Agregar Paquete <b-icon id="plusIcon" icon="plus" scale="1.5"></b-icon
    ></b-button>
    <b-modal id="modal-1" title="Agregar Paquete" hide-footer>
      <template #modal-header="{ close }">
        <h5>Agregar Paquete</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
      </template>
      <b-form @submit.prevent="sendPostCreatePackage">
        <b-form-group
          id="input-group-1"
          label="Nombre del paquete:"
          label-for="input-1"
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
          label="Descripcion del paquete:"
          label-for="input-2"
        >
          <ValidationProvider rules="required|minLength" v-slot="{ errors }">
            <b-form-input
              id="input-2"
              type="text"
              v-model="form.packageDescription"
              :class="{ invalid: errors[0] }"
            ></b-form-input>
            <span class="errors">{{ errors[0] }}</span>
          </ValidationProvider>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Precio del paquete:"
          label-for="input-3"
        >
          <ValidationProvider rules="required|no-e" v-slot="{ errors }">
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
          label="Horas de duracion del paquete:"
          label-for="input-4"
        >
          <ValidationProvider rules="required|no-e" v-slot="{ errors }">
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
          label="Numero de trabajadores a asignar al paquete:"
          label-for="input-5"
        >
          <ValidationProvider rules="required|no-e" v-slot="{ errors }">
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
        >
          <select id="service" v-model="form.categoryId" name="service">
            <option
              v-for="service in services"
              :key="service.serviceId"
              :value="service.serviceId"
            >
              {{ service.serviceName }}
            </option>
          </select>
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Cargar imágenes del paquete:"
          label-for="input-7"
        >
          <ValidationProvider rules="required|ext:png" v-slot="{ errors }">
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
          <b-button type="submit" variant="primary">Registrar Paquete</b-button>
          <b-button @click="closeModal" id="botonCancelar"> Cancelar </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { extend, ValidationProvider } from "vee-validate";
import { required, min, ext } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "Este campo es requerido",
});
extend("ext", {
  ...ext,
  message: "La imagen debe ser un png",
});
extend("no-e", {
  validate: (value) => {
    if (typeof value === "number") {
      value = value.toString();
    }
    return !value.includes("e");
  },
  message: 'El campo no puede contener la letra "e".',
});
extend("minLength", {
  validate: (value) => {
    if (!value || value.length < 20) {
      return "La descripción debe contener al menos 20 caracteres.";
    }
    return true;
  },
  message: "La descripción debe contener al menos 20 caracteres.",
});
export default {
  components: {
    ValidationProvider,
  },
  name: "CreatePackageModal",
  data() {
    return {
      services: [],
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
      let formData = new FormData();
      Object.keys(this.form).forEach((key) => {
        if (key !== "images") {
          formData.append(key, this.form[key]);
        }
      });
      if (this.form.images.length) {
        for (let i = 0; i < this.form.images.length; i++) {
          formData.append("images[]", this.form.images[i]);
        }
      }
      this.$http
        .post("/api/packages", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.clearFields();
          this.$emit("registroExitoso");
          this.$swal({
            title: "Accion realizada con exito",
            text: "El paquete ha sido añadido a la lista",
            icon: "success",
          });
          this.closeModal();
        })
        .catch((error) => {
          console.error("Error en el registro del paquete: ", error);
        });
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
  },
  mounted() {
    this.$http
      .get("/api/services")
      .then((response) => {
        this.services = response.data;
      })
      .catch((e) => {
        console.error("Error en la peticion: ", e);
      });
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
</style>
