<template>
  <div class="mine">
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
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
    <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            src="../assets/comida2.jpg"
            alt="Imagen 1"
          >
        </template>
        <div class="carousel-caption d-none d-md-block">
          <h5>¡Prueba nuestros buffetes!</h5>
        </div>
      </b-carousel-slide>

      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            src="../assets/comida3.jpg"
            alt="Imagen 1"
          >
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
      sliding: null
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
}
</script>

<style>
.mine{
    width: 85%;
    height: 20%;
    margin-left: 7.5%;
    margin-bottom: 0;
}
h5{
  font-size: 2.5rem;
  font-family: 'Montserrat', sans-serif;
}
</style>
