<script setup>
import NavbarAdmin from "./NavbarAdmin.vue";
</script>
<template>
  <div class="app">
    <NavbarAdmin />

    <div class="content">
      <div>
        <img src="../../assets/buffet2.PNG" alt="" class="buffet" />
      </div>

      <div class="forms">
        <h2>Registro paquete</h2>

        <div class="nombre">
          <div>
            <div class="form">
              <label>Nombre(s)</label>
            </div>

            <input type="text" />
          </div>

          <div>
            <div class="form">
              <label>Descripción</label>
            </div>

            <textarea id="story" name="story" rows="5" cols="33"> </textarea>
          </div>

          <div class="info">
            <div>
              <div class="form">
                <label>Precio</label>
              </div>

              <input type="number" />
            </div>

            <div>
              <div class="form">
                <label>Servicio</label>
              </div>

              <select>
                <option value="value1">Value 1</option>
                <option value="value2" selected>Value 2</option>
                <option value="value3">Value 3</option>
              </select>
            </div>
          </div>

          <div>
            <div class="form">
              <label>Imagen</label>
            </div>

            <input type="file" accept="image/png, image/jpeg" />
          </div>
        </div>

        <div class="buttonContainer">
          <b-button variant="success">Registrar</b-button>
          <b-button @click="goToServices" variant="danger">Cancelar</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToServices() {
      this.$router.push("/admin-servicios");
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
  min-height: auto;
  justify-content: center;
  align-items: center;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 5vh 10%;
  box-shadow: 10px 5px 5px rgba(109, 109, 109, 0.5);
  border-radius: 20px;
  height: 100vh;
  width: 75%;
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

select {
  width: calc(25vh - 6px); /* Ajuste para compensar el borde */
  height: 5vh;
  border-radius: 20px;
  margin-bottom: 2vh;
  border: 3px solid #ae0505;
  padding: 6px; /* Añadir padding para que el texto no esté pegado al borde */
  box-sizing: border-box; /* Incluye el padding y el borde en el ancho y alto total */
}

textarea {
  width: 80%;
  border-radius: 20px;
  margin-bottom: 2vh;
  border: 3px solid #ae0505;
}

.btn {
  margin: 2.5vh; /* Añade un margen alrededor del botón */
  width: 50%;
}

.info {
  display: flex;
  justify-content: space-around;
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
  height: 100vh;
}

.buttonContainer {
  display: flex;
  justify-content: space-around;
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
