<template>
  <div>
    <b-button
      class="table-button"
      size="sm"
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
        <h5>Editar Paquete</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
      </template>
      <b-form @submit.prevent="sendPutEditPackage">
        <b-form-group
          id="input-group-1"
          label="Nombre del paquete:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            v-model="form.packageName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Descripcion del paquete:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            type="text"
            v-model="form.packageDescription"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Precio del paquete:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            type="number"
            v-model="form.packagePrice"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Horas de duracion del paquete:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            type="number"
            v-model="form.designatedHours"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Numero de trabajadores a asignar al paquete:"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            type="number"
            v-model="form.workersNumber"
            required
          ></b-form-input>
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

        <div class="buttonsContainer">
          <b-button type="submit" variant="primary">Guardar Cambios</b-button>
          <b-button @click="closeModal" id="botonCancelar"> Cancelar </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
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
      services: [],
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
      this.form.packageName = this.aPackage.packageName;
      this.form.packageDescription = this.aPackage.packageDescription;
      this.form.packagePrice = this.aPackage.packagePrice;
      this.form.designatedHours = this.aPackage.designatedHours;
      this.form.workersNumber = this.aPackage.workersNumber;
      this.form.categoryId = this.aPackage.category
        ? this.aPackage.category.serviceId
        : null;
    },
    sendPutEditPackage() {
      this.$http
        .put(`/api/packages/${this.aPackage.packageId}`, this.form)
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
          console.log(error);
        });
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

.table-button {
  margin: 0;
  background-color: white;
  border: 1px solid black;
  color: black;
  width: 100%;
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

#addServiceButton {
  width: 100%;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
</style>
