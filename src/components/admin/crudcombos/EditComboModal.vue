<template>
  <div>
    <b-button
      class="table-button"
      size="sm"
      v-b-modal="`editComboModal_${combo.comboId}`"
      @click="fillForm"
      variant="primary"
      ><b-icon icon="pencil-square" scale="1"></b-icon
    ></b-button>
    <b-modal
      :id="`editComboModal_${combo.comboId}`"
      title="Editar Combo"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5>Editar Combo</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
      </template>
      <b-form @submit.prevent="sendPutEditCombo">
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
          id="input-group-3"
          label="Precio del combo:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            type="number"
            v-model="form.comboPrice"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Horas a Asignar:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            type="number"
            v-model="form.comboDesignatedHours"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Número de Trabajadores a Asignar:"
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            type="number"
            v-model="form.comboWorkersNumber"
            required
          ></b-form-input>
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
  name: "EditComboModal",
  props: {
    combo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        comboName: "",
        comboDescription: "",
        comboPrice: "",
        comboDesignatedHours: "",
        comboWorkersNumber: "",
      },
    };
  },
  methods: {
    fillForm() {
      this.form.comboName = this.combo.comboName;
      this.form.comboDescription = this.combo.comboDescription;
      this.form.comboPrice = this.combo.comboPrice;
      this.form.comboDesignatedHours = this.combo.comboDesignatedHours;
      this.form.comboWorkersNumber = this.combo.comboWorkersNumber;
    },
    sendPutEditCombo() {
      this.$http
        .put(`/api/combos/${this.combo.comboId}`, this.form)
        .then((response) => {
          this.$emit("actualizacionExitosa");
          this.$swal({
            title: "Actualizacion exitosa",
            text: "El Combo ha sido actualizado con exito",
            icon: "success",
          });
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFiles(event) {
      this.form.comboImgUrl = event.target.files;
    },
    closeModal() {
      this.$root.$emit(
        "bv::hide::modal",
        `editComboModal_${this.combo.comboId}`
      );
      this.clearFields();
    },
    clearFields() {
      this.form.comboName = "";
      this.form.comboDescription = "";
      this.form.comboPrice = "";
      this.form.comboDesignatedHours = "";
      this.form.comboWorkersNumber = "";
    },
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

/*Este no se utiliza, pero lo dejaré aqui*/
#addServiceButton {
  width: 100%;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
</style>
