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
    <a data-fancybox="gallery" href="https://lipsum.app/id/60/1600x1200">
      <img src="https://lipsum.app/id/60/200x150" width="300" height="200" />
    </a>
    <a data-fancybox="gallery" href="https://lipsum.app/id/61/1600x1200">
      <img src="https://lipsum.app/id/61/200x150" width="300" height="200" />
    </a>
    <a data-fancybox="gallery" href="https://lipsum.app/id/62/1600x1200">
      <img src="https://lipsum.app/id/62/200x150" width="300" height="200" />
    </a>
    <a data-fancybox="gallery" href="https://lipsum.app/id/63/1600x1200">
      <img src="https://lipsum.app/id/63/200x150" width="300" height="200" />
    </a>
  </Fancybox>
</div>
</template>
<script>

import Fancybox from './Fancybox.vue';

export default {
name: 'App',
components: {
Fancybox,
},
};
</script>

<style></style>