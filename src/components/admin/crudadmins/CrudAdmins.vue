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
                  v-b-tooltip.hover.top
                  title="Ver más detalles"
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

                <b-button
                  class="table-button status-button"
                  variant="light"
                  v-b-tooltip.hover.top
                  title="Estado"
                  size="sm"
                  @click="goToConfirmAdminAccount(row.item.accountStatus)"
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
                    <div v-if="key === 'Foto del Administrador'">
                      <div
                        class="item-image-container"
                        style="width: 200px; border-radius: 10px"
                      >
                        <img
                          :src="value"
                          alt="Admin Image"
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
                          key !== 'Foto del Administrador' &&
                          key !== 'Telefono' &&
                          key !== 'NSS' &&
                          key !== 'Salario' &&
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
                          key !== 'Foto del Administrador' &&
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
import CreateAdminModal from "./CreateAdminModal.vue";
import EditAdminModal from "./EditAdminModal.vue";
import { useSecret } from "@/stores/key";

export default {
  name: "CrudAdmins",
  components: {
    NavbarAdmin,
    CreateAdminModal,
    EditAdminModal,
  },
  data() {
    return {
      key: "",
      items: [],
      fields: [
        {
          key: "adminName",
          label: "Nombre",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "adminFirstLastName",
          label: "Apellido paterno",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "adminEmail",
          label: "Correo",
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
          adminId: "Número",
          adminName: "Nombre",
          adminFirstLastName: "Apellido paterno",
          adminSecondLastName: "Apellido materno",
          adminEmail: "Correo",
          adminCellphone: "Telefono",
          adminSalary: "Salario",
          adminSecurityNumber: "NSS",
          accountStatus: "Estado de la cuenta",
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
  methods: {
    goToConfirmAdminAccount(status) {
      if (status === "Sin confirmar") {
        this.$router.push("/admin-confirm-admin-account");
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
      e.dataTransfer.setData("text/plain", item.adminId);
    },
    deleteAdminOnDrop(id) {
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
            title: "Eliminando administrador",
            html: "Por favor espera mientras se elimina el administrador...",
            didOpen: () => {
              this.$swal.showLoading();
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          });
          const serializedData = JSON.stringify({
            adminId: id,
          });
          const encryptedData = this.$encryptionService.encryptData(
            serializedData,
            this.key
          );

          const token = localStorage.getItem("token");

          if (token) {
            this.$http
              .delete("/api/accounts/delete-admin", {
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
                  text: "La cuenta de administrador ha sido eliminada con exito",
                  icon: "success",
                });
                this.fetchAdmins();
              })
              .catch((error) => {
                this.$swal.close();
                this.$swal({
                  title: "Error",
                  text: "Ocurrio un error al intentar eliminar el administrador",
                  icon: "error",
                });
              });
          }
        }
      });
    },
    handleDropOnTrash(e) {
      const adminId = e.dataTransfer.getData("text/plain");
      this.deleteAdminOnDrop(adminId);
    },
    fetchAdmins() {
      const secretStore = useSecret();
      this.key = secretStore.secretKey;
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("/api/accounts/administrators", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.items = response.data.map((item) =>
              this.decryptAdminData(item)
            );
            this.items = response.data;
            this.totalRows = this.items.length;
          })
          .catch((e) => {
            console.error("Error en la peticion: ", e);
          });
      }
    },
    decryptAdminData(item) {
      const fieldsToDecrypt = [
        "adminId",
        "adminName",
        "adminFirstLastName",
        "adminSecondLastName",
        "adminEmail",
        "adminCellphone",
        "adminSecurityNumber",
        "adminSalary",
        "accountStatus",
        "adminProfilePicUrl",
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
    this.fetchAdmins();
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

.status-button {
  background: white;
}

.info-card {
  background-color: rgb(221, 221, 221);
  color: black;
  padding: 20px;
  font-size: 1.1rem;
  border-radius: 20px;
}
</style>
