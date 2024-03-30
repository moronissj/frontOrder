<template>
  <div>
    <b-button v-b-modal.modal-1 id="addComboButton" variant="success"
      >Agregar Combo <b-icon id="plusIcon" icon="plus" scale="1.5"></b-icon
    ></b-button>
    <b-modal id="modal-1" title="Agregar Combo" hide-footer>
      <template #modal-header="{ close }">
        <h5>Agregar Combo</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
      </template>
      <b-form @submit.prevent="sendPostCreateCombo">
        <b-form-group
          id="input-group-1"
          label="Nombre del Combo:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            v-model="form.comboName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Descripcion del Combo:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            type="text"
            v-model="form.comboDescription"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Precio del Combo:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            type="number"
            v-model="form.comboPrice"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Horas a Asignar:"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            v-model="form.comboDesignatedHours"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Número de Trabajadores a Asignar:"
          label-for="input-6"
        >
          <b-form-input
            id="input-6"
            v-model="form.comboWorkersNumber"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Paquetes a asignar al combo:"
          label-for="input-6"
        >
          <b-form-select
            id="input-6"
            v-model="form.packageIds"
            :options="packageOptions"
            multiple
            :select-size="5"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-10"
          label="Foto del trabajador:"
          label-for="input-10"
        >
          <b-form-file
            id="input-10"
            v-model="form.comboImg"
            accept="image/*"
            @change="handleFiles"
            placeholder="Seleccione la imagen de portada del combo"
          ></b-form-file>
        </b-form-group>

        <div class="buttonsContainer">
          <b-button type="submit" variant="primary">Registrar Combo</b-button>
          <b-button @click="closeModal" id="botonCancelar"> Cancelar </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "CreateComboModal",
  data() {
    return {
      packages: [],
      packageOptions: [],
      form: {
        comboName: "",
        comboDescription: "",
        comboPrice: "",
        comboDesignatedHours: "",
        comboWorkersNumber: "",
        comboImg: null,
        packageIds: [],
      },
    };
  },
  methods: {
    sendPostCreateCombo() {
      this.$http
        .post("/api/combos", this.form, {
          headers: {
            "Content-Type": "multipart/form-data",
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
          console.log(error);
        });
    },
    handleFiles(event) {
      this.form.comboImg = event.target.files;
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
    },
  },
  mounted() {
    this.$http
      .get("/api/packages")
      .then((response) => {
        this.packages = response.data;
        this.packageOptions = this.packages.map((pkg) => ({
          value: pkg.packageId,
          text: pkg.packageName,
        }));
      })
      .catch((e) => {
        console.error("Error en la petición: ", e);
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

#addComboButton {
  width: 100%;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
</style>
