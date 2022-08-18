<template>
  <div v-bind="$attrs" class="converter">
    <form @submit.prevent>
      <fieldset class="converter__values">
        <UiEditor aria-label="Source amount" editorType="spinbutton" v-model="amountComputed" required :step="0.01" />
        <LabeledEditor caption="From">
          <UiEditor
            editorType="combobox"
            v-model="sourceCurrencyCharCodeComputed"
            required
            :listItems="selectCurrencyListItems"
          />
        </LabeledEditor>
        <UiButton
          class="converter__currency-toggler"
          :image="toggleIconSrc"
          text="Toggle currencies"
          @click="() => handleTogglerClick()"
        />
        <LabeledEditor caption="Into">
          <UiEditor
            editorType="combobox"
            v-model="targetCurrencyCharCodeComputed"
            required
            :listItems="selectCurrencyListItems"
          />
        </LabeledEditor>
        <LabeledEditor caption="Exchange rates source">
          <UiEditor
            editorType="combobox"
            v-model="exchangeRatesSourceKey"
            required
            :listItems="selectRatesSourceListItems"
          />
        </LabeledEditor>
      </fieldset>
    </form>
    <p class="converter__target-amount">{{ targetAmount }}</p>
    <CurrencyRateExpression
      :sourceCurrencyCharCode="sourceCurrencyCharCode"
      :targetRate="targetRate"
      :targetCurrencyCharCode="targetCurrencyCharCode"
    />
    <p v-if="warningMessage" class="converter__warning-message">{{ warningMessage }}</p>
    <LoadingPanel v-if="isLoading" />
  </div>
</template>

<script>
import UiEditor from '../ui-editor/ui-editor.vue';
import LabeledEditor from '../labeled-editor/labeled-editor.vue';
import UiButton from '../ui-button/ui-button.vue';
import LoadingPanel from '../loading-panel/loading-panel.vue';
import CurrencyRateExpression from '../currency-rate-expression/currency-rate-expression.vue';

import rateSourcesManager from '../../api/exchange-sources/exchange-sources-manager.js'; // TODO: pass as props/context
import { Currency } from '../../api/exchange-sources/exchange-rates-data-objects.js';

function convertCurrencyArrayToListItems(currencyArray) {
  return currencyArray?.map((item) => ({ value: item.CharCode, text: item.Name }));
}

function HandleValueNumberToZero(value) {
  if (Number.isNaN(value) || value === Infinity || value === undefined || value === null) {
    return 0;
  }
  return value;
}

const toggleIconSrc = require('@/assets/up-down-arrows.svg');

export default {
  components: { UiEditor, LabeledEditor, UiButton, LoadingPanel, CurrencyRateExpression },

  props: {
    selectCurrencyListItems: {
      type: Array,
      default: []
    },
    amount: { type: Number, default: 0 },
    sourceCurrencyCharCode: { type: String },
    targetCurrencyCharCode: { type: String },
    targetAmount: { type: Number, default: 0 },
    targetRate: { type: Number, default: 0 },
    warningMessage: { type: String },
    isLoading: { type: Boolean },
    exchangeRatesSourceKey: { type: String },
    selectRatesSourceListItems: {
      type: Array,
      default: []
    },
  },

  emits: [
    'update:amount',
    'update:sourceCurrencyCharCode',
    'update:targetCurrencyCharCode',
    'update:exchangeRatesSourceKey',
  ],

  data() {
    return {
      toggleIconSrc: toggleIconSrc,
    };
  },

  computed: {
    amountComputed: {
      get() {
        return this.amount;
      },
      set(newValue) {
        this.$emit('update:amount', newValue);
      },
    },
    sourceCurrencyCharCodeComputed: {
      get() {
        return this.sourceCurrencyCharCode;
      },
      set(newValue) {
        this.$emit('update:sourceCurrencyCharCode', newValue);
      }
    },
    targetCurrencyCharCodeComputed: {
      get() {
        return this.targetCurrencyCharCode;
      },
      set(newValue) {
        this.$emit('update:targetCurrencyCharCode', newValue);
      }
    }
  },

  methods: {
    handleTogglerClick() {
      const currentSourceCurrencyCharCode = this.sourceCurrencyCharCode;
      this.$emit('update:sourceCurrencyCharCode', this.targetCurrencyCharCode);
      this.$emit('update:targetCurrencyCharCode', currentSourceCurrencyCharCode);
    },
  },

  watch: {},
};
</script>

<style scoped>
.converter {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  /* start new stacking context to use absolute for loading-panel */
  position: relative;
}

.converter__field-set {
  border: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 30px;
}

.converter__currency-toggler {
  align-self: center;
}

.converter__warning-message {
  /* reset browser styles */
  padding: 0;
  margin: 0;

  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -20%);
  width: 100%;
  text-align: center;
  z-index: -1;

  color: red;
  font-size: 16px;
  font-weight: 700;
}

.converter__target-amount {
  /* reset browser styles */
  padding: 0;
  margin: 0;

  margin-top: 30px;

  text-align: center;

  font-style: normal;
  font-weight: 700;
  font-size: 30px;
}

.converter__values {
  border: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 30px;
}
</style>
