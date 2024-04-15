<template>
  <div class="not-found-container">
    <div class="overlay">
      <h1>Oops!</h1>
      <p>La página que buscas no fue encontrada.</p>
      <router-link to="/" class="back-button">Regresar atrás</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style scoped>
.not-found-container {
  position: relative;
  text-align: center;
  height: 100vh;
  background: url("../assets/error.jpg") no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.overlay {
  position: absolute;
  top: 64%;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

h1 {
  z-index: 10;
  color: #ae0505;
  font-size: 10vh;
  margin-bottom: 20px;
  font-weight: bold;
}

p {
  z-index: 10;
  font-size: 5vh;
  margin-bottom: 20px;
  color: black;
}

.back-button {
  z-index: 10;
  background-color: #ae0505;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #930303;
}

@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }

  p {
    font-size: 18px;
  }

  .back-button {
    padding: 8px 16px;
  }
}
</style>
