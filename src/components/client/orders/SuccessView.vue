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
export default {
  name: "SuccessView",
  data() {
    return {
      estado: "Empty",
    };
  },
  mounted() {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      const storedOrderDetails = localStorage.getItem("orderDetails");
      if (storedOrderDetails) {
        const orderDetails = JSON.parse(storedOrderDetails);
        const token = localStorage.getItem("token");
        const combinedDateTime = `${orderDetails.orderDate}T${orderDetails.orderTime}:00`;
        const formData = {
          orderDate: orderDetails.orderDate,
          orderPlace: orderDetails.orderPlace,
          orderTime: combinedDateTime,
          packagesIds: [orderDetails.packageIds[0]],
          sessionId: sessionId,
        };
        console.log(formData);
        if (token) {
          this.$http
            .post("api/orders", formData, {
              headers: {
                Authorization: `Bearer ${token}`,
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
};
</script>
