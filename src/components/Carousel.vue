<template>
  <div class="container-carousel">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      :next-label="'Siguiente'"
      :prev-label="'Anterior'"
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide class="container-image">
        <template #img>
          <img src="../assets/comida2.jpg" alt="Imagen 1" />
        </template>
        <div class="carousel-caption d-none d-md-block">
          <h5>¡Prueba nuestros buffetes!</h5>
        </div>
      </b-carousel-slide>

      <b-carousel-slide class="container-image">
        <template #img>
          <img src="../assets/comida1.jpg" alt="Imagen 1" />
        </template>
        <div class="carousel-caption d-none d-md-block">
          <h5>¡Cónoce nuestros mejores paquetes!</h5>
        </div>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<style>
.container-carousel {
  height: 70vh;
}
.container-image {
  height: 70vh;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}
</style>
