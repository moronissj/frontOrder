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
                <a href="">
                  <img src="../assets/facebookIcon.png" alt="" class="icons">
                </a>
                <a href="https://www.instagram.com/moronirb/">
                  <img src="../assets/instagramIcon.png" alt="" class="icons">
                </a>
                <a href="">
                  <img src="../assets/xIcon.png" alt="" class="icons">
                </a>
                
            </div>
        </div>

        <div class="copyright">
            TODOS LOS DERECHOS RESERVADOS<br>
            <p>&copy; 2024 Order.com</p>
        </div>
        
    </div>
</template>

<style scoped>
.footer {
  background-color: #333;
  font-family: 'Montserrat', sans-serif; /* Corregido el nombre de la fuente */
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se ajusten al tamaño de pantalla */
  justify-content: space-around; /* Distribuye el espacio alrededor de los elementos */
  padding: 2.5vh;
  margin-bottom: 0%;
  color:white
}

.icons {
  width: 4vh;
  height: 4vh;
  margin: 2.5vh;
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
