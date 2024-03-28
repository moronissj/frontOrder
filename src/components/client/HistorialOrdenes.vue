<template>
  <div class="app">
    <NavbarClient />
    <div class="content">
      <h1>Historial de pedidos</h1>
      <div class="overflow-auto"></div>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <p class="mt-3">Página Actual: {{ currentPage }}</p>

      <b-table
        id="my-table"
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        small
        class="align-middle"
      >
        <template #cell(estado)="row">
          <span :class="['badge', getBadgeClass(row.item.estado)]">
            {{ row.item.estado }}
          </span>
        </template>
        <template #cell(detalles)="row">
          <b-button size="sm" @click="verDetalles(row.item)"
            >Ver detalles</b-button
          >
        </template>
      </b-table>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavbarClient from "./NavbarClient.vue";
import Footer from "../Footer.vue";
import { BBadge, BButton, BTable, BPagination } from "bootstrap-vue";

export default {
  components: {
    NavbarClient,
    Footer,
    BBadge,
    BButton,
    BTable,
    BPagination,
  },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      fields: [
        { key: "id", label: "#" },
        { key: "servicio", label: "Servicio Solicitado" },
        { key: "estado", label: "Estado" },
        { key: "detalles", label: "Detalles" },
      ],
      items: [
        { id: 1, servicio: "Taquiza", estado: "Pendiente" },
        { id: 2, servicio: "Transporte", estado: "Servido" },
        { id: 3, servicio: "Transporte", estado: "Aprobado" },
        // Puedes agregar más items con los datos correspondientes
      ],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    getBadgeClass(estado) {
      const textVariants = {
        Pendiente: "text-danger", // Cambia a las clases adecuadas para el texto
        Aprobado: "text-primary",
        Servido: "text-success",
        Otro: "text-warning",
        // Agrega más estados y clases de texto según necesites
      };
      return textVariants[estado] || "text-secondary"; // 'text-secondary' como fallback para estados no definidos
    },
    verDetalles(item) {
      // Aquí la lógica para ver los detalles del item
      console.log("Detalles del item:", item);

      this.$router.push("/detalles-pedido");
    },
  },
};
</script>

<style scoped>
/* Tu CSS existente aquí */

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Establece la altura mínima del contenedor principal al 100% de la altura de la ventana */
}

.content {
  flex: 1; /* Esto hace que el contenido crezca y ocupe todo el espacio disponible, empujando el footer hacia abajo */
}

footer {
  margin-top: auto; /* Esto empujará el footer hacia abajo, al final de la página */
}

span {
  font-weight: bolder;
}

h1 {
  margin: 5vh;
  color: #ae0505;
}

#my-table td,
#my-table th {
  vertical-align: middle !important; /* Asegura la alineación vertical al medio */
}

/* Clases para los estados de la tabla */
.badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 1em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.375rem;
}
</style>
./client/NavbarClient.vue
