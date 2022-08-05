<template>
  <div class="app">
    <AppHeader class="app__header" />
    <AppMain />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/app-header.vue';
import AppMain from './components/app-main.vue';
import AppFooter from './components/app-footer.vue';

export default {
  name: 'App',
  components: { AppHeader, AppMain, AppFooter },
};
</script>

<style scoped>
.app {
  min-width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}

.app__header {
  padding-bottom: 20px;
}
</style>
