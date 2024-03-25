<template>
    <div id="app">
    <Fancybox
      :options="{
        Carousel: {
          infinite: false,
          controls
        },
      }"
    >
      <a data-fancybox="gallery" href="https://diagnhos.com/wp-content/uploads/2021/10/equipo-para-buffet-banquetes-para-transportar-alimentos.jpg">
        <img src="https://diagnhos.com/wp-content/uploads/2021/10/equipo-para-buffet-banquetes-para-transportar-alimentos.jpg" width="300" height="200" />
      </a>
      <a data-fancybox="gallery" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7FDf4KG-blHFuGYjzCJGMJnoP3wzZQwXdDViavt0PQQ&s">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7FDf4KG-blHFuGYjzCJGMJnoP3wzZQwXdDViavt0PQQ&s" width="300" height="200" />
      </a>
    </Fancybox>
  </div>
  </template>
  <script>
  
  import Fancybox from '../Fancybox.vue';
  
  export default {
  name: 'App',
  components: {
  Fancybox,
  },
  };
  </script>
  
  <style></style>