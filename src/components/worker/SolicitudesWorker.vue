<template>
  <div class="app">
    <NavbarWorker />
    <div class="container">
      <div class="head">
        <div class="row">
          <div class="col">
            <h1>Mis asignaciones</h1>
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
            id="ordersTable"
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
                    <template
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
                aria-controls="ordersTable"
              ></b-pagination>
            </div>
          </div>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarWorker from "./NavbarWorker.vue";
import { useSecret } from "@/stores/key";

export default {
  name: "SolicitudesWorker",
  components: {
    NavbarWorker,
  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: "orderType",
          label: "Tipo de orden",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "orderState",
          label: "Estado de la orden",
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
          orderId: "Clave de la orden",
          orderDate: "La orden fue solicitada para el día",
          orderPlace: "Lugar del pedido",
          orderState: "Estado del pedido",
          orderTime: "La orden fue solicitada para esta hora",
          orderTotalPayment: "El total a pagar sería",
          orderPaymentState: "Estado del cobro",
          orderType: "Tipo de orden",
          orderTotalHours: "Duración en horas de la orden",
          packageNames: "Paquete(s) solicitado(s)",
          comboNames: "Combo solicitado",
          workerNames: "Trabajador(es) asignado(s)",
          orderTotalWorkers: "Total de trabajadores a asignar",
        };
        Object.entries(item).forEach(([key, value]) => {
          if (
            key !== "_showDetails" &&
            key !== "userFirstLastName" &&
            key !== "userSecondLastName" &&
            key !== "userName" &&
            key !== "userEmail" &&
            key !== "userCellphone" &&
            key !== "commonUserId"
          ) {
            const friendlyKey = keyMappings[key] || key;
            processed[friendlyKey] = value;
          }
        });
        return processed;
      });
    },
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    fetchOrders() {
      const secretStore = useSecret();
      this.key = secretStore.secretKey;
      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("/api/orders/worker-assigned-orders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.items = response.data.map((item) =>
              this.decryptOrderData(item)
            );
            this.items = response.data;
            this.totalRows = this.items.length;
          })
          .catch((e) => {
            console.error("Error en la peticion: ", e);
          });
      }
    },
    decryptOrderData(item) {
      const fieldsToDecrypt = [
        "commonUserId",
        "orderDate",
        "orderId",
        "orderPaymentState",
        "orderPlace",
        "orderState",
        "orderTime",
        "orderTotalHours",
        "orderTotalPayment",
        "orderType",
        "userCellphone",
        "userEmail",
        "userFirstLastName",
        "userName",
        "userSecondLastName",
        "orderTotalWorkers",
      ];

      fieldsToDecrypt.forEach((field) => {
        if (item[field]) {
          item[field] = this.$encryptionService.decryptData(
            item[field],
            this.key
          );
        }
      });

      if (item.packageNames) {
        item.packageNames = item.packageNames.map((name) =>
          this.$encryptionService.decryptData(name, this.key)
        );
      }
      if (item.workerNames) {
        item.workerNames = item.workerNames.map((name) =>
          this.$encryptionService.decryptData(name, this.key)
        );
      }
      if (item.comboNames) {
        item.comboNames = item.comboNames.map((name) =>
          this.$encryptionService.decryptData(name, this.key)
        );
      }

      if (item.packageNames && Array.isArray(item.packageNames)) {
        item.packageNames = item.packageNames.join(", ");
      }
      if (item.workerNames && Array.isArray(item.workerNames)) {
        item.workerNames = item.workerNames.join(", ");
      }
      if (item.comboNames && Array.isArray(item.comboNames)) {
        item.comboNames = item.comboNames.join(", ");
      }

      if (typeof item.packageNames === "string") {
        item.packageNames = item.packageNames.replace(/^\[|\]$/g, "");
      }
      if (typeof item.workerNames === "string") {
        item.workerNames = item.workerNames.replace(/^\[|\]$/g, "");
      }
      if (typeof item.comboNames === "string") {
        item.comboNames = item.comboNames.replace(/^\[|\]$/g, "");
      }

      if (item.orderDate) {
        item.orderDate = this.formatDate(item.orderDate);
      }

      return item;
    },
    formatDate(dateString) {
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },
  },
  mounted() {
    const secretStore = useSecret();
    this.key = secretStore.secretKey;
    this.totalRows = this.items.length;
    this.fetchOrders();
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
</style>
