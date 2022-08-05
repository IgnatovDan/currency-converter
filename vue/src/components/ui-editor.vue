<template>
  <component
    :is="tagName"
    v-bind="$attrs"
    :value="modelValue"
    class="ui-editor"
    :required="required"
    :step="step"
    @input="handleInput($event.target.value)"
  >
    <option v-for="item in listItems" :key="item.value" :value="item.value">
      {{ item.text }}
    </option>
  </component>
</template>

<script>
export default {
  props: {
    tagName: { type: String, required: true },
    modelValue: { type: [Number, String], required: true },
    required: { type: Boolean, required: true },
    step: { type: Number },
    listItems: {
      type: Array,
      validator: (items) =>
        items.every((item) => typeof item === 'object' && item !== null && 'value' in item && 'text' in item),
    },
  },

  emits: ['update:modelValue'],

  methods: {
    handleInput(newValue) {
      this.$emit('update:modelValue', newValue);
    },
  },
};
</script>

<style scoped>
.ui-editor {
  /* reset browser styles */
  border: 0;

  width: 100%;

  box-sizing: border-box;
  height: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 3px;

  padding-left: 10px;
  padding-right: 10px;

  font-style: normal;
  font-weight: 400;
}

.ui-editor:focus {
  outline: none;
  border-bottom: 4px solid rgba(0, 0, 0, 0.4);
  padding-bottom: 0px;
}
</style>
