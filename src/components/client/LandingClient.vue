<template>
  <div>
    <NavbarClient />
    <div v-if="isLoading" class="spinner-fullscreen">
      <div
        class="spinner-border text-primary"
        role="status"
        style="width: 20rem; height: 20rem"
      ></div>
    </div>

    <div v-if="!isLoading">
      <div class="banner-container">
        <div class="banner-background"></div>
        <div class="container">
          <div class="text-wrapper">
            <h1 id="bannerText">ORDER.COM</h1>
          </div>
          <div class="button-wrapper">
            <h1 class="bienvenido">Bienvenido</h1>
          </div>
        </div>
      </div>

      <div class="container">
        <Carrousel />
        <div class="title">
          <h1>Servicios</h1>
        </div>
        <div class="row" id="cards">
          <div class="col-md-4 col-12">
            <div class="card service-card">
              <h3>Servicios</h3>
              <div class="img-container">
                <img
                  src="../../assets/utileriaIcon.png"
                  alt=""
                  class="iconService"
                />
              </div>
              <div>
                <a href="/user-services">
                  <b-button size="lg">Ver más</b-button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavbarClient from "./NavbarClient.vue";
import Footer from "../Footer.vue";
export default {
  components: {
    NavbarClient,
    Footer,
  },
  data() {
    return {};
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.banner-container {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(../../assets/BannerLandingImage.jpg);
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  margin-top: auto;
  margin-bottom: 75px;
}
.banner-container .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

#bannerText {
  color: white;
  font-size: 6rem;
}

#black {
  background-color: #2d2a2a;
}
.banner-button {
  font-family: "Montserrat", sans-serif;
  width: 25%;
  border-radius: 15px;
  font-weight: bold;
  padding: 15px;
  background-color: white !important;
  color: #2d2a2a;
  transition: all 0.2s ease;
  border: none;
}

.btn:hover {
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: white;
  color: black;
  border: solid 2px black;
  font-weight: bold;
}

.card {
  background-color: #ae0505;
  height: 100%;
  border-radius: 16px;
  color: white;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.service-card {
  height: 100%;
  border-radius: 16px;
  color: white;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.card h4 {
  margin-bottom: 20px;
}

.img-container {
  display: flex;
  justify-content: center;
  height: 200px;
}

.iconService {
  object-fit: contain;
}

.title {
  margin-top: 50px;
  margin-bottom: 50px;
}

#cards {
  margin-bottom: 50px;
}

.bienvenido {
  color: white;
  font-size: 4rem;
}

.btn {
  background-color: white;
  color: black;
  border: solid 2.5px black;
  transition: all.3s ease;
  margin: 0;
}

@media (max-width: 800px) {
  #app {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .col-12 {
    margin-bottom: 15px;
  }
  #cards {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  .card {
    justify-content: center;
    padding: 20px;
    text-align: center;
  }

  .img-container {
    height: auto;
    margin-bottom: 20px;
  }

  .iconService {
    height: 15vh;
    width: auto;
  }

  #bannerText {
    font-size: 4rem;
  }

  .bienvenido {
    font-size: 3rem;
  }
  .btn {
    width: 5rem;
  }
}
</style>
