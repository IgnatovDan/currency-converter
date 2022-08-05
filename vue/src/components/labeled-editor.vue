<template>
  <label class="labeled__editor">
    {{ caption }}
    <slot />
  </label>
</template>

<script>
export default {
  props: {
    caption: { type: String, required: true },
  }
}
</script>

<style scoped>
.labeled__editor {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 5px;
}
</style>
