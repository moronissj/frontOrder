<template>
  <div>
    <NavbarAdmin />
    <div class="content">
      <div class="image-container">
        <img src="../../../assets/buffe.PNG" alt="nose" />
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form
          @submit.prevent="handleSubmit(sendPostConfirmAccountWorkerWithToken)"
        >
          <b-form-group id="input-group-1" label="Token:" label-for="input-1">
            <ValidationProvider rules="required|token" v-slot="{ errors }">
              <b-form-input
                id="input-1"
                type="text"
                v-model="token"
                :class="{ invalid: errors[0] }"
              ></b-form-input>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <div class="buttonsContainer">
            <b-button type="submit" variant="primary"
              >Confirmar Cuenta</b-button
            >
          </div>
        </b-form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import NavbarAdmin from "../NavbarAdmin.vue";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("token", {
  validate: (value) => {
    return /^\d{6}$/.test(value);
  },
  message: "El token debe ser de 6 digitos, y no contener letras.",
});

export default {
  name: "AdminConfirmAccount",
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      token: "",
    };
  },
  methods: {
    sendPostConfirmAccountWorkerWithToken() {
      let formData = new FormData();
      formData.append("token", this.token);
      this.$http
        .post("/api/accounts/confirm-worker-account", formData)
        .then((response) => {
          this.$swal({
            title: "Cuenta confirmada",
            text: "La cuenta ha sido confirmada, puede iniciar sesión",
            icon: "success",
          });
          this.$router.push("/admin-workers");
        })
        .catch((error) => {
          if (error.response.data === "Invalid or expired confirmation token") {
            this.$swal({
              title: "Token no valido",
              text: "El token no es valido o ha expirado, comprueba de nuevo",
              icon: "error",
            });
          } else {
            console.error(error);
          }
        });
    },
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
  /* Ensures app fills the viewport height */
  justify-content: center;
  align-items: center;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 7.5vh 15%;
  box-shadow: 10px 5px 5px rgba(109, 109, 109, 0.5);
  /* Consistent box-shadow formatting */
  border-radius: 20px;
  height: 75vh;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
  text-align: center;
  /* Center text within heading */
}

label {
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  text-align: center;
  /* Align labels to the center */
  margin-bottom: 2vh;
}

.forms {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Centrar los elementos hijos horizontalmente */
  justify-content: center;
  /* Centrar los elementos hijos verticalmente */
  padding: 2vh;
}

.form {
  margin-bottom: 2vh;
}

input {
  width: 80%;
  height: 5vh;
  border-radius: 20px;
  margin-bottom: 1.5vh;
  border: 3px solid #ae0505;
  /* Consistent border color formatting */
}

.btn {
  background-color: #2d2a2a;
  color: white;
}

.msg {
  color: #ae0505;
}

.message {
  display: flex;
  justify-content: center;
  margin-top: 2.5vh;
}

img {
  margin-bottom: 0;
  height: 75vh;
  width: auto;
}

@media (max-width: 800px) {
  /* Ajusta 600px al punto de ruptura deseado */
  label {
    font-size: 0.9rem;
  }

  .btn {
    font-size: 0.9rem;
    background-color: #2d2a2a;
    width: 90%;
    margin-top: 1vh;
    margin-bottom: 1vh;
  }

  input {
    font-size: 0.75rem;
  }

  img {
    width: 100%;
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
