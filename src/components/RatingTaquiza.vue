<!-- QUITE LOS V MODEL VALUE -->
<template>
  <div id="container">
    <div>
      <b-card
        header="Carrillo Puto"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
        footer="Card Footer"
        footer-tag="footer"
        footer-bg-variant="success"
        footer-border-variant="dark"
        title="Buena Experiencia"
        style="max-width: 20rem"
        id="card-1"
      >
        <b-card-text>
          Number 9, Number 9, Number 9, Number 9, Number 9, Number 9, Number 9,
          Number 9, Number 9, Number 9...
        </b-card-text>
        <b-form-rating variant="warning" class="mb-2"></b-form-rating>
      </b-card>
    </div>
    <div>
      <b-card
        header="Jesús Ramírez"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
        footer="Card Footer"
        footer-tag="footer"
        footer-bg-variant="success"
        footer-border-variant="dark"
        title="Me gustó, pero no"
        style="max-width: 20rem"
        id="card-2"
      >
        <b-card-text>
          Number 9, Number 9, Number 9, Number 9, Number 9, Number 9, Number 9,
          Number 9, Number 9, Number 9...
        </b-card-text>
        <b-form-rating variant="warning" class="mb-2"></b-form-rating>
      </b-card>
    </div>

    <div>
      <b-card
        header="Moroni Rodriguez"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
        footer="Card Footer"
        footer-tag="footer"
        footer-bg-variant="success"
        footer-border-variant="dark"
        title="Pésima Experiencia"
        style="max-width: 20rem"
        id="card-1"
      >
        <b-card-text>
          Number 9, Number 9, Number 9, Number 9, Number 9, Number 9, Number 9,
          Number 9, Number 9, Number 9...
        </b-card-text>
        <b-form-rating variant="warning" class="mb-2"></b-form-rating>
      </b-card>
    </div>
    <div>
      <b-card
        header="Sergio Gómez"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
        footer="Card Footer"
        footer-tag="footer"
        footer-bg-variant="success"
        footer-border-variant="dark"
        title="Gran experiencia"
        style="max-width: 20rem"
        id="card-2"
      >
        <b-card-text>
          Number 9, Number 9, Number 9, Number 9, Number 9, Number 9, Number 9,
          Number 9, Number 9, Number 9...
        </b-card-text>
        <b-form-rating variant="warning" class="mb-2"></b-form-rating>
      </b-card>
    </div>
  </div>
</template>

<style>
#container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columnas por defecto */
  grid-gap: 20px; /* Espaciado entre tarjetas */
  padding: 20px; /* Agrega algo de padding alrededor del contenedor */
}

/* Ajustes para tarjetas para manejar el ancho y el margen de manera más flexible */
.b-card {
  margin-bottom: 2rem; /* Margen uniforme */
  max-width: 100%; /* Permite que la tarjeta se ajuste al contenedor */
}

/* Media queries para ajustar la disposición según el tamaño de pantalla */
@media (max-width: 1024px) {
  /* Para tablets y dispositivos menores */
  #container {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  }
}

@media (max-width: 768px) {
  /* Para dispositivos más pequeños */
  #container {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  }
}

@media (max-width: 480px) {
  /* Para móviles */
  #container {
    grid-template-columns: 1fr; /* 1 columna */
  }
}
</style>
