<script setup>
// import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <div id="app">
   
     <!--
  <router-link to="/">Inicio</router-link>
      <router-link to="/main">Formulario</router-link>
      <router-link to="/pagination">Paginación</router-link>
     --> 

  <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: white;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: #9c9a10;
  padding: 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
