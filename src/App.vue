<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
  body {
    font-family: 'Roboto', sans-serif;
  }

  h1, h2, h3 {
    font-family: 'Montserrat', sans-serif;
  }
</style>
