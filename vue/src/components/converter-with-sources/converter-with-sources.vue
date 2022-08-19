<template>
  <ConverterWithCalculator
    :availableExchangeRateSources="availableExchangeRateSources"
    :isLoading="isLoading"
    v-model:exchangeRatesSourceKey="exchangeRatesSourceKey"
    :availableCurrencies="availableCurrencies"
    :warningMessage="warningMessage"
    :defaultSourceCurrencyCharCode="defaultSourceCurrencyCharCode"
    :defaultTargetCurrencyCharCode="defaultTargetCurrencyCharCode"
  />
</template>

<script>
import ConverterWithCalculator from '../converter-with-calculator/converter-with-calculator.vue';

import rateSourcesManager from '../../api/exchange-sources/exchange-sources-manager.js'; // TODO: pass as props/context
import { Currency } from '../../api/exchange-sources/exchange-rates-data-objects.js';

export default {
  components: { ConverterWithCalculator },

  data() {
    return {
      availableCurrencies: [],
      warningMessage: null,
      isLoading: false,
      exchangeRatesSourceKey: 'cbr',
      availableExchangeRateSources: rateSourcesManager
        .getRegisteredSources()
        .map((item) => ({ key: item.key, caption: item.caption })),
      lastAbortController: null,
    };
  },

  computed: {
    defaultSourceCurrencyCharCode() {
      return Currency.USD().CharCode;
    },
    defaultTargetCurrencyCharCode() {
      return Currency.RUB().CharCode;
    },
  },

  methods: {},

  watch: {
    exchangeRatesSourceKey: {
      immediate: true,
      handler(newValue, _, onInvalidate) {
        this.isLoading = true;
        this.warningMessage = null;
        const currentAbortController = {};
        onInvalidate(() => (currentAbortController.aborted = true)); /* cancellationToken */
        rateSourcesManager
          .getRates(newValue)
          .then((exchangeRates) => {
            if (currentAbortController.aborted) {
              return;
            }
            this.availableCurrencies = exchangeRates?.Items;
            this.warningMessage = newValue === 'demo' ? 'Демо данные' : null;
            this.isLoading = false;
          })
          .catch((error) => {
            if (currentAbortController.aborted) {
              return;
            }
            const demoDataMessageTemplate =
              'При получении данных о курсе обмена валют возникла ошибка и показаны демонстрационные данные';
            this.isLoading = false;
            this.warningMessage = `${demoDataMessageTemplate} (${error})`;
            this.availableCurrencies = [Currency.RUB(), Currency.USD(), Currency.GBP()];
            this.sourceCurrencyCharCode = Currency.USD().CharCode;
            this.targetCurrencyCharCode = Currency.RUB().CharCode;
          });
      },
    },
  },
};
</script>

<style scoped></style>
