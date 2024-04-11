<template>
  <div class="app">
    <NavBar />

    <div class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <div class="card profile-card">
            <img src="../assets/buffe.PNG" alt="pic" class="profile-image" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="card info-card">
            <div class="card-body">
              <h1 class="info-title">Registro</h1>
              <ValidationObserver v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(sendPostCreateAdmin)">
                  <b-form-group
                    id="input-group-1"
                    class="b-group"
                    label="Nombre:"
                    label-for="input-1"
                  >
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <b-form-input
                        id="input-1"
                        type="text"
                        v-model="form.userName"
                        :class="{ invalid: errors[0] }"
                      ></b-form-input>
                      <span class="errors">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </b-form-group>

                  <b-form-group
                    id="input-group-2"
                    class="b-group"
                    label="Apellido paterno:"
                    label-for="input-2"
                  >
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <b-form-input
                        id="input-2"
                        v-model="form.userFirstLastName"
                        type="text"
                        :class="{ invalid: errors[0] }"
                      ></b-form-input>
                      <span class="errors">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </b-form-group>

                  <b-form-group
                    id="input-group-3"
                    class="b-group"
                    label="Apellido paterno:"
                    label-for="input-3"
                  >
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <b-form-input
                        id="input-3"
                        v-model="form.userSecondLastName"
                        type="text"
                        :class="{ invalid: errors[0] }"
                      ></b-form-input>
                      <span class="errors">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </b-form-group>

                  <b-form-group
                    id="input-group-4"
                    class="b-group"
                    label="Celular:"
                    label-for="input-4"
                  >
                    <ValidationProvider
                      rules="required|phone"
                      v-slot="{ errors }"
                    >
                      <b-form-input
                        id="input-4"
                        v-model="form.userCellphone"
                        type="tel"
                        :class="{ invalid: errors[0] }"
                      ></b-form-input>
                      <span class="errors">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </b-form-group>

                  <b-form-group
                    id="input-group-5"
                    class="b-group"
                    label="Correo Electronico:"
                    label-for="input-5"
                  >
                    <ValidationProvider
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                      <b-form-input
                        id="input-5"
                        v-model="form.userEmail"
                        type="email"
                        :class="{ invalid: errors[0] }"
                      ></b-form-input>
                      <span class="errors">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </b-form-group>

                  <b-form-group
                    id="input-group-6"
                    class="b-group"
                    label="Contraseña:"
                    label-for="input-6"
                  >
                    <ValidationProvider
                      rules="required|password"
                      v-slot="{ errors }"
                    >
                      <b-form-input
                        id="input-6"
                        v-model="form.userPassword"
                        type="password"
                        :class="{ invalid: errors[0] }"
                      ></b-form-input>
                      <span class="errors">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </b-form-group>

                  <b-form-group
                    id="input-group-8"
                    label="Foto de perfil:"
                    label-for="input-8"
                  >
                    <ValidationProvider
                      rules="required|ext:png,jpg"
                      v-slot="{ errors }"
                    >
                      <b-form-file
                        id="input-8"
                        v-model="form.userProfilePic"
                        accept="image/*"
                        @change="handleFiles"
                        placeholder="Seleccione una imagen"
                        :class="{ invalid: errors[0] }"
                      ></b-form-file>
                      <span class="errors">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </b-form-group>

                  <br />
                  <b-button type="submit" variant="primary">Ingresar</b-button>
                </b-form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import { useSecret } from "@/stores/key";
import { extend } from "vee-validate";
import { required, ext } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("ext", {
  ...ext,
  message: "La imagen debe ser un png o un jpg",
});

extend("email", {
  validate: (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },
  message: "El campo debe ser una dirección de correo electrónico válida.",
});

extend("phone", {
  validate: (value) => {
    return /^\d{10}$/.test(value);
  },
  message:
    "El número de celular debe tener exactamente 10 dígitos y no contener letras.",
});

extend("password", {
  validate: (value) => {
    return /^(?=.*[A-Z])(?=.*\d)(?!.*[^a-zA-Z0-9]).{8,}$/.test(value);
  },
  message:
    "La contraseña debe contener al menos una letra mayúscula, un número y no debe contener caracteres especiales.",
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

export default {
  name: "RegisterClient",
  components: {
    NavBar,
  },
  data() {
    return {
      key: "",
      backErrors: [],
      form: {
        userName: "",
        userFirstLastName: "",
        userSecondLastName: "",
        userEmail: "",
        userPassword: "",
        userCellphone: "",
        userProfilePic: null,
      },
    };
  },
  methods: {
    goToToken() {
      this.$router.push("/token-confirmation");
    },
    sendPostCreateAdmin() {
      const serializedData = JSON.stringify({
        userName: this.form.userName,
        userFirstLastName: this.form.userFirstLastName,
        userSecondLastName: this.form.userSecondLastName,
        userEmail: this.form.userEmail,
        userPassword: this.form.userPassword,
        userCellphone: this.form.userCellphone,
      });

      const encryptedData = this.$encryptionService.encryptData(
        serializedData,
        this.key
      );

      let formData = new FormData();
      formData.append("data", encryptedData);
      if (this.form.userProfilePic) {
        formData.append("userProfilePic", this.form.userProfilePic);
      }

      this.$http
        .post("/api/accounts/create-common", formData)
        .then((response) => {
          this.$emit("registroExitoso");
          this.$swal({
            title: "Creacion exitosa",
            text: "Cuenta registrada, hemos enviado un token de confirmacion a tu correo",
            icon: "success",
          });
          this.goToToken();
        })
        .catch((error) => {
          if (error.response.status === 409) {
            const message = error.response.data.message;
            this.$swal({
              title: "Opps!",
              text: message,
              icon: "warning",
            });
          } else if (error.response.status === 420) {
            const message = error.response.data.message;
            this.$swal({
              title: "Opps!",
              text: message,
              icon: "warning",
            });
          } else if (error.response.status === 400) {
            error.response.data.forEach((element) => {
              this.backErrors.push(element);
            });
            this.$swal({
              title: "Problema con la información",
              text: "Verifique que todos los campos esten llenos y que hayan cumplido con las reglas mostradas",
              icon: "warning",
              confirmButtonText: "Ok",
            });
          } else {
            console.error("Error al crear el administrador:", error);
          }
        });
    },
    handleFiles(event) {
      const file = event.target.files[0];
      this.form.userProfilePic = file;
    },
  },
  mounted() {
    this.key = useSecret();
  },
};
</script>

<style scoped>
body,
h1,
h2,
p,
ul,
li {
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}

.col-md-6 {
  display: flex;
  flex: 1;
  padding-right: 0;
  padding-left: 0;
}
.card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.b-group {
  margin-bottom: 1rem;
}

.card-body {
  flex: 1;
}

.profile-card,
.info-card {
  min-height: 300px;
}

.profile-card {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  padding: 0;
}

.profile-image {
  width: 100%;
  height: 100%;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

.info-card {
  background: whites;
  color: black;
  font-family: "Montserrat", sans-serif;
  text-align: center;
  padding: 2rem;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
}

.info-title {
  margin-bottom: 1rem;
}

input {
  border: solid 3px #ea0505;
  border-radius: 20px;
}

@media (max-width: 800px) {
  .btn {
    margin: 2.5vh;
    width: fit-content;
  }
}

.invalid {
  border-color: red !important;
  background-color: rgb(255, 255, 255) !important;
}

.errors {
  color: red;
}
</style>
