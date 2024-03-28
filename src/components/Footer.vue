<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col">
          <p class="section-title">ORDER.COM</p>
          <p class="section-text">
            SERVICIOS DE BUFFETS, TRANSPORTE, UTILERIA Y MÁS...
          </p>
          <p class="section-text">CONTACTO: 777888999</p>
        </div>
        <div class="col">
          <p class="section-title">SIGUENOS</p>
          <p class="section-text">NUESTRAS REDES SOCIALES</p>
          <div>
            <a href="">
              <img src="../assets/facebookIcon.png" alt="" class="icons" />
            </a>
            <a href="https://www.instagram.com/moronirb/">
              <img src="../assets/instagramIcon.png" alt="" class="icons" />
            </a>
            <a href="">
              <img src="../assets/xIcon.png" alt="" class="icons" />
            </a>
          </div>
        </div>
        <div class="col">
          TODOS LOS DERECHOS RESERVADOS<br />
          <p>&copy; 2024 Order.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background-color: #d9d9d9;
  padding: 30px;
  color: #676363;
}

.icons {
  width: 20px;
  height: 20px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.section-text {
  font-size: 0.8rem;
  font-weight: 500;
}

/* Ajusta los íconos para pantallas más pequeñas */
@media (max-width: 768px) {
  .icons {
    width: 6vh; /* Aumenta el tamaño para mejor visibilidad */
    height: 6vh;
    margin: 1vh; /* Reduce el margen para ahorrar espacio */
  }

  .footer {
    justify-content: center; /* Centra los elementos para una mejor visualización en pantallas pequeñas */
    padding: 5vh 0; /* Aumenta el padding vertical para más espacio */
  }

  .footer > div {
    margin-bottom: 4vh; /* Añade margen inferior entre los elementos */
  }
}

/* Maneja mejor el espacio y la distribución para dispositivos muy pequeños */
@media (max-width: 480px) {
  .footer {
    flex-direction: column; /* Cambia la dirección a columna para una mejor visualización */
    align-items: center; /* Alinea elementos al centro */
  }

  .footer > div {
    text-align: center; /* Centra el texto de cada sección */
  }
}

/* Estilo específico para la sección de derechos de autor */
/* Ajusta el margen superior para que siempre esté en la parte inferior */
.copyright {
  width: 100%; /* Asegura que ocupe todo el ancho disponible */
  text-align: center; /* Centra el texto */
  margin-top: auto; /* Mueve el texto hacia abajo */
  padding-top: 2vh; /* Añade un poco de espacio en la parte superior */
}
</style>
