<template>
  <main class="app-main">
    <converter class="app-main__converter" />
  </main>
</template>

<script>
import Converter from "./converter.vue";

export default {
  components: { Converter }
}

</script>

<style scoped>
.app-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-main__converter {
  max-width: 300px;
  width: 70%;
}
</style>
