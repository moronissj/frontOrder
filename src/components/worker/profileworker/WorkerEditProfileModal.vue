<template>
  <div>
    <b-button
      size="sm"
      v-b-modal="`workerEditProfileModal_${worker.workerId}`"
      @click="fillForm"
      variant="warning"
      >Editar</b-button
    >
    <b-modal
      :id="`workerEditProfileModal_${worker.workerId}`"
      title="Editar"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5 class="form-title">Editar</h5>
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
                  rules="required|valid-name-part"
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
                label="Apellido Paterno:"
                label-for="input-2"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|valid-name-part"
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
                label="Apellido Materno:"
                label-for="input-3"
                class="input-label-container"
              >
                <ValidationProvider
                  rules="required|valid-name-part"
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

          <div class="buttonsContainer">
            <b-button type="submit" class="register-btn" variant="success"
              >Actualizar</b-button
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
import { required, regex } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
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
  name: "WorkerEditProfileModal",
  props: {
    worker: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      key: "",
      form: {
        workerName: "",
        workerFirstLastName: "",
        workerSecondLastName: "",
      },
    };
  },
  methods: {
    fillForm() {
      this.form.workerName = this.worker.workerName;
      this.form.workerFirstLastName = this.worker.workerFirstLastName;
      this.form.workerSecondLastName = this.worker.workerSecondLastName;
    },
    sendPutEditWorker() {
      this.key = useSecret();
      const serializedData = JSON.stringify({
        workerId: this.worker.workerId,
        workerName: this.form.workerName,
        workerFirstLastName: this.form.workerFirstLastName,
        workerSecondLastName: this.form.workerSecondLastName,
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
          .put("/api/accounts/update-worker", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("actualizacionExitosa");
            this.$swal({
              title: "Actualizacion exitosa",
              text: "La información ha sido actualizado con exito",
              icon: "success",
            });
            this.closeModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    closeModal() {
      this.$root.$emit(
        "bv::hide::modal",
        `workerEditProfileModal_${this.worker.workerId}`
      );
      this.clearFields();
    },
    clearFields() {
      this.form.workerName = "";
      this.form.workerFirstLastName = "";
      this.form.workerSecondLastName = "";
    },
  },
  mounted() {
    const secretStore = useSecret();
    this.key = secretStore.secretKey;
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
  font-size: 0.8rem;
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
</style>
