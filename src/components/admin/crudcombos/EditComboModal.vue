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
        <h5 class="form-title">Editar Combo</h5>
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
        <b-form @submit.prevent="handleSubmit(sendPutEditCombo)">
          <b-form-group
            id="input-group-1"
            label="Nombre del Combo:"
            label-for="input-1"
            class="input-label-container"
          >
            <ValidationProvider rules="required" v-slot="{ errors }">
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
            <ValidationProvider rules="required" v-slot="{ errors }">
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
                <ValidationProvider rules="required" v-slot="{ errors }">
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
                <ValidationProvider rules="required" v-slot="{ errors }">
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
                <ValidationProvider rules="required" v-slot="{ errors }">
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
          </div>

          <div class="buttonsContainer">
            <b-button type="submit" class="register-btn" variant="primary"
              >Actualizar
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
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

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
      this.key = useSecret();

      const serializedData = JSON.stringify({
        comboId: this.combo.comboId,
        comboName: this.form.comboName,
        comboDescription: this.form.comboDescription,
        comboPrice: this.form.comboPrice,
        comboDesignatedHours: this.form.comboDesignatedHours,
        comboWorkersNumber: this.form.comboWorkersNumber,
      });

      console.log(serializedData);

      const encryptedData = this.$encryptionService.encryptData(
        serializedData,
        this.key
      );

      console.log(encryptedData);

      let formData = new FormData();
      formData.append("data", encryptedData);

      const token = localStorage.getItem("token");

      if (token) {
        this.$http
          .put("/api/combos/update-combo", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
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
          });
      }
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
