<template>
  <div class="app">
    <NavBar />

    <div class="content">
      <div class="image-container">
        <img src="../assets/buffe.PNG" alt="nose" />
      </div>

      <div class="forms">
        <div class="login-container">
          <h1 class="title-login">Inicio de sesión</h1>
          <ValidationObserver v-slot="{ handleSubmit }">
            <b-form @submit.prevent="handleSubmit(onSubmit)">
              <b-form-group
                id="input-group-1"
                label="Correo:"
                label-for="input-1"
                style="margin-bottom: 15px"
              >
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <b-form-input
                    id="input-1"
                    v-model="form.username"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Contraseña:"
                label-for="input-2"
                class="input-with-icon"
              >
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-input
                    id="input-2"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    :class="{ invalid: errors[0] }"
                  ></b-form-input>
                  <b-icon
                    :icon="showPassword ? 'eye-slash' : 'eye'"
                    aria-hidden="true"
                    @click="togglePassword"
                    class="icon"
                  ></b-icon>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
              <br />
              <b-button type="submit">Ingresar</b-button>
            </b-form>
          </ValidationObserver>
          <br />
          <p>No tienes cuenta? Crea una <a href="/signup">aqui</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import { jwtDecode } from "jwt-decode";
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

extend("email", {
  ...email,
  message: "La dirección de correo debe ser valida",
});

export default {
  name: "Login",
  components: {
    NavBar,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    onSubmit() {
      const apiUrl = "/api/auth/signin";
      this.$http
        .post(apiUrl, this.form)
        .then((response) => {
          localStorage.setItem("token", response.data.data);
          const decoded = jwtDecode(response.data.data);
          const role = decoded.roles[0].authority;
          this.redirectUser(role);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.$swal({
              title: "Opps!",
              text: "Correo o contraseña incorrectos, intenta de nuevo.",
              icon: "warning",
            });
          } else {
            this.$swal({
              title: "Error",
              text: "Ocurrió un error inesperado, intentalo de nuevo.",
              icon: "error",
            });
          }
        });
    },
    redirectUser(role) {
      if (role === "ADMIN") {
        this.$router.push("/administrator-home");
      } else if (role === "COMMON_USER") {
        this.$router.push("/client-home");
      } else if (role === "WORKER") {
        this.$router.push("/worker-home");
      }
    },
  },
};
</script>

<style scoped>
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

.invalid {
  border-color: red !important;
  background-color: rgb(255, 255, 255) !important;
}

.errors {
  color: red;
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
  border: 3px solid #ae0505;
}

.btn {
  background-color: #2d2a2a;
  color: white;
  border: none;
  font-weight: 400;
}

.btn:hover {
  background-color: #ae0505;
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

.title-login {
  margin-bottom: 25px;
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

.input-with-icon {
  position: relative;
}

.input-with-icon input[type="password"],
.input-with-icon input[type="text"] {
  padding-right: 2.5em;
}

.input-with-icon .icon {
  position: absolute;
  right: 5em;
  top: 2.1em;
  cursor: pointer;
}
</style>
