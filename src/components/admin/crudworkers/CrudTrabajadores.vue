<template>
  <div class="app">
    <NavbarAdmin />
    <div class="container">
      <div class="head">
        <div class="row">
          <div class="col">
            <h1>TRABAJADORES</h1>
          </div>
          <div class="col" id="colButton">
            <CreateWorkerModal
              @registroExitoso="fetchWorkers"
            ></CreateWorkerModal>
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
            id="WorkersTable"
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
                <EditWorkerModal
                  :key="'modalEdicion_' + row.item.workerId"
                  :worker="row.item"
                  @actualizacionExitosa="fetchWorkers"
                ></EditWorkerModal>

                <b-button
                  class="table-button status-button"
                  variant="light"
                  size="sm"
                  @click="goToConfirmWorkerAccount(row.item.accountStatus)"
                  :disabled="row.item.accountStatus === 'Confirmada'"
                  :style="{
                    backgroundColor:
                      row.item.accountStatus === 'Confirmada'
                        ? '#15C151'
                        : row.item.accountStatus === 'Sin confirmar'
                        ? 'red'
                        : '',
                  }"
                >
                  <b-icon icon="circle" scale=".7"></b-icon>
                </b-button>

                <b-button
                  class="table-button"
                  draggable="true"
                  @dragstart="handleDragStart($event, row.item)"
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
                    <div v-if="key === 'Foto del trabajador'">
                      <div
                        class="item-image-container"
                        style="width: 200px; border-radius: 10px"
                      >
                        <img
                          :src="value"
                          alt="Worker Image"
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
                          key !== 'Foto del trabajador' &&
                          key !== 'Celular' &&
                          key !== 'NSS' &&
                          key !== 'Salario' &&
                          key !== 'RFC' &&
                          key !== 'Estado de la cuenta'
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
                          key !== 'Foto del trabajador' &&
                          key !== 'Número' &&
                          key !== 'Nombre' &&
                          key !== 'Apellido paterno' &&
                          key !== 'Apellido materno' &&
                          key !== 'Correo'
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
                aria-controls="WorkersTable"
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
import CreateWorkerModal from "./CreateWorkerModal.vue";
import EditWorkerModal from "./EditWorkerModal.vue";
import { useSecret } from "@/stores/key";

export default {
  name: "CrudTrabajador",
  components: {
    NavbarAdmin,
    CreateWorkerModal,
    EditWorkerModal,
  },
  data() {
    return {
      items: [],
      key: "",
      fields: [
        {
          key: "workerName",
          label: "Nombre del Trabajador",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "workerFirstLastName",
          label: "Apellido Paterno del Trabajador",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "workerSecondLastName",
          label: "Apellido Materno del Trabajador",
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
          workerId: "Número",
          workerName: "Nombre",
          workerFirstLastName: "Apellido paterno",
          workerSecondLastName: "Apellido materno",
          workerEmail: "Correo",
          workerCellphone: "Celular",
          workerSecurityNumber: "NSS",
          workerSalary: "Salario",
          workerRfc: "RFC",
          accountStatus: "Estado de la cuenta",
        };
        Object.entries(item).forEach(([key, value]) => {
          if (key !== "_showDetails" && key !== "workerState") {
            const friendlyKey = keyMappings[key] || key;
            if (key === "workerProfilePicUrl") {
              processed["Foto del trabajador"] = value;
            } else {
              processed[friendlyKey] = value;
            }
          }
        });
        return processed;
      });
    },
  },
  methods: {
    goToConfirmWorkerAccount(status) {
      if (status === "Sin confirmar") {
        this.$router.push("/admin-confirm-worker-account");
      } else {
        this.$swal({
          title: "¿De nuevo?",
          text: "La cuenta ya fue confirmada!",
          icon: "question",
        });
      }
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    handleDragStart(e, item) {
      e.dataTransfer.setData("text/plain", item.workerId);
    },
    deleteWorkerOnDrop(id) {
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
          const serializedData = JSON.stringify({
            workerId: id,
          });
          const encryptedData = this.$encryptionService.encryptData(
            serializedData,
            this.key
          );

          const token = localStorage.getItem("token");

          if (token) {
            this.$http
              .delete("/api/accounts/delete-worker", {
                data: encryptedData,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                this.$swal({
                  title: "Eliminado",
                  text: "La cuenta del trabajador ha sido eliminada con exito",
                  icon: "success",
                });
                this.fetchWorkers();
              })
              .catch((error) => {
                const message = error.response.data.message;
                this.$swal({
                  title: "No se puede eliminar",
                  text: message,
                  icon: "error",
                });
              });
          }
        }
      });
    },
    handleDropOnTrash(e) {
      const workerId = e.dataTransfer.getData("text/plain");
      this.deleteWorkerOnDrop(workerId);
    },
    fetchWorkers() {
      const secretStore = useSecret();
      this.key = secretStore.secretKey;
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("/api/accounts/workers", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.items = response.data.map((item) =>
              this.decryptWorkerData(item)
            );
          })
          .catch((e) => {
            console.error("Error en la petición: ", e);
          });
      }
    },

    decryptWorkerData(item) {
      const fieldsToDecrypt = [
        "workerId",
        "workerName",
        "workerFirstLastName",
        "workerSecondLastName",
        "workerRfc",
        "workerCellphone",
        "workerSecurityNumber",
        "workerSalary",
        "workerEmail",
        "workerProfilePicUrl",
        "accountStatus",
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
    this.fetchWorkers();
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
