<script setup>
import NavBar from "./NavBar.vue";
</script>
<template>
  <div class="app">
    <NavBar />

    <div class="content">
      <div class="image-container">
        <img src="../assets/buffe.PNG" alt="nose" />
      </div>

      <div class="forms">
        <h2>Iniciar sesión</h2>

        <div class="form">
          <label for="email">Correo Electrónico</label>
          <input id="email" type="text" placeholder="Correo electrónico" />
        </div>

        <div class="form">
          <label for="password">Contraseña</label>
          <input id="password" type="password" placeholder="Contraseña" />
        </div>

        <b-button @click="goToLanding">Iniciar sesión</b-button>

        <div class="message">
          <label
            >¿No eres usuario?
            <router-link to="/register" class="msg">registrate</router-link>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "./NavBar.vue";
</script>

<script>
export default {
  data() {
    return {
      types: ["email", "password"],
    };
  },

  methods: {
    goToLanding() {
      this.$router.push("/landing");
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
