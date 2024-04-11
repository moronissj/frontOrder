<template>
  <div>
    <b-button
      class="table-button"
      size="sm"
      v-b-modal="`adminEditProfilePicModal_${admin.adminId}`"
      variant="warning"
      >Editar</b-button
    >
    <b-modal
      :id="`adminEditProfilePicModal_${admin.adminId}`"
      title="Cambiar Foto Administrador"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5>Cambiar Foto Administrador</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          X
        </b-button>
      </template>
      <b-form @submit.prevent="sendPutEditProfilePicAdmin">
        <b-form-group
          id="input-group-1"
          label="Foto Nueva:"
          label-for="input-1"
        >
          <b-form-file
            id="input-1"
            v-model="form.profilePic"
            accept="image/*"
            @change="handleFiles"
            placeholder="Seleccione una imagen"
          ></b-form-file>
        </b-form-group>

        <div class="buttonsContainer">
          <b-button type="submit" variant="primary">Cambiar Foto</b-button>
          <b-button @click="closeModal" id="botonCancelar"> Cancelar </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { useSecret } from "@/stores/key";

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
      form: {
        profilePic: null,
      },
    };
  },
  methods: {
    sendPutEditProfilePicAdmin() {
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
          });
      }
    },
    handleFiles(event) {
      this.form.profilePic = event.target.files;
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

#addadminButton {
  width: 100%;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
</style>
