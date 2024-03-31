<script setup></script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Montserrat", sans-serif;
  color: #2c3e50;
  height: 100%;
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
