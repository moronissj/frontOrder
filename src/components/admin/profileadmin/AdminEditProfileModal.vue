<template>
  <div>
    <b-button
      size="sm"
      v-b-modal="`adminEditProfileModal_${admin.adminId}`"
      @click="fillForm"
      variant="warning"
      >Editar</b-button
    >
    <b-modal
      :id="`adminEditProfileModal_${admin.adminId}`"
      title="Editar Administrador"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5 class="form-title">Editar Administrador</h5>
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
        <b-form @submit.prevent="handleSubmit(sendPutEditAdmin)">
          <div class="row">
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-1"
                class="input-label-container"
                label="Nombre:"
                label-for="input-1"
              >
                <ValidationProvider
                  rules="required|valid-name-part|max-length-name"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    v-model="form.adminName"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-2"
                class="input-label-container"
                label="Apellido Paterno:"
                label-for="input-2"
              >
                <ValidationProvider
                  rules="required|valid-name-part|max-length-name"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-2"
                    type="text"
                    v-model="form.adminFirstLastName"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-3"
                class="input-label-container"
                label="Apellido Materno:"
                label-for="input-3"
              >
                <ValidationProvider
                  rules="required|valid-name-part|max-length-name"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="input-3"
                    type="text"
                    v-model="form.adminSecondLastName"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>

            <div class="col col-sm-12 col-md-6">
              <b-form-group
                id="input-group-4"
                class="input-label-container"
                label="Celular:"
                label-for="input-4"
              >
                <ValidationProvider rules="required|tel" v-slot="{ errors }">
                  <b-form-input
                    id="input-4"
                    type="tel"
                    v-model="form.adminCellphone"
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
import { useSecret } from "@/stores/key";
import { extend } from "vee-validate";
import { required, regex } from "vee-validate/dist/rules";

extend("max-length-name", {
  validate: (value) => {
    if (!value || value.length > 20) {
      return "El nombre debe tener máximo 20 caracteres.";
    }
    return true;
  },
  message: "El nombre debe tener máximo 20 caracteres.",
});

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("tel", {
  validate: (value) => {
    if (!/^\d{10}$/.test(value)) return false;
    return value.startsWith("777") || value.startsWith("52");
  },
  message:
    "El número telefónico debe ser numérico, comenzar con '777' o '52', y tener 10 dígitos.",
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
  name: "AdminEditProfileModal",
  props: {
    admin: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      key: "",
      form: {
        adminName: "",
        adminFirstLastName: "",
        adminSecondLastName: "",
        adminEmail: "",
        adminCellphone: "",
        adminSecurityNumber: null,
        adminSalary: null,
      },
    };
  },
  methods: {
    fillForm() {
      this.form.adminName = this.admin.adminName;
      this.form.adminFirstLastName = this.admin.adminFirstLastName;
      this.form.adminSecondLastName = this.admin.adminSecondLastName;
      this.form.adminCellphone = this.admin.adminCellphone;
      this.form.adminSecurityNumber = this.admin.adminSecurityNumber;
      this.form.adminSalary = this.admin.adminSalary;
    },
    sendPutEditAdmin() {
      this.isLoading = true;
      this.key = useSecret();
      const serializedData = JSON.stringify({
        adminId: this.admin.adminId,
        adminName: this.form.adminName,
        adminFirstLastName: this.form.adminFirstLastName,
        adminSecondLastName: this.form.adminSecondLastName,
        adminCellphone: this.form.adminCellphone,
        adminSecurityNumber: this.form.adminSecurityNumber,
        adminSalary: this.form.adminSalary,
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
          .put("/api/accounts/update-admin", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.$emit("actualizacionExitosa");
            this.$swal({
              title: "Actualizacion exitosa",
              text: "El Administrador ha sido actualizado con exito",
              icon: "success",
            });
            this.closeModal();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    closeModal() {
      this.$root.$emit(
        "bv::hide::modal",
        `adminEditProfileModal_${this.admin.adminId}`
      );
      this.clearFields();
    },
    clearFields() {
      this.form.adminName = "";
      this.form.adminFirstLastName = "";
      this.form.adminSecondLastName = "";
      this.form.adminEmail = "";
      this.form.adminCellphone = "";
      this.form.adminSecurityNumber = null;
      this.form.adminSalary = null;
      this.form.adminRfc = "";
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
