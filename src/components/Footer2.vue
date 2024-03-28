<template>
  <div class="footer">
    <div>
      <h2>ORDER.COM</h2>
      <div>SERVICIOS DE BUFFETS, TRANSPORTE, UTILERIA Y MÁS...</div>
      <div>CONTACTO: 777888999</div>
    </div>

    <div>
      <h2>SIGUENOS</h2>
      <div>NUESTRAS REDES SOCIALES</div>
      <div>
        <img src="../assets/facebookIcon.png" alt="" class="icons" />
        <img src="../assets/instagramIcon.png" alt="" class="icons" />
        <img src="../assets/xIcon.png" alt="" class="icons" />
      </div>
    </div>

    <div class="copyright">TODOS LOS DERECHOS RESERVADOS</div>
  </div>
</template>

<style scoped>
.footer {
  background-color: #d9d9d9;
  font-family: "Monserrat", sans-serif;
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se ajusten según el ancho */
  justify-content: space-around;
  padding: 2.5vh;
}

.icons {
  width: 4vh;
  height: 4vh;
  margin: 2.5vh;
}

@media (max-width: 768px) {
  .footer {
    flex-direction: column; /* Apila los elementos verticalmente en pantallas pequeñas */
    align-items: center; /* Centra el contenido */
  }

  .icons {
    width: 3vh; /* Ajusta el tamaño de los íconos si es necesario */
    height: 3vh;
  }
}

@media (min-width: 769px) {
  .footer {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* Define tres columnas en pantallas grandes */
  }
}

/* Ajuste opcional para mejorar la separación del contenido en dispositivos móviles */
.footer > div:not(:last-child) {
  margin-bottom: 2vh; /* Agrega un margen inferior a todos los divs excepto el último */
}

/* Estiliza el texto para mejor legibilidad en pantallas de diferentes tamaños */
.footer div {
  text-align: center; /* Asegura que el texto esté centrado, útil especialmente para el modo columna */
}

/* Ajusta el margen superior para dispositivos más pequeños y cuando el footer cambia a disposición en columna */
@media (max-width: 768px) {
  .copyright {
    margin-top: 0; /* Reduce el margen superior en pantallas pequeñas */
  }
}
</style>
