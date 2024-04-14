<template>
  <div class="buffet-page">
    <header class="header">
      <h1>Buffetes Exquisitos</h1>
    </header>

    <main class="buffet-container">
      <section class="buffet-section">
        <h2>Nuestros Especiales</h2>
        <div class="buffet-list">
          <div
            class="buffet-item"
            v-for="(buffet, index) in buffets"
            :key="index"
          >
            <img
              :src="buffet.image"
              :alt="buffet.name"
              style="width: 300px; height: 200px"
            />
            <h3>{{ buffet.name }}</h3>
            <p>{{ buffet.description }}</p>
            <span class="price">{{ buffet.price }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buffets: [
        {
          name: "Buffet Italiano",
          description: "Deliciosos platos italianos.",
          price: "$25",
          image:
            "https://gaceta.cch.unam.mx/sites/default/files/styles/imagen_articulos_1920x1080/public/2022-03/fdb21d99-6185-4690-888c-33179b6248ed_16-9-aspect-ratio_default_0.jpeg?h=148742b8&itok=TB6S4oPa",
        },
        {
          name: "Buffet Mexicano",
          description: "Auténtica comida mexicana.",
          price: "$20",
          image:
            "https://img.freepik.com/foto-gratis/celebracion-fiesta-mesa-buffet-gourmet_1203-4935.jpg?2",
        },
        {
          name: "Buffet Asiático",
          description: "Sabores exóticos de Asia.",
          price: "$30",
          image:
            "https://www.shutterstock.com/image-photo/chinese-fast-food-buffet-restaurant-600nw-650073913.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.buffet-page {
  font-family: Arial, sans-serif;
}

.header {
  background-color: #ae0505;
  color: #fff;
  padding: 20px;
}

.header h1 {
  margin: 0;
  font-size: 1.75rem;
}

.buffet-container {
  padding: 20px;
}

.buffet-section {
  margin-bottom: 40px;
}

.buffet-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.buffet-item {
  flex: 1 0 300px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  max-width: 100%;
  height: auto;
}

.price {
  font-weight: bold;
  color: #ff7f0e;
}

@media (max-width: 768px) {
  .buffet-item {
    flex: 1 0 45%;
  }
}

@media (max-width: 480px) {
  .buffet-item {
    flex: 1 0 100%;
  }

  .header h1 {
    font-size: 1.5rem;
  }
}
</style>
