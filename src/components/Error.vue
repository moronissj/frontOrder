<template>
  <div class="not-found-container"> <!-- Este div usará el GIF como fondo -->
    <div class="not-found">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe o fue movida.</p>
      <router-link to="/" class="home-link">Volver al inicio</router-link>
    </div>
  </div>
</template>


  
  <script setup>
  // Importa aquí los componentes necesarios o realiza configuraciones específicas
  </script>
  
  <style scoped>
  .not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f8f8;
    text-align: center;
    padding: 20px;
  }
  
  .not-found h1 {
    font-size: 10rem;
    color: #ff4757;
  }
  
  .not-found h2 {
    font-size: 2.5rem;
    color: white;
    margin: 20px 0;
  }
  
  .not-found p {
    font-size: 1.2rem;
    color: white;
    margin-bottom: 20px;
  }
  
  .home-link {
    display: inline-block;
    background-color: #ff4757;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1.2rem;
    transition: background-color 0.3s ease;
  }
  
  .home-link:hover {
    background-color: #ff6b81;
  }
  .error-gif {
  max-width: 100%; /* Ajusta el tamaño del GIF */
  height: auto; /* Mantiene la proporción del GIF */
  margin-bottom: 20px; /* Espacio entre el GIF y el texto de error */
}

.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la pantalla */
  background-image: url('../assets/error.gif'); /* Establece el GIF como fondo */
  background-size: 30vh; /* Ajusta el GIF para que cubra completamente el contenedor */
  background-position: center; /* Centra el GIF en el contenedor */
}
  </style>
  