<template>
  <Header/>
  <router-view></router-view>
</template>

<script>
import Header from './shared/components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Teko:wght@300..700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  font-family: "Comfortaa", sans-serif;
}

.container {
  max-width: 1230px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
