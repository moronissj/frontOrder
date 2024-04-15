<template>
  <div class="app">
    <NavBar />
    <div class="content">
      <div class="image-container">
        <img src="../assets/buffe.PNG" alt="nose" />
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <div
          style="height: 100%; margin-left: 30px; width: 90%; margin-top: 100px"
        >
          <h1 style="font-size: 2rem; margin-bottom: 20px">
            Confirmación de cuenta
          </h1>
          <b-form
            @submit.prevent="handleSubmit(sendPostConfirmAccountWithToken)"
          >
            <b-form-group id="input-group-1" label="Token:" label-for="input-1">
              <ValidationProvider rules="required|token" v-slot="{ errors }">
                <b-form-input
                  id="input-1"
                  type="text"
                  v-model="token"
                  required
                ></b-form-input>
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>

            <div class="buttonsContainer">
              <b-button
                type="submit"
                style="margin-top: 20px; border: none"
                variant="primary"
                >Confirmar cuenta</b-button
              >
            </div>
          </b-form>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
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
  name: "VistaToken",
  components: {
    NavBar,
  },
  data() {
    return {
      token: "",
    };
  },
  methods: {
    sendPostConfirmAccountWithToken() {
      // Crear un FormData y añadir el token a este objeto
      let formData = new FormData();
      formData.append("token", this.token);

      this.$http
        .post("/api/accounts/confirm-account", formData)
        .then((response) => {
          this.$swal({
            title: "Cuenta confirmada",
            text: "La cuenta ha sido confirmada, puedes iniciar sesión",
            icon: "success",
          });
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
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
  justify-content: center;
  align-items: center;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 7.5vh 15%;
  box-shadow: 10px 5px 5px rgba(109, 109, 109, 0.5);
  border-radius: 20px;
  height: 75vh;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
  text-align: center;
}

label {
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2vh;
}

.forms {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
