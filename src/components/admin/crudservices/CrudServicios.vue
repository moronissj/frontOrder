<template>
  <div class="app">
    <NavbarAdmin />
    <div class="container">
      <div class="head">
        <div class="row">
          <div class="col">
            <h1>SERVICIOS</h1>
          </div>
          <div class="col" id="colButton">
            <CreateServiceModal
              @registroExitoso="fetchServices"
            ></CreateServiceModal>
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
            id="servicesTable"
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
                  v-b-tooltip.hover.top
                  title="Ver más detalles"
                  class="table-button plus-button-table"
                  size="sm"
                  variant="info"
                  @click="row.toggleDetails"
                >
                  <b-icon icon="plus" scale="1.5"></b-icon>
                </b-button>

                <EditServiceModal
                  :key="'modalEdicion_' + row.item.serviceId"
                  :service="row.item"
                  @actualizacionExitosa="fetchServices"
                ></EditServiceModal>

                <b-button
                  v-b-tooltip.hover.top
                  title="Eliminar"
                  draggable="true"
                  @dragstart="handleDragStart($event, row.item)"
                  class="table-button"
                  variant="danger"
                  size="sm"
                >
                  <b-icon icon="arrow-down-right" scale="1"></b-icon>
                </b-button>
              </div>
            </template>

            <template #row-details="row">
              <div class="row">
                <div
                  class="col-4"
                  style="
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <div
                    v-for="(value, key) in processedDetails[row.index]"
                    :key="key"
                  >
                    <div v-if="key === 'Imagen'">
                      <div
                        class="item-image-container"
                        style="width: 200px; border-radius: 10px"
                      >
                        <img
                          :src="value"
                          alt="Service Image"
                          style="
                            width: 150px;
                            height: auto;
                            border-radius: 10px;
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="col-4"
                  style="
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <div class="info-card">
                    <div
                      v-for="(value, key) in processedDetails[row.index]"
                      :key="key"
                    >
                      <div
                        style="margin: 10px"
                        v-if="
                          key !== 'Imagen' &&
                          key !== 'Descripción' &&
                          key !== 'serviceImage' &&
                          key !== 'Estado'
                        "
                      >
                        <b>{{ key }}</b> : {{ value }}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="col-4"
                  style="
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <div class="info-card">
                    <div
                      v-for="(value, key) in processedDetails[row.index]"
                      :key="key"
                    >
                      <div
                        style="margin: 10px"
                        v-if="
                          key !== 'Imagen' &&
                          key !== 'serviceImage' &&
                          key !== 'Número' &&
                          key !== 'Nombre del servicio' &&
                          key !== 'Frase del servicio' &&
                          key !== 'Estado'
                        "
                      >
                        <b>{{ key }}</b> : {{ value }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                class="my-0"
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
          @dragover.prevent
          @drop="handleDropOnTrash"
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
import CreateServiceModal from "./CreateServiceModal.vue";
import EditServiceModal from "./EditServiceModal.vue";
import { useSecret } from "@/stores/key";

export default {
  name: "CrudServicios",
  components: {
    NavbarAdmin,
    CreateServiceModal,
    EditServiceModal,
  },
  data() {
    return {
      key: "",
      items: [],
      fields: [
        {
          key: "serviceName",
          label: "Nombre del servicio",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "serviceState",
          label: "Estado del servicio",
          formatter: (value) => {
            if (value == "true") {
              return "Disponible";
            } else {
              return "No disponible";
            }
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        { key: "actions", label: "Acciones" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
    };
  },
  computed: {
    processedDetails() {
      return this.items.map((item) => {
        const processed = {};
        const keyMappings = {
          serviceName: "Nombre del servicio",
          serviceDescription: "Descripción",
          serviceQuote: "Frase del servicio",
          serviceId: "Número",
          serviceState: "Estado",
        };
        Object.entries(item).forEach(([key, value]) => {
          if (key !== "_showDetails") {
            const friendlyKey = keyMappings[key] || key;
            if (key === "serviceImgUrl") {
              processed["Imagen"] = value;
            } else {
              processed[friendlyKey] = value;
            }
          }
        });
        return processed;
      });
    },
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    this.fetchServices();
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    handleDragStart(e, item) {
      console.log(item.serviceId);
      e.dataTransfer.setData("text/plain", item.serviceId);
    },
    deleteServiceOnDrop(id) {
      this.key = useSecret();

      this.$swal({
        title: "¿Estas seguro?",
        text: "No podras revertir este cambio",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "cancelar",
        confirmButtonText: "Si, eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            title: "Eliminando servicio",
            html: "Por favor espera mientras se elimina el servicio...",
            didOpen: () => {
              this.$swal.showLoading();
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          });
          const serializedData = JSON.stringify({
            serviceId: id,
          });
          const encryptedData = this.$encryptionService.encryptData(
            serializedData,
            this.key
          );

          const token = localStorage.getItem("token");
          if (token) {
            this.$http
              .delete("/api/services/delete-service", {
                data: encryptedData,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                this.$swal.close();
                this.$swal({
                  title: "Eliminado",
                  text: "El servicio ha sido eliminado con exito",
                  icon: "success",
                });
                this.fetchServices();
              })
              .catch((error) => {
                this.$swal.close();
                if (error.response.data.status === 409) {
                  this.$swal({
                    title: "No se puede eliminar",
                    text: error.response.data.message,
                    icon: "error",
                  });
                } else if (error.response.data.status === 400) {
                  this.$swal({
                    title: "No se puede eliminar",
                    text: error.response.data.message,
                    icon: "error",
                  });
                } else {
                  this.$swal({
                    title: "Error al eliminar",
                    text: "Ocurrio un error al eliminar el servicio",
                    icon: "error",
                  });
                }
              });
          }
        }
      });
    },
    handleDropOnTrash(e) {
      const serviceId = e.dataTransfer.getData("text/plain");
      this.deleteServiceOnDrop(serviceId);
    },
    fetchServices() {
      const secretStore = useSecret();
      this.key = secretStore.secretKey;
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("/api/services", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.items = response.data.map((item) =>
              this.decryptServiceData(item)
            );
            this.items = response.data;
            this.totalRows = this.items.length;
          })
          .catch((e) => {
            console.error("Error en la peticion: ", e);
          });
      }
    },
    decryptServiceData(item) {
      const fieldsToDecrypt = [
        "serviceId",
        "serviceName",
        "serviceDescription",
        "serviceQuote",
        "serviceImgUrl",
        "serviceState",
      ];
      fieldsToDecrypt.forEach((field) => {
        item[field] = this.$encryptionService.decryptData(
          item[field],
          this.key
        );
      });
      return item;
    },
  },
  mounted() {
    const secretStore = useSecret();
    this.key = secretStore.secretKey;
    this.fetchServices();
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
  width: 10%;
  background-color: white;
  border: 1px solid black;
  color: black;
}

.actions-container {
  display: flex;
  justify-content: space-between;
}

.table-container {
  height: auto;
  border: none;
  border-radius: 10px;
  border: 1px solid black;
  overflow: auto;
  margin-bottom: 50px;
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

.info-card {
  background-color: rgb(221, 221, 221);
  color: black;
  padding: 20px;
  font-size: 1.1rem;
  border-radius: 20px;
}
</style>
