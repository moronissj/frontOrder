<template>
  <div class="cancel">
    <h1>Pago Cancelado</h1>
    <p>La orden no ha sido registrada. No se realizó ningún cargo.</p>
    <router-link to="/">Intentar de nuevo</router-link>
  </div>
</template>

<script>
export default {
  name: "CancelView",
};
</script>
