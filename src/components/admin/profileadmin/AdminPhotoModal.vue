<template>
  <div>
    <b-button
      size="sm"
      v-b-modal="`adminEditProfilePicModal_${admin.adminId}`"
      variant="warning"
      @click="clearFields"
      >Editar</b-button
    >
    <b-modal
      :id="`adminEditProfilePicModal_${admin.adminId}`"
      title="Cambiar Foto Administrador"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5 class="form-title">Cambiar foto</h5>
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
        <b-form @submit.prevent="handleSubmit(sendPutEditProfilePicAdmin)">
          <b-form-group
            id="input-group-1"
            label="Foto Nueva:"
            label-for="input-1"
            class="input-label-container"
          >
            <ValidationProvider
              rules="required|ext:jpg,png|size:20"
              v-slot="{ errors }"
            >
              <b-form-file
                id="input-1"
                v-model="form.profilePic"
                accept="image/*"
                @change="handleFiles"
                placeholder="Seleccione una imagen"
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
import { required, ext } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("ext", {
  ...ext,
  message: "El archivo debe ser una imagen png o jpg",
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
  name: "AdminPhotoModal",
  props: {
    admin: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      form: {
        profilePic: null,
      },
      imagePreviewUrl: null,
    };
  },
  methods: {
    sendPutEditProfilePicAdmin() {
      this.isLoading = true;

      this.key = useSecret();

      const serializedData = JSON.stringify({
        adminId: this.admin.adminId,
      });

      const encryptedData = this.$encryptionService.encryptData(
        serializedData,
        this.key
      );

      let formData = new FormData();
      formData.append("data", encryptedData);

      if (this.form.profilePic) {
        formData.append("profilePic", this.form.profilePic);
      }

      const token = localStorage.getItem("token");

      if (token) {
        this.$http
          .post("/api/accounts/update-admin/profile-pic", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.$emit("photoUpdated");
            this.$swal({
              title: "Actualizacion exitosa",
              text: "La foto de perfil ha sido cambiada",
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
    handleFiles(event) {
      const file = event.target.files[0];
      this.form.profilePic = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviewUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    closeModal() {
      this.$root.$emit(
        "bv::hide::modal",
        `adminEditProfilePicModal_${this.admin.adminId}`
      );
      this.clearFields();
    },
    clearFields() {
      this.form.profilePic = null;
      this.imagePreviewUrl = null;
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
