<template>
  <div class="success" style="height: 100vh">
    <div v-if="estado === 'Pago registrado'">
      <div class="payment-container">
        <div class="payment-header">
          <h1 style="color: #4caf50">PAGO ÉXITOSO</h1>
        </div>
        <div class="payment-body">
          <div class="status-icon">
            <img src="../../../assets/success.png" />
          </div>
          <div class="payment-message">
            <h2>¡PAGO ÉXITOSO!</h2>
            <p>El pago ha sido registrado</p>
          </div>
          <a href="/my-orders">
            <button class="view-order-button">Ver mis ordenes</button></a
          >
        </div>
      </div>
    </div>
    <div v-else-if="estado === 'Pago imposible de rastrear'">
      <div class="payment-container">
        <div class="payment-header">
          <h1 style="color: #ddcf07">PAGO IMPOSIBLE DE RASTREAR</h1>
        </div>
        <div class="payment-body">
          <div class="status-icon">
            <img src="../../../assets/alertita.png" />
          </div>
          <div class="payment-message">
            <h2>¡Oops Algo Salió Mal...!</h2>
            <p>El pago no puede ser rastreado</p>
          </div>
          <a href="/"
            ><button class="view-order-button">Volver al inicio</button></a
          >
        </div>
      </div>
    </div>
    <div v-else-if="estado === 'Pago repetido'">
      <div class="payment-container">
        <div class="payment-header">
          <h1 style="color: #1830b9">PAGO DUPLICADO</h1>
        </div>
        <div class="payment-body">
          <div class="status-icon">
            <img src="../../../assets/db.png" />
          </div>
          <div class="payment-message">
            <h2>¡Espera un momento!</h2>
            <p>El pago ya ha sido registrado</p>
          </div>
          <a href="/"
            ><button class="view-order-button">Volver al inicio</button></a
          >
        </div>
      </div>
    </div>
    <div v-else>
      <p>Cargando...</p>
    </div>
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

<style scoped>
.payment-container {
  font-family: "Helvetica", "Arial", sans-serif;
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  margin: auto;
  margin-top: 5%;
}

img {
  width: 40%;
  height: 40%;
}

.payment-header {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

.payment-header h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.payment-body {
  padding: 20px;
  text-align: center;
  height: auto;
}

img {
  width: 50%;
  height: 50%;
}

.payment-message h2 {
  font-size: 22px;
  color: #1830b9;
  margin: 10px 0;
}

.payment-message p {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.view-order-button {
  background-color: #1830b9;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.view-order-button:hover {
  background-color: #3d56e7;
}
</style>
