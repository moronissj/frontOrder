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
              <b-form @submit.prevent="sendPostCreateAdmin">
                <b-form-group
                  id="input-group-1"
                  class="b-group"
                  label="Nombre:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    v-model="form.userName"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  class="b-group"
                  label="Apellido paterno:"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.userFirstLastName"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-3"
                  class="b-group"
                  label="Apellido paterno:"
                  label-for="input-3"
                >
                  <b-form-input
                    id="input-3"
                    v-model="form.userSecondLastName"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-4"
                  class="b-group"
                  label="Celular:"
                  label-for="input-4"
                >
                  <b-form-input
                    id="input-4"
                    v-model="form.userCellphone"
                    type="tel"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-5"
                  class="b-group"
                  label="Correo Electronico:"
                  label-for="input-5"
                >
                  <b-form-input
                    id="input-5"
                    v-model="form.userEmail"
                    type="email"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-6"
                  class="b-group"
                  label="Contraseña:"
                  label-for="input-6"
                >
                  <b-form-input
                    id="input-6"
                    v-model="form.userPassword"
                    type="password"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-7"
                  label="Repetir Contraseña:"
                  label-for="input-7"
                >
                  <b-form-input
                    id="input-7"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-8"
                  label="Foto de perfil:"
                  label-for="input-8"
                >
                  <b-form-file
                    id="input-8"
                    v-model="form.userProfilePic"
                    accept="image/*"
                    @change="handleFiles"
                    placeholder="Seleccione una imagen"
                  ></b-form-file>
                </b-form-group>

                <br />
                <b-button type="submit" variant="primary">Ingresar</b-button>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import "friendly-challenge/widget";

export default {
  name: "RegisterClient",
  components: {
    NavBar,
  },
  data() {
    return {
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
      this.$http
        .post("/api/accounts/create-common", this.form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
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
          console.log(error);
        });
    },
    handleFiles(event) {
      this.form.userProfilePic = event.target.files[0];
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
</style>
