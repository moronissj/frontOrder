<template>
  <div class="app">
    <NavbarAdmin />
    <div class="container">
      <div class="head">
        <div class="row">
          <div class="col">
            <h1>ADMINISTRADORES</h1>
          </div>
          <div class="col" id="colButton">
            <CreateAdminModal @registroExitoso="fetchAdmins"></CreateAdminModal>
          </div>
        </div>
      </div>
      <div class="table-container">
        <b-container fluid>
          <b-row style="margin-bottom: 50px">
            <b-col lg="6" class="my-1">
              <b-form-group
                label="Buscador"
                label-for="filter-input"
                label-cols-sm="3"
                label-align-sm="right"
                class="mb-0"
                style="font-weight: 600; font-size: 1.3em"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Escribe para buscar"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button
                      class="clear-button"
                      :disabled="!filter"
                      @click="filter = ''"
                      >Limpiar</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col sm="5" md="6" class="my-1">
              <b-form-group
                label="Mostrar"
                label-for="per-page-select"
                label-cols-sm="6"
                label-cols-md="4"
                label-cols-lg="3"
                label-align-sm="right"
                class="mb-0"
                style="font-weight: 600; font-size: 1.3em"
              >
                <b-form-select
                  id="per-page-select"
                  v-model="perPage"
                  :options="pageOptions"
                  style="padding: 3px; border-radius: 10px"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-table
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            stacked="md"
            fixed
            show-empty
            id="adminsTable"
            small
            @filtered="onFiltered"
            label-sort-asc="Click para ordenar ascendente"
            label-sort-desc="Click para ordenar descendente"
            label-sort-clear="Click para regresar a su estado original"
            empty-filtered-text="No hay registros que cumplan tu busqueda"
            empty-text="No hay registros para mostrar"
          >
            <template #cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template>

            <template #cell(actions)="row">
              <div class="actions-container">
                <b-button
                  class="table-button plus-button-table"
                  size="sm"
                  variant="info"
                  @click="row.toggleDetails"
                >
                  <b-icon icon="plus" scale="1.5"></b-icon>
                </b-button>
                <EditAdminModal
                  :key="'modalEdicion_' + row.item.adminId"
                  :admin="row.item"
                  @actualizacionExitosa="fetchAdmins"
                ></EditAdminModal>
                <b-button class="table-button" variant="warning" size="sm">
                  <b-icon icon="circle" scale=".7"></b-icon
                ></b-button>

                <b-button class="table-button" variant="danger" size="sm">
                  <b-icon icon="arrow-down-right" scale="1"></b-icon>
                </b-button>
              </div>
            </template>
            <template #row-details="row">
              <b-card>
                <ul>
                  <li
                    v-for="(value, key) in processedDetails[row.index]"
                    :key="key"
                    style="margin: 10px 0"
                  >
                    <template v-if="key === 'Foto del Administrador'">
                      <div
                        class="item-image-container"
                        style="margin-top: 30px; border-radius: 10px"
                      >
                        <img
                          :src="value"
                          alt="Admin Image"
                          style="width: 100px; height: auto"
                        />
                      </div>
                    </template>
                    <template v-else
                      ><b>{{ key }}</b> : {{ value }}
                    </template>
                  </li>
                </ul>
              </b-card>
            </template>
          </b-table>
          <div class="outter-pagination-container">
            <div class="inner-pagination-container">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                aria-controls="adminsTable"
              ></b-pagination>
            </div>
          </div>
        </b-container>
      </div>
      <div
        class="bin-container-outter"
        style="width: 100%; display: flex; justify-content: end; margin: 30px 0"
      >
        <div
          class="bin-container-inner"
          style="
            background: red;
            width: 5%;
            padding: 17px;
            border-radius: 50%;
            position: fixed;
            right: 20px;
            bottom: 20px;
          "
        >
          <img src="../../../assets/Basurero.png" class="logo" alt="logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarAdmin from "../NavbarAdmin.vue";
import CreateAdminModal from "./CreateAdminModal.vue";
import EditAdminModal from "./EditAdminModal.vue";
export default {
  name: "CrudAdmins",
  components: {
    NavbarAdmin,
    CreateAdminModal,
    EditAdminModal,
  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: "adminName",
          label: "Nombre del admin",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "adminFirstLastName",
          label: "Nombre del admin",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "adminSecondLastName",
          label: "Nombre del admin",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Acciones" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "ver varios" }],
      filter: null,
    };
  },
  computed: {
    processedDetails() {
      return this.items.map((item) => {
        const processed = {};
        const keyMappings = {
          adminName: "Nombre del administrador",
          adminFirstLastName: "Apelido parterno del trabajador",
          adminSecondLastName: "Apellido materno del trabajador",
          adminEmail: "Correo del trabajador",
          adminCellphone: "Telefono",
          adminSalary: "Salario",
          adminSecurityNumber: "Numero de Seguridad",
        };
        Object.entries(item).forEach(([key, value]) => {
          if (key !== "_showDetails") {
            const friendlyKey = keyMappings[key] || key;
            if (key === "adminProfilePicUrl") {
              processed["Foto del Administrador"] = value;
            } else {
              processed[friendlyKey] = value;
            }
          }
        });
        return processed;
      });
    },
  },
  mounted() {
    this.totalRows = this.items.length;
    this.fetchAdmins();
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    // handleDragStart(e, item) {
    //   console.log(item.adminId);
    //   e.dataTransfer.setData("text/plain", item.adminId);
    // },
    // deleteAdminOnDrop(id) {
    //   this.$swal({
    //     title: "¿Estas seguro?",
    //     text: "No podras revertir este cambio",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     cancelButtonText: "cancelar",
    //     confirmButtonText: "Si, eliminar",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.$http
    //         .delete(`/api/account/${id}`)
    //         .then((response) => {
    //           this.$swal({
    //             title: "Eliminado",
    //             text: "El servicio ha sido eliminado con exito",
    //             icon: "success",
    //           });
    //           this.fetchAdmins();
    //         })
    //         .catch((error) => {
    //           console.error(error);
    //         });
    //     }
    //   });
    // },
    // handleDropOnTrash(e) {
    //   const adminId = e.dataTransfer.getData("text/plain");
    //   this.deleteAdminOnDrop(adminId);
    // },
    fetchAdmins() {
      this.$http
        .get("/api/accounts/administrators")
        .then((response) => {
          this.items = response.data;
        })
        .catch((e) => {
          console.error("Error en la peticion: ", e);
        });
    },
  },
};
</script>

<style scoped>
.head {
  color: #ae0505;
  margin: 50px 0 25px 0;
}

.head .row .col h1 {
  margin: 0;
}

.buscar form button {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  padding: 10px;
}

#colButton {
  display: flex;
  justify-content: end;
}

#plusIcon {
  margin-left: 5px;
}

.table-button,
.clear-button {
  margin: 0;
}

.table-button {
  width: 14%;
  background-color: white;
  border: 1px solid black;
  color: black;
}

.actions-container {
  display: flex;
  justify-content: space-between;
}

.table-container {
  max-height: 400px;
  border: none;
  border-radius: 10px;
  border: 1px solid black;
  overflow: auto;
}

.outter-pagination-container {
  margin: 30px 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.inner-pagination-container {
  width: 30%;
}

.item-image-container {
  width: 15%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
}

ul li {
  list-style: none;
}
</style>
