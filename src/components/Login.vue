<template>
  <div class="app">
    <NavBar />

    <div class="content">
      <div class="image-container">
        <img src="../assets/buffe.PNG" alt="nose" />
      </div>

      <div class="forms">
        <div class="login-container">
          <h1>Inicio de sesión</h1>
          <b-form @submit.prevent="onSubmit">
            <b-form-group
              id="input-group-1"
              label="Usuario:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.username"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Contraseña:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>
            <br />
            <b-button type="submit" variant="primary">Ingresar</b-button>
          </b-form>
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
    };
  },
  methods: {
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
          console.error("Error en el inicio de sesión: ", error);
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
  min-height: 100vh; /* Ensures app fills the viewport height */
  justify-content: center;
  align-items: center;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 7.5vh 15%;
  box-shadow: 10px 5px 5px rgba(109, 109, 109, 0.5); /* Consistent box-shadow formatting */
  border-radius: 20px;
  height: 75vh;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
  text-align: center; /* Center text within heading */
}

label {
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  text-align: center; /* Align labels to the center */
  margin-bottom: 2vh;
}

.forms {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrar los elementos hijos horizontalmente */
  justify-content: center; /* Centrar los elementos hijos verticalmente */
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
  border: 3px solid #ae0505; /* Consistent border color formatting */
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
</style>
