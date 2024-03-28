<template>
  <div class="app">
    <NavbarAdmin />
    <div class="head">
      <h1>SOLICITUDES</h1>
    </div>

    <div class="buscar">
      <b-form-input class="mr-sm-2" placeholder="Buscar"></b-form-input>
      <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
    </div>

    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>

      <b-table
        id="my-table"
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        small
      >
        <template #cell(creacion)="data">
          {{ data.item.creacion }}
        </template>

        <template #cell(servicio)="data">
          {{ data.item.servicio }}
        </template>

        <template #cell(estado)="data">
          <span
            :class="{
              'text-success': data.item.aprobado,
              'text-danger': !data.item.aprobado,
            }"
          >
            {{ data.item.aprobado ? "Aprobado" : "No Aprobado" }}
          </span>
        </template>

        <template #cell(acciones)="data">
          {{ data.item.acciones }}
          <b-form-checkbox
            :v-model="checkedStates[data.item.id]"
            :name="`check-button-${data.item.id}`"
            switch
            @change="updateState(data.item.id)"
          >
          </b-form-checkbox>
          <b-button @click="modificar(data.item)" variant="success">
            <b-icon icon="check" scale="1"></b-icon>
          </b-button>
          <b-button @click="eliminar(data.item)" variant="danger">
            <b-icon icon="x" scale="1"></b-icon>
          </b-button>
          <b-button @click="ver(data.item)" variant="primary">
            <b-icon icon="circle" scale="1"></b-icon>
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import NavbarAdmin from "./NavbarAdmin.vue";

export default {
  components: {
    NavbarAdmin,
  },
  data() {
    return {
      checkedStates: {},
      perPage: 5,
      currentPage: 1,
      fields: [
        { key: "id", label: "ID" },
        { key: "nombre", label: "Nombre" },
        { key: "creacion", label: "Creacion" },
        { key: "servicio", label: "Servicio" },
        { key: "estado", label: "Estado" },
        { key: "acciones", label: "Acciones" },
      ],
      items: [
        {
          id: 1,
          nombre: "Fred",
          creacion: "23/03/2024",
          servicio: "comida",
          aprobado: false,
        },
        {
          id: 2,
          nombre: "Wilma",
          creacion: "23/03/2024",
          servicio: "comida",
          aprobado: false,
        },
        {
          id: 3,
          nombre: "Barney",
          creacion: "23/03/2024",
          servicio: "comida",
          aprobado: false,
        },
        {
          id: 3,
          nombre: "Barney",
          creacion: "23/03/2024",
          servicio: "comida",
          aprobado: false,
        },
        {
          id: 3,
          nombre: "Barney",
          creacion: "23/03/2024",
          servicio: "comida",
          aprobado: false,
        },
        {
          id: 3,
          nombre: "Barney",
          creacion: "23/03/2024",
          servicio: "comida",
          aprobado: false,
        },
        {
          id: 3,
          nombre: "Barney",
          creacion: "23/03/2024",
          servicio: "comida",
          aprobado: false,
        },
        {
          id: 3,
          nombre: "Barney",
          creacion: "23/03/2024",
          servicio: "comida",
          aprobado: false,
        },
      ],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    ver(item) {
      // logic for viewing an item
    },
    crear(item) {
      // logic for creating an item
    },
    modificar(item) {
      // logic for modifying an item
    },
    eliminar(item) {
      // logic for deleting an item
    },
    updateState(itemId) {
      // this.$set is not necessary here since we are just toggling a boolean
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        item.aprobado = !item.aprobado;
        this.checkedStates[itemId] = item.aprobado;
      }
    },
  },
};
</script>

<style scoped>
.head {
  margin: 5vh;
  color: #ae0505;
  display: flex;
  justify-content: space-between;
}

input {
  width: 50vh;
}

.buscar {
  display: flex;
  justify-content: center;
}
</style>
