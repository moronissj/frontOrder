<!-- QUITE LOS V MODEL VALUE -->
<template>
  <div id="container">
    <div class="row">
      <div class="col-3">
        <b-card
          header="Daniel Carrillo"
          header-text-variant="white"
          header-tag="header"
          header-bg-variant="dark"
          style="max-width: 20rem"
          id="card-1"
        >
          <b-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            nisi enim, posuere ornare ipsum non, ultricies condimentum ante.
          </b-card-text>
          <b-form-rating variant="warning" class="mb-2"></b-form-rating>
        </b-card>
      </div>
      <div class="col-3">
        <b-card
          header="Jesús Ramírez"
          header-text-variant="white"
          header-tag="header"
          header-bg-variant="dark"
          style="max-width: 20rem"
          id="card-2"
        >
          <b-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            nisi enim, posuere ornare ipsum non, ultricies condimentum ante.
          </b-card-text>
          <b-form-rating variant="warning" class="mb-2"></b-form-rating>
        </b-card>
      </div>
      <div class="col-3">
        <b-card
          header="Moroni Rodriguez"
          header-text-variant="white"
          header-tag="header"
          header-bg-variant="dark"
          style="max-width: 20rem"
          id="card-1"
        >
          <b-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            nisi enim, posuere ornare ipsum non, ultricies condimentum ante.
          </b-card-text>
          <b-form-rating variant="warning" class="mb-2"></b-form-rating>
        </b-card>
      </div>
      <div class="col-3">
        <b-card
          header="UN PENDEJO"
          header-text-variant="white"
          header-tag="header"
          header-bg-variant="dark"
          style="max-width: 20rem"
          id="card-2"
        >
          <b-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            nisi enim, posuere ornare ipsum non, ultricies condimentum ante.
          </b-card-text>
          <b-form-rating variant="warning" class="mb-2"></b-form-rating>
        </b-card>
      </div>
    </div>
  </div>
</template>

<style>
#container {
  margin-bottom: 50px;
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
