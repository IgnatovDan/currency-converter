<template>
  <div class="converter">
    <form @submit.prevent>
      <fieldset class="converter__values">
        <UiEditor editorType="spinbutton" v-model="amount" required :step="0.01" />
        <LabeledEditor caption="From">
          <UiEditor
            editorType="combobox"
            v-model="sourceCurrencyCharCode"
            required
            :listItems="availableCurrenciesListItems"
          />
        </LabeledEditor>
        <UiButton
          class="converter__currency-toggler"
          :image="toggleIconSrc"
          text="Toggle currencies"
          @click="() => handleTogglerClick()"
        />
        <LabeledEditor caption="To">
          <UiEditor
            editorType="combobox"
            v-model="targetCurrencyCharCode"
            required
            :listItems="availableCurrenciesListItems"
          />
        </LabeledEditor>
        <LabeledEditor caption="Exchange rates source">
          <UiEditor
            editorType="combobox"
            v-model="exchangeRatesSourceKey"
            required
            :listItems="availableExchangeRateSources"
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
    <p v-if="demoDataMessage" class="converter__demo-data-message">{{ demoDataMessage }}</p>
    <LoadingPanel v-if="isLoading" />
  </div>
</template>

<script>
import UiEditor from './ui-editor/ui-editor.vue';
import LabeledEditor from './labeled-editor.vue';
import UiButton from './ui-button/ui-button.vue';
import LoadingPanel from './loading-panel.vue';
import CurrencyRateExpression from './currency-rate-expression/currency-rate-expression.vue';

import rateSourcesManager from '../api/exchange-sources/exchange-sources-manager.js'; // TODO: pass as props/context
import { Currency } from '../api/exchange-sources/exchange-rates-data-objects.js';

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

  data() {
    return {
      toggleIconSrc: toggleIconSrc,
      availableCurrencies: [],
      availableCurrenciesListItems: [],
      amount: 4000,
      sourceCurrencyCharCode: 'USD',
      sourceCurrencyValue: null,
      targetCurrencyCharCode: 'RUB',
      targetCurrencyValue: null,
      targetAmount: 0,
      targetRate: 0,
      demoDataMessage: null,
      isLoading: false,
      exchangeRatesSourceKey: 'cbr',
      availableExchangeRateSources: rateSourcesManager
        .getRegisteredSources()
        .map((item) => ({ value: item.key, text: item.caption })),
      lastAbortController: null,
    };
  },

  methods: {
    handleTogglerClick() {
      const currentSourceCurrencyCharCode = this.sourceCurrencyCharCode;
      this.sourceCurrencyCharCode = this.targetCurrencyCharCode;
      this.targetCurrencyCharCode = currentSourceCurrencyCharCode;
    },
    refreshSourceCurrencyValue() {
      const newCurrency = this.availableCurrencies?.find((item) => item.CharCode === this.sourceCurrencyCharCode);
      this.sourceCurrencyValue = newCurrency?.Value;
    },
    refreshTargetCurrencyValue() {
      const newCurrency = this.availableCurrencies?.find((item) => item.CharCode === this.targetCurrencyCharCode);
      this.targetCurrencyValue = newCurrency?.Value;
    },
    refreshTargetAmount() {
      const safeValue = HandleValueNumberToZero((this.amount * this.sourceCurrencyValue) / this.targetCurrencyValue);
      this.targetAmount = Math.round((safeValue + Number.EPSILON) * 100) / 100;
    },
    refreshTargetRate() {
      const safeValue = HandleValueNumberToZero(this.sourceCurrencyValue / this.targetCurrencyValue);
      this.targetRate = Math.round((safeValue + Number.EPSILON) * 10000) / 10000;
    },
    refreshAvailableCurrenciesListItems() {
      this.availableCurrenciesListItems = convertCurrencyArrayToListItems(this.availableCurrencies);
    },
  },

  watch: {
    exchangeRatesSourceKey: {
      immediate: true,
      handler(newValue, _, onInvalidate) {
        this.isLoading = true;
        const currentAbortController = {};
        onInvalidate(() => (currentAbortController.aborted = true)); /* cancellationToken */
        rateSourcesManager
          .getRates(newValue)
          .then((exchangeRates) => {
            if (currentAbortController.aborted) {
              return;
            }
            this.availableCurrencies = exchangeRates?.Items;
            this.demoDataMessage = newValue === 'demo' ? 'Демо данные' : null;
            this.isLoading = false;
          })
          .catch((error) => {
            if (currentAbortController.aborted) {
              return;
            }
            const demoDataMessageTemplate =
              'При получении данных о курсе обмена валют возникла ошибка и показаны демонстрационные данные';
            this.isLoading = false;
            this.demoDataMessage = `${demoDataMessageTemplate} (${error})`;
            this.availableCurrencies = [Currency.RUB(), Currency.USD(), Currency.GBP()];
            this.sourceCurrencyCharCode = Currency.USD().CharCode;
            this.targetCurrencyCharCode = Currency.RUB().CharCode;
          });
      },
    },
    availableCurrencies: {
      immediate: true,
      handler() {
        this.refreshSourceCurrencyValue();
        this.refreshTargetCurrencyValue();
        this.refreshAvailableCurrenciesListItems();
        // Alternatives:
        // 1. watching multiple sources: "watch([firstName, lastName]..." (it is described at 'ru' only: https://v3.ru.vuejs.org/ru/guide/reactivity-computed-watchers.html)
        // 2. watch calculated property (don't like)
        // 3. watchEffect (requires migration to 'setup()' or '<script setup>')
      },
    },
    sourceCurrencyCharCode: {
      immediate: true,
      handler() {
        this.refreshSourceCurrencyValue();
      },
    },
    targetCurrencyCharCode: {
      immediate: true,
      handler() {
        this.refreshTargetCurrencyValue();
      },
    },
    amount: {
      immediate: true,
      handler() {
        this.refreshTargetAmount();
      },
    },
    sourceCurrencyValue: {
      immediate: true,
      handler() {
        this.refreshTargetAmount();
        this.refreshTargetRate();
      },
    },
    targetCurrencyValue: {
      immediate: true,
      handler() {
        this.refreshTargetAmount();
        this.refreshTargetRate();
      },
    },
  },
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

.converter__demo-data-message {
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
