<template>
  <ConverterUI
    :selectCurrencyListItems="selectCurrencyListItems"
    v-model:amount="amount"
    v-model:sourceCurrencyCharCode="sourceCurrencyCharCode"
    v-model:targetCurrencyCharCode="targetCurrencyCharCode"
    :targetAmount="targetAmount"
    :targetRate="targetRate"
    :warningMessage="warningMessage"
    :isLoading="isLoading"
    v-model:exchangeRatesSourceKey="exchangeRatesSourceKeyComputed"
    :selectRatesSourceListItems="selectRatesSourceListItems"
  />
</template>

<script>
import ConverterUI from '../converter-ui/converter-ui.vue';

import { calculateTargetAmount, calculateTargetRate } from '../../api/currency-converter';

function handleIncorrectCharCode(charCode, availableCurrencies, defaultCharCode) {
  if (!charCode || !availableCurrencies?.find(item => item.CharCode === charCode)) {
    if (availableCurrencies?.find(item => item.CharCode === defaultCharCode)) {
      return defaultCharCode;
    }
    else if (availableCurrencies.length) {
      return availableCurrencies[0].CharCode;
    }
  }
  return charCode;
}

export default {
  components: { ConverterUI },

  props: {
    availableExchangeRateSources: {
      type: Array,
      validator: (items) =>
        items.every((item) => typeof item === 'object' && item !== null && 'key' in item && 'caption' in item),
    },
    exchangeRatesSourceKey: { type: String},

    availableCurrencies: {
      type: Array,
      validator: (items) =>
        items.every((item) => typeof item === 'object' && item !== null && 'CharCode' in item && 'Name' in item),
    },
    defaultSourceCurrencyCharCode: { type: String},
    defaultTargetCurrencyCharCode: { type: String},

    isLoading: { type: Boolean},
    warningMessage: { type: String},
  },

  data() {
    return {
      amount: 4000,
      sourceCurrencyCharCode: 'USD',
      targetCurrencyCharCode: 'RUB',
    };
  },

  computed: {
    selectRatesSourceListItems() {
      return this.availableExchangeRateSources.map((item) => ({ value: item.key, text: item.caption }));
    },
    exchangeRatesSourceKeyComputed: {
      get() {
        return this.exchangeRatesSourceKey;
      },
      set(newValue) {
        this.$emit('update:exchangeRatesSourceKey', newValue);
      },
    },
    selectCurrencyListItems() {
      return this.availableCurrencies?.map((item) => ({
        value: item.CharCode,
        text: item.Name + ` (${item.CharCode})`,
      }));
    },
    targetCurrencyValue() {
      const newCurrency = this.availableCurrencies?.find((item) => item.CharCode === this.targetCurrencyCharCode);
      return newCurrency?.Value;
    },
    sourceCurrencyValue() {
      const newCurrency = this.availableCurrencies?.find((item) => item.CharCode === this.sourceCurrencyCharCode);
      return newCurrency?.Value;
    },
    targetAmount() {
      return calculateTargetAmount(this.amount, this.sourceCurrencyValue, this.targetCurrencyValue);
    },
    targetRate() {
      return calculateTargetRate(this.sourceCurrencyValue, this.targetCurrencyValue);
    },
  },

  watch: {
    availableCurrencies: {
      immediate: true,
      handler(newValue) {
        // value depends on [sourceCurrencyCharCode, availableCurrencies, defaultSourceCurrencyCharCode]
        this.sourceCurrencyCharCode = handleIncorrectCharCode(this.sourceCurrencyCharCode, newValue, this.defaultSourceCurrencyCharCode);
        this.sourceCurrencyCharCode = handleIncorrectCharCode(this.sourceCurrencyCharCode, newValue, this.defaultSourceCurrencyCharCode);
      }
    }
  },
};
</script>

<style scoped></style>
