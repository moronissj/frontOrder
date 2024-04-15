<template>
  <div>
    <b-button
      class="table-button"
      size="sm"
      v-b-modal="`editWorkerModal_${worker.workerId}`"
      @click="fillForm"
      variant="primary"
      ><b-icon icon="pencil-square" scale="1"></b-icon
    ></b-button>
    <b-modal
      :id="`editWorkerModal_${worker.workerId}`"
      title="Editar Trabajador"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5 class="form-title">Editar Trabajador</h5>
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
        <b-form @submit.prevent="handleSubmit(sendPutEditWorker)">
          <div class="row">
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-1"
                label="Nombre:"
                label-for="input-1"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|valid-name-part|max-length-name"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    v-model="form.workerName"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>

            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-2"
                label="Apellido paterno:"
                label-for="input-2"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|valid-name-part|max-length-name"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-2"
                    type="text"
                    v-model="form.workerFirstLastName"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-3"
                label="Apellido materno:"
                label-for="input-3"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|valid-name-part|max-length-name"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-3"
                    type="text"
                    v-model="form.workerSecondLastName"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-6"
                label="Teléfono del Trabajador:"
                label-for="input-6"
                class="input-label-container"
              >
                <ValidationProvider rules="required|tel" v-slot="{ errors }">
                  <b-form-input
                    id="input-6"
                    type="tel"
                    v-model="form.workerCellphone"
                    disabled
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>

            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-7"
                label="NSS:"
                label-for="input-7"
                class="input-label-container"
              >
                <ValidationProvider rules="required|nss" v-slot="{ errors }">
                  <b-form-input
                    id="input-7"
                    type="number"
                    v-model="form.workerSecurityNumber"
                    disabled
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-8"
                label="Salario:"
                label-for="input-8"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|max_value:20000"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-8"
                    type="number"
                    v-model="form.workerSalary"
                    disabled
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-9"
                label="RFC:"
                label-for="input-9"
                class="input-label-container"
              >
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-input
                    id="input-9"
                    type="text"
                    v-model="form.workerRfc"
                    disabled
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
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
import { extend } from "vee-validate";
import { required, regex } from "vee-validate/dist/rules";
import { useSecret } from "@/stores/key";

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

extend("max_value", {
  validate(value, { max }) {
    return Number(value) <= max;
  },
  message: "El salario no debe ser superior a {max}",
  params: ["max"],
});

extend("valid-name-part", {
  ...regex,
  message: "Este campo solo puede contener letras acentuadas y sin acentuar",
  validate: (value) => {
    const pattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]*$/;
    return pattern.test(value);
  },
});

export default {
  name: "EditWorkerModal",
  props: {
    worker: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      key: "",
      isLoading: false,
      form: {
        workerName: "",
        workerFirstLastName: "",
        workerSecondLastName: "",
        workerCellphone: "",
        workerSecurityNumber: "",
        workerSalary: "",
        workerRfc: "",
      },
    };
  },
  methods: {
    fillForm() {
      this.form.workerName = this.worker.workerName;
      this.form.workerFirstLastName = this.worker.workerFirstLastName;
      this.form.workerSecondLastName = this.worker.workerSecondLastName;
      this.form.workerCellphone = this.worker.workerCellphone;
      this.form.workerSecurityNumber = this.worker.workerSecurityNumber;
      this.form.workerSalary = this.worker.workerSalary;
      this.form.workerRfc = this.worker.workerRfc;
    },
    sendPutEditWorker() {
      this.isLoading = true;

      const token = localStorage.getItem("token");

      const serializedDataEdit = JSON.stringify({
        workerId: this.worker.workerId,
        workerName: this.form.workerName,
        workerFirstLastName: this.form.workerFirstLastName,
        workerSecondLastName: this.form.workerSecondLastName,
        workerCellphone: this.form.workerCellphone,
        workerSecurityNumber: this.form.workerSecurityNumber,
        workerSalary: this.form.workerSalary,
        workerRfc: this.form.workerRfc,
      });

      const encryptedDataEdited = this.$encryptionService.encryptDataTwoXD(
        serializedDataEdit,
        this.key
      );

      let formData = new FormData();
      formData.append("data", encryptedDataEdited);
      if (token) {
        this.$http
          .put("/api/accounts/update-worker", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("actualizacionExitosa");
            this.$swal({
              title: "Actualizacion exitosa",
              text: "El Trabajador ha sido actualizado con exito",
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
              console.error("Error al actualizar el administrador:", error);
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
        `editWorkerModal_${this.worker.workerId}`
      );
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
