<template>
  <div id="app">
    <Fancybox
      :options="{
        Carousel: {
          infinite: false,
          controls,
        },
      }"
    >
      <a
        data-fancybox="gallery"
        href="https://diagnhos.com/wp-content/uploads/2021/05/gabinete-de-conservacion-con-baja-temperatura-750-ctus.jpg"
      >
        <img
          src="https://diagnhos.com/wp-content/uploads/2021/05/gabinete-de-conservacion-con-baja-temperatura-750-ctus.jpg"
          width="300"
          height="200"
        />
      </a>
      <a
        data-fancybox="gallery"
        href="https://static.sammic.com/img/hiweb/55323/1ee1d/transporte-grandes-cargas.jpg"
      >
        <img
          src="https://static.sammic.com/img/hiweb/55323/1ee1d/transporte-grandes-cargas.jpg"
          width="300"
          height="300"
        />
      </a>
    </Fancybox>
  </div>
</template>
<script>
import Fancybox from "../Fancybox.vue";

export default {
  name: "App",
  components: {
    Fancybox,
  },
};
</script>

<style></style>
