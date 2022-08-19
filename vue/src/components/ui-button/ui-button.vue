<template>
  <button class="ui-button" :aria-label="text">
    <img v-if="image" class="ui-button__image" :src="image" :alt="text" />
    <p class="ui-button__text">{{ text }}</p>
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    image: String,
  },
};
</script>

<style scoped>
.ui-button__image {
  width: 1rem;
  height: 1rem;

  /* image is 'inline' element and it is vertically centered as 'text' (baseline) that creates 'magic bottom margin'*/
  display: block;
}

.ui-button__text {
  /* reset browser styles */
  padding: 0;
  margin: 0;

  display: none;
}
</style>
