<template>
  <div id="app">
    <Header />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'App',
  components: {
    Header,
  },
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
