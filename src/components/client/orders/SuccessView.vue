<template>
  <div class="success">
    <!-- Contenido condicional basado en el estado -->
    <div v-if="estado === 'Pago registrado'">
      <h1>Pago Completado con Éxito</h1>
      <p>Tu orden ha sido registrada exitosamente.</p>
    </div>
    <div v-else-if="estado === 'Pago imposible de rastrear'">
      <h1>Pago no encontrado</h1>
      <p>El ID de la sesión no es válido.</p>
    </div>
    <div v-else-if="estado === 'Pago repetido'">
      <h1>Orden y pago registrados</h1>
      <p>
        La orden y el pago ya fueron registrados, en breve te confirmaremos el
        estado de tu orden.
      </p>
    </div>
    <div v-else>
      <p>Cargando...</p>
    </div>
    <router-link to="/">Volver al inicio</router-link>
  </div>
</template>

<script>
import { useSecret } from "@/stores/key";

export default {
  name: "SuccessView",
  data() {
    return {
      estado: "Empty",
      key: "",
    };
  },
  methods: {
    createOrder() {
      this.key = useSecret();

      const sessionId = new URLSearchParams(window.location.search).get(
        "session_id"
      );

      if (sessionId) {
        const storedOrderDetails = localStorage.getItem("orderDetails");
        if (storedOrderDetails) {
          const orderDetails = JSON.parse(storedOrderDetails);
          let payload = {
            orderDate: orderDetails.orderDate,
            orderPlace: orderDetails.orderPlace,
            orderTime: orderDetails.orderTime,
            sessionId: sessionId,
          };

          if (orderDetails.packageIds && orderDetails.packageIds.length > 0) {
            payload.packagesIds = [orderDetails.packageIds[0]];
          } else if (
            orderDetails.combosIds &&
            orderDetails.combosIds.length > 0
          ) {
            payload.combosIds = [orderDetails.combosIds[0]];
          }

          const serializedData = JSON.stringify(payload);

          const token = localStorage.getItem("token");
          const encryptedData = this.$encryptionService.encryptData(
            serializedData,
            this.key
          );
          if (token) {
            this.$http
              .post("api/orders", encryptedData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                this.estado = "Pago registrado";
                this.$emit("registroExitoso");
                this.$swal({
                  title: "Registrada",
                  text: "Orden registrada con exito, espera la confirmacion de uno de nuestros administradores",
                  icon: "success",
                });
                this.closeModal();
              })
              .catch((error) => {
                if (error.response.data.code === 500) {
                  this.$swal({
                    title: "Pago no encontrado",
                    text: "El ID de la sesión no es valido",
                    icon: "error",
                  });
                  this.estado = "Pago imposible de rastrear";
                } else if (error.response.data.code === 403) {
                  this.$swal({
                    title: "Orden y pago registrados",
                    text: "La orden y el pago ya fueron registrados, en breve te confirmaremos el estado de tu orden.",
                    icon: "warning",
                  });
                  this.estado = "Pago repetido";
                }
              });
          }
        }
      }
    },
  },
  mounted() {
    const secretStore = useSecret();
    this.key = secretStore.secretKey;
    this.createOrder();
  },
};
</script>
