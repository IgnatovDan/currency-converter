<template>
  <select
    v-if="this.editorType && this.editorType.match(/combobox/i)"
    v-bind="$attrs"
    v-model="inputValue"
    class="ui-editor"
    :required="required"
  >
    <option v-for="item in listItems" :key="item.value" :value="item.value">
      {{ item.text }}
    </option>
  </select>

  <input
    v-else
    v-bind="$attrs"
    :type="inputType"
    v-model="inputValue"
    class="ui-editor"
    :required="required"
    :step="step"
  />
</template>

<script>
export default {
  props: {
    editorType: { type: String },
    modelValue: { type: [Number, String] },
    required: { type: Boolean, default: false },
    step: { type: Number },
    listItems: {
      type: Array,
      validator: (items) =>
        items.every((item) => typeof item === 'object' && item !== null && 'value' in item && 'text' in item),
    },
  },

  computed: {
    inputType() {
      return !this.editorType || this.editorType.match(/spinbutton/i) ? 'number' : null;
    },
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue);
      }
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
