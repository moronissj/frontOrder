<template>
  <div class="app">
    <NavbarClient />

    <div class="content">
      <div>
        <img src="../../assets/buffe.PNG" alt="" class="buffet" />
      </div>

      <form class="forms">
        <h2>Perfil</h2>

        <div class="profilePic">
          <img src="../../assets/buffe.PNG" alt="" class="pic" />
        </div>

        <div>
          <div class="form">
            <label>Nombre(s)</label>
          </div>
          <input type="text" v-model="user.firstName" />
        </div>

        <div>
          <div class="form">
            <label>Apellido P.</label>
          </div>
          <input type="text" v-model="user.lastNameP" />
        </div>

        <!-- Repite para los demás campos -->
        <div>
          <div class="form">
            <label>Apellido M.</label>
          </div>
          <input type="text" v-model="user.lastNameM" />
        </div>

        <div>
          <div class="form">
            <label>Correo Electrónico</label>
          </div>
          <input type="email" v-model="user.email" />
        </div>

        <div>
          <div class="form">
            <label>Celular</label>
          </div>
          <input type="tel" v-model="user.phone" />
        </div>

        <div>
          <div class="form">
            <label>Foto</label>
          </div>
          <input type="file" accept="image/png, image/jpeg" />
        </div>

        <div>
          <div class="form">
            <label>Contraseña</label>
          </div>
          <input type="password" v-model="user.password" />
        </div>

        <div>
          <div class="form">
            <label>Repetir contraseña</label>
          </div>
          <input type="password" v-model="user.confirmPassword" />
        </div>

        <div class="button-container">
          <b-button>Actualizar</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import NavbarClient from "./NavbarClient.vue";
// Importa ValidationProvider y otras dependencias si las usas

export default {
  components: {
    NavbarClient,
    // ValidationProvider y otros si es necesario
  },
  data() {
    return {
      // Define el usuario en la data del componente
      user: {
        firstName: "John",
        lastNameP: "Doe",
        lastNameM: "Smith",
        email: "john.doe@example.com",
        phone: "1234567890",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    // Tus métodos
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
  margin: 7.5vh 10%;
  box-shadow: 10px 5px 5px rgba(109, 109, 109, 0.5);
  border-radius: 20px;
  height: auto; /* Cambiado de 120vh a auto */
  width: auto;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
  text-align: center;
}

label {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.5vh;
}

.forms {
  position: relative;
  text-align: center;
}

.pic {
  width: 20vh;
  height: 20vh;
  margin-bottom: 5svh;
}

.form {
  margin-bottom: 2vh;
}

input {
  width: 80%;
  height: 5vh;
  border-radius: 20px;
  margin-bottom: 2vh;
  border: 3px solid #ae0505;
}

.btn {
  background-color: #2d2a2a;
  color: white;
  /* Otros estilos del botón */
  margin: 2.5vh; /* Añade un margen alrededor del botón */
  width: 50%;
}

a {
  color: #ae0505;
}

.contraseña {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.buffet {
  width: 100%;
  height: 100%;
}

@media (max-width: 800px) {
  .contraseña,
  .nombre {
    grid-template-columns: 1fr; /* Hace que los campos se apilen verticalmente */
  }
  .content {
    grid-template-columns: 1fr; /* Ajusta el contenido para apilarse verticalmente */
    margin-top: 5%;
    width: 80%;
    height: auto; /* Ajusta la altura */
  }
  label,
  .form,
  input,
  .btn {
    font-size: 0.9rem; /* Ajusta el tamaño de fuente para pantallas pequeñas */
    margin-bottom: 1vh; /* Reduce el margen entre elementos */
  }
  .buffet {
    display: none; /* Oculta la imagen en pantallas pequeñas para ahorrar espacio */
  }
  .btn {
    margin: 2.5vh; /* Ajusta el margen según sea necesario */
  }
}
</style>
